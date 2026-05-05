const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const http = require('http');
const socketIo = require('socket.io');

// Load PostgreSQL environment variables
dotenv.config({ path: '.env.postgresql' });

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// PostgreSQL Connection Pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'smart_2mce',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test PostgreSQL connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
    console.log('\n🔧 PostgreSQL Setup Required:');
    console.log('1. Install PostgreSQL from: https://www.postgresql.org/download/windows/');
    console.log('2. Create database: CREATE DATABASE smart_2mce;');
    console.log('3. Run schema: psql -U postgres -d smart_2mce -f database/schema.sql');
    console.log('4. Run seed: psql -U postgres -d smart_2mce -f database/seed.sql');
    console.log('5. Start server: node server-postgresql.js\n');
  } else {
    console.log('✅ Connected to PostgreSQL successfully');
    console.log('📅 Database time:', res.rows[0].now);
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Routes
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as user_count FROM users');
    res.json({ 
      status: 'OK', 
      message: 'SMART-2MCE Backend is running with PostgreSQL',
      database: 'PostgreSQL',
      users: result.rows[0].user_count
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error', 
      message: 'Database connection failed',
      error: error.message 
    });
  }
});

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const bcrypt = require('bcryptjs');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
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
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user
app.get('/api/auth/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, role, is_verified FROM users WHERE id = $1',
      [decoded.userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Get dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const [users, devices, tasks, orders] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM users'),
      pool.query('SELECT COUNT(*) as count FROM devices'),
      pool.query('SELECT COUNT(*) as count FROM maintenance_tasks'),
      pool.query('SELECT COUNT(*) as count FROM supplier_orders')
    ]);

    res.json({
      users: parseInt(users.rows[0].count),
      devices: parseInt(devices.rows[0].count),
      tasks: parseInt(tasks.rows[0].count),
      orders: parseInt(orders.rows[0].count)
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// Get recent tasks
app.get('/api/dashboard/tasks', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT mt.*, u.first_name, u.last_name, d.name as device_name
      FROM maintenance_tasks mt
      JOIN users u ON mt.assigned_technician_id = u.id
      JOIN devices d ON mt.device_id = d.id
      ORDER BY mt.created_at DESC
      LIMIT 10
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Tasks error:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);
  
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`📱 User ${socket.id} joined room ${roomId}`);
  });
  
  socket.on('send_message', async (data) => {
    try {
      const { room_id, sender_id, message, message_type } = data;
      
      // Save message to database
      const result = await pool.query(`
        INSERT INTO messages (room_id, sender_id, message, message_type, created_at)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING *
      `, [room_id, sender_id, message, message_type || 'text']);
      
      // Broadcast to room
      io.to(room_id).emit('receive_message', result.rows[0]);
    } catch (error) {
      console.error('Message error:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });
  
  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
server.listen(PORT, () => {
  console.log(`\n🚀 SMART-2MCE Server running on port ${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`📊 Database: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`👤 Database User: ${process.env.DB_USER}`);
  console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
  console.log('\n📋 Login Credentials:');
  console.log('  🏥 Institution: institution001@gmail.com / Password@2026');
  console.log('  🔧 Technician: technician001@gmail.com / Password@2026');
  console.log('  📦 Supplier: supplier001@gmail.com / Password@2026');
  console.log('\n✅ PostgreSQL ecosystem is ready for testing!');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Shutting down gracefully...');
  await pool.end();
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});
