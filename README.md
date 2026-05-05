# SMART-2MCE - Smart Multi-Maintenance and Multi-Connect Ecosystem

A national-level digital ecosystem for Rwanda that connects institutions, technicians, and suppliers for efficient maintenance management and collaboration.

## 🌟 Features

### 🏢 For Institutions
- Register and manage devices with unique IDs
- Create and track maintenance tasks
- Assign tasks to internal technicians or publish to marketplace
- Request spare parts and equipment from suppliers
- Comprehensive reporting and analytics
- Real-time communication with technicians and suppliers

### 🔧 For Technicians
- Browse available maintenance tasks in marketplace
- Apply for jobs based on location, skills, and urgency
- Track assigned tasks and update progress
- Request spare parts for maintenance work
- Build reputation through ratings and completed jobs
- Real-time chat with institutions and suppliers

### 📦 For Suppliers
- List products and manage inventory
- Receive and respond to supply requests
- Track orders and manage deliveries
- Monitor demand trends and optimize stock
- Direct communication with institutions and technicians

## 🏗️ Technology Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **JWT** authentication
- **Socket.io** for real-time communication
- **Multer** for file uploads
- **bcryptjs** for password hashing

### Frontend
- **React.js** 18 with hooks
- **Material-UI** (MUI) for modern UI
- **React Router** for navigation
- **React Hook Form** for form management
- **Axios** for API calls
- **Socket.io Client** for real-time features
- **React Toastify** for notifications

## 📋 Prerequisites

- Node.js 16+ and npm
- PostgreSQL 12+
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SMART-2MCE
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
```

Edit `.env` file with your configuration:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=smart_2mce
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:3000
UPLOAD_PATH=./uploads
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb smart_2mce

# Run database schema
psql -d smart_2mce -f database/schema.sql

# Seed database with sample data
npm run seed
```

Or run the seeder directly:
```bash
node database/seed.js
```

### 4. Start Backend Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend API will be available at `http://localhost:5000`

### 5. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

### 6. Start Frontend Development Server

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 📱 Sample Login Credentials

After seeding the database, you can use these credentials to test the system:

### Institution
- **Email**: kch@smart2mce.rw
- **Password**: password123
- **Role**: Institution (Kigali Central Hospital)

### Technician (Internal)
- **Email**: tech1@smart2mce.rw
- **Password**: password123
- **Role**: Technician

### Technician (External)
- **Email**: tech2@smart2mce.rw
- **Password**: password123
- **Role**: Technician

### Supplier
- **Email**: medsupplies@smart2mce.rw
- **Password**: password123
- **Role**: Supplier (Medical Supplies Ltd)

## 🗂️ Project Structure

```
SMART-2MCE/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── authController.js
│   ├── database/
│   │   ├── schema.sql
│   │   └── seed.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Institution.js
│   │   ├── Location.js
│   │   └── MaintenanceTask.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── institutions.js
│   │   ├── technicians.js
│   │   ├── suppliers.js
│   │   ├── maintenance.js
│   │   ├── messages.js
│   │   └── locations.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardLayout.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── LandingPage.js
│   │   │   └── dashboards/
│   │   │       ├── InstitutionDashboard.js
│   │   │       ├── TechnicianDashboard.js
│   │   │       └── SupplierDashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run seed` - Seed database with sample data

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Locations
- `GET /api/locations/provinces` - Get all provinces
- `GET /api/locations/districts/:provinceId` - Get districts by province
- `GET /api/locations/sectors/:districtId` - Get sectors by district
- `GET /api/locations/cells/:sectorId` - Get cells by sector
- `GET /api/locations/villages/:cellId` - Get villages by cell

### Institutions
- `GET /api/institutions/dashboard` - Get dashboard data
- `GET /api/institutions/profile` - Get institution profile
- `POST /api/institutions/devices` - Register new device
- `GET /api/institutions/devices` - Get institution devices
- `POST /api/institutions/materials` - Add material
- `GET /api/institutions/materials` - Get materials

### Technicians
- `GET /api/technicians/dashboard` - Get dashboard data
- `GET /api/technicians/marketplace` - Get available tasks
- `GET /api/technicians/tasks` - Get assigned tasks
- `POST /api/technicians/tasks/:id/apply` - Apply for task

### Suppliers
- `GET /api/suppliers/dashboard` - Get dashboard data
- `GET /api/suppliers/products` - Get products
- `POST /api/suppliers/products` - Add product
- `GET /api/suppliers/orders` - Get orders

### Maintenance
- `GET /api/maintenance/tasks` - Get maintenance tasks
- `POST /api/maintenance/tasks` - Create maintenance task
- `GET /api/maintenance/marketplace` - Get marketplace tasks

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Helmet.js for security headers

## 📊 Database Schema

The system uses PostgreSQL with the following main tables:

- **users** - User accounts and authentication
- **institutions** - Institution profiles
- **technicians** - Technician profiles and skills
- **suppliers** - Supplier profiles
- **locations** - Rwanda's administrative hierarchy
- **devices** - Registered devices and equipment
- **materials** - Inventory management
- **maintenance_tasks** - Maintenance work orders
- **technician_applications** - Job applications
- **supplier_orders** - Supply orders
- **messages** - Real-time chat system

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build and deploy to your preferred hosting platform
3. Ensure PostgreSQL is properly configured
4. Run database migrations and seed data

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the build folder to your hosting service
3. Configure environment variables for API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and inquiries:
- Email: info@smart2mce.rw
- Phone: +250 788 123 456
- Address: Kigali, Rwanda

## 🌟 Future Enhancements

- AI-powered maintenance predictions
- Mobile applications (iOS/Android)
- Advanced analytics dashboard
- Integration with IoT devices
- Multi-language support (Kinyarwanda, French, English)
- Payment integration for transactions
- Document management system
- Advanced reporting and export features

---

**SMART-2MCE** - Transforming maintenance management in Rwanda through digital innovation.
