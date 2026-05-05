const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// SQLite Database Setup
const db = new sqlite3.Database('./smart_2mce.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT,
      role TEXT NOT NULL,
      is_verified BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
      } else {
        console.log('Users table created successfully.');
        insertSampleData();
      }
    });
  });
}

function insertSampleData() {
  const bcrypt = require('bcryptjs');
  const hashedPassword = bcrypt.hashSync('Password@2026', 12);

  // Sample users
  const users = [
    ['institution001@gmail.com', hashedPassword, 'Kigali Central', 'Hospital', '0781234567', 'institution', 1],
    ['technician001@gmail.com', hashedPassword, 'John', 'Technician', '0782345678', 'technician', 1],
    ['supplier001@gmail.com', hashedPassword, 'Rwanda', 'Supplier', '0783456789', 'supplier', 1]
  ];

  const insertUser = db.prepare('INSERT OR IGNORE INTO users (email, password, first_name, last_name, phone, role, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?)');
  
  db.serialize(() => {
    users.forEach(user => {
      insertUser.run(user, (err) => {
        if (err) {
          console.error('Error inserting user:', err.message);
        }
      });
    });
    
    insertUser.finalize(() => {
      console.log('Sample users inserted successfully.');
    });
  });
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SMART-2MCE Backend is running with SQLite' });
});

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const bcrypt = require('bcryptjs');
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        is_verified: user.is_verified
      }
    });
  });
});

// Get current user
app.get('/api/auth/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    db.get('SELECT id, email, first_name, last_name, role, is_verified FROM users WHERE id = ?', [decoded.userId], (err, user) => {
      if (err || !user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`SMART-2MCE Server running on port ${PORT}`);
  console.log('Using SQLite database for quick testing');
  console.log('Login credentials:');
  console.log('  Institution: institution001@gmail.com / Password@2026');
  console.log('  Technician: technician001@gmail.com / Password@2026');
  console.log('  Supplier: supplier001@gmail.com / Password@2026');
});
