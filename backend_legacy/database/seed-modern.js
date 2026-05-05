const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load PostgreSQL environment
dotenv.config({ path: '.env.postgresql' });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'smart_2mce',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

// Modern seed data with 5+ records per table
const seedData = {
  users: [
    // Institutions (5+)
    { email: 'kch@smart2mce.rw', first_name: 'Jean', last_name: 'Munyaneza', role: 'institution', phone: '+250788123456' },
    { email: 'kingfaisal@smart2mce.rw', first_name: 'Marie', last_name: 'Uwimana', role: 'institution', phone: '+250788234567' },
    { email: 'butaro@smart2mce.rw', first_name: 'Emmanuel', last_name: 'Niyonzima', role: 'institution', phone: '+250788345678' },
    { email: 'rwamagana@smart2mce.rw', first_name: 'Grace', last_name: 'Mukamana', role: 'institution', phone: '+250788456789' },
    { email: 'nyagatare@smart2mce.rw', first_name: 'Patrick', last_name: 'Uwimana', role: 'institution', phone: '+250788567890' },
    { email: 'muhima@smart2mce.rw', first_name: 'Claudine', last_name: 'Mukandayisenga', role: 'institution', phone: '+250788678901' },
    
    // Technicians (5+)
    { email: 'tech1@smart2mce.rw', first_name: 'Eric', last_name: 'Nteziryayo', role: 'technician', phone: '+250788712345' },
    { email: 'tech2@smart2mce.rw', first_name: 'Joseph', last_name: 'Munyaneza', role: 'technician', phone: '+250788723456' },
    { email: 'tech3@smart2mce.rw', first_name: 'Annie', last_name: 'Uwase', role: 'technician', phone: '+250788734567' },
    { email: 'tech4@smart2mce.rw', first_name: 'David', last_name: 'Niyonzima', role: 'technician', phone: '+250788745678' },
    { email: 'tech5@smart2mce.rw', first_name: 'Sarah', last_name: 'Mukamana', role: 'technician', phone: '+250788756789' },
    { email: 'tech6@smart2mce.rw', first_name: 'Frank', last_name: 'Uwimana', role: 'technician', phone: '+250788767890' },
    
    // Suppliers (5+)
    { email: 'medequip@smart2mce.rw', first_name: 'Robert', last_name: 'Kagame', role: 'supplier', phone: '+250788812345' },
    { email: 'biomed@smart2mce.rw', first_name: 'Louise', last_name: 'Uwamahoro', role: 'supplier', phone: '+250788823456' },
    { email: 'pharmaplus@smart2mce.rw', first_name: 'Michel', last_name: 'Niyongabo', role: 'supplier', phone: '+250788834567' },
    { email: 'techsupply@smart2mce.rw', first_name: 'Cecile', last_name: 'Mukandayisenga', role: 'supplier', phone: '+250788845678' },
    { email: 'healthcare@smart2mce.rw', first_name: 'Jean-Pierre', last_name: 'Ntezimana', role: 'supplier', phone: '+250788856789' },
    { email: 'medparts@smart2mce.rw', first_name: 'Diane', last_name: 'Uwase', role: 'supplier', phone: '+250788867890' },
    
    // Admin
    { email: 'admin@smart2mce.rw', first_name: 'Admin', last_name: 'User', role: 'admin', phone: '+250788999999' }
  ],

  institutions: [
    { institution_name: 'Kigali Central Hospital', registration_number: 'REG/KCH/2024/001', institution_type: 'Referral Hospital', province: 'Kigali', district: 'Nyarugenge', sector: 'Nyabugogo', cell: 'Biryogo', village: 'Kigali', contact_person: 'Dr. Jean Munyaneza', contact_phone: '+250788123456', license_number: 'HLTH/KCH/2024/001' },
    { institution_name: 'King Faisal Hospital', registration_number: 'REG/KFH/2024/002', institution_type: 'Private Hospital', province: 'Kigali', district: 'Kicukiro', sector: 'Kicukiro', cell: 'Kicukiro', village: 'Kicukiro', contact_person: 'Dr. Marie Uwimana', contact_phone: '+250788234567', license_number: 'HLTH/KFH/2024/002' },
    { institution_name: 'Butaro Hospital', registration_number: 'REG/BH/2024/003', institution_type: 'District Hospital', province: 'Northern', district: 'Burera', sector: 'Butaro', cell: 'Butaro', village: 'Butaro', contact_person: 'Dr. Emmanuel Niyonzima', contact_phone: '+250788345678', license_number: 'HLTH/BH/2024/003' },
    { institution_name: 'Rwamagana Hospital', registration_number: 'REG/RH/2024/004', institution_type: 'District Hospital', province: 'Eastern', district: 'Rwamagana', sector: 'Rwamagana', cell: 'Rwamagana', village: 'Rwamagana', contact_person: 'Dr. Grace Mukamana', contact_phone: '+250788456789', license_number: 'HLTH/RH/2024/004' },
    { institution_name: 'Nyagatare Hospital', registration_number: 'REG/NH/2024/005', institution_type: 'District Hospital', province: 'Eastern', district: 'Nyagatare', sector: 'Nyagatare', cell: 'Nyagatare', village: 'Nyagatare', contact_person: 'Dr. Patrick Uwimana', contact_phone: '+250788567890', license_number: 'HLTH/NH/2024/005' },
    { institution_name: 'Muhima Hospital', registration_number: 'REG/MH/2024/006', institution_type: 'District Hospital', province: 'Kigali', district: 'Nyarugenge', sector: 'Nyabugogo', cell: 'Muhima', village: 'Muhima', contact_person: 'Dr. Claudine Mukandayisenga', contact_phone: '+250788678901', license_number: 'HLTH/MH/2024/006' }
  ],

  technicians: [
    { specialization: 'Biomedical Equipment', experience_years: 5, certification_number: 'BME/RW/2024/001', service_areas: ['Kigali', 'Northern'], hourly_rate: 25.00 },
    { specialization: 'X-Ray Machines', experience_years: 8, certification_number: 'XRM/RW/2024/002', service_areas: ['Kigali', 'Eastern'], hourly_rate: 30.00 },
    { specialization: 'Laboratory Equipment', experience_years: 6, certification_number: 'LAB/RW/2024/003', service_areas: ['Kigali', 'Southern'], hourly_rate: 28.00 },
    { specialization: 'Ventilators & Respiratory', experience_years: 7, certification_number: 'VEN/RW/2024/004', service_areas: ['Northern', 'Eastern'], hourly_rate: 32.00 },
    { specialization: 'General Medical Equipment', experience_years: 4, certification_number: 'GME/RW/2024/005', service_areas: ['Kigali'], hourly_rate: 22.00 },
    { specialization: 'Surgical Equipment', experience_years: 9, certification_number: 'SUR/RW/2024/006', service_areas: ['Kigali', 'Western'], hourly_rate: 35.00 }
  ],

  suppliers: [
    { company_name: 'MedEquip Rwanda Ltd', company_registration: 'CR/MER/2024/001', supplier_type: 'Equipment', specialization: ['X-Ray', 'Ultrasound', 'Laboratory'], province: 'Kigali', district: 'Gasabo', contact_person: 'Robert Kagame', business_license: 'BL/MER/2024/001' },
    { company_name: 'BioMed Solutions', company_registration: 'CR/BMS/2024/002', supplier_type: 'Parts', specialization: ['Biomedical Parts', 'Consumables'], province: 'Kigali', district: 'Nyarugenge', contact_person: 'Louise Uwamahoro', business_license: 'BL/BMS/2024/002' },
    { company_name: 'PharmaPlus Rwanda', company_registration: 'CR/PPR/2024/003', supplier_type: 'Consumables', specialization: ['Medical Supplies', 'Pharmaceutical'], province: 'Kigali', district: 'Kicukiro', contact_person: 'Michel Niyongabo', business_license: 'BL/PPR/2024/003' },
    { company_name: 'TechSupply Africa', company_registration: 'CR/TSA/2024/004', supplier_type: 'Equipment', specialization: ['Surgical', 'Dental', 'Sterilization'], province: 'Eastern', district: 'Rwamagana', contact_person: 'Cecile Mukandayisenga', business_license: 'BL/TSA/2024/004' },
    { company_name: 'Healthcare Systems Ltd', company_registration: 'CR/HSL/2024/005', supplier_type: 'Equipment', specialization: ['Ventilators', 'Monitors', 'ECG'], province: 'Northern', district: 'Burera', contact_person: 'Jean-Pierre Ntezimana', business_license: 'BL/HSL/2024/005' },
    { company_name: 'MedParts Central', company_registration: 'CR/MPC/2024/006', supplier_type: 'Parts', specialization: ['Spare Parts', 'Accessories'], province: 'Kigali', district: 'Nyagugenge', contact_person: 'Diane Uwase', business_license: 'BL/MPC/2024/006' }
  ],

  devices: [
    { device_name: 'Siemens X-Ray Machine', manufacturer: 'Siemens', model_number: 'Ysio Max', serial_number: 'SN-SIE-2024-001', category_id: 'x-ray-machines' },
    { device_name: 'GE Ventilator', manufacturer: 'GE Healthcare', model_number: 'CARESCAPE R860', serial_number: 'SN-GE-2024-001', category_id: 'ventilators' },
    { device_name: 'Roche Lab Analyzer', manufacturer: 'Roche', model_number: 'cobas c 311', serial_number: 'SN-ROC-2024-001', category_id: 'laboratory-analyzers' },
    { device_name: 'Philips Ultrasound', manufacturer: 'Philips', model_number: 'Affiniti 70', serial_number: 'SN-PHI-2024-001', category_id: 'ultrasound-machines' },
    { device_name: 'Mindray ECG Machine', manufacturer: 'Mindray', model_number: 'BeneHeart R3', serial_number: 'SN-MIN-2024-001', category_id: 'ecg-machines' },
    { device_name: 'B. Braun Infusion Pump', manufacturer: 'B. Braun', model_number: 'Perfusor Space', serial_number: 'SN-BBR-2024-001', category_id: 'infusion-pumps' },
    { device_name: 'Philips Patient Monitor', manufacturer: 'Philips', model_number: 'IntelliVue MX700', serial_number: 'SN-PHI-2024-002', category_id: 'patient-monitors' },
    { device_name: 'Surgical Table', manufacturer: 'Maquet', model_number: 'Magnus', serial_number: 'SN-MAQ-2024-001', category_id: 'surgical-equipment' },
    { device_name: 'Dental Chair', manufacturer: 'Planmeca', model_number: 'Prostyle', serial_number: 'SN-PLA-2024-001', category_id: 'dental-equipment' },
    { device_name: 'Autoclave Sterilizer', manufacturer: 'Tuttnauer', model_number: '2540MK', serial_number: 'SN-TUT-2024-001', category_id: 'sterilization-equipment' }
  ],

  maintenanceTasks: [
    { task_title: 'X-Ray Machine Calibration', description: 'Annual calibration and quality check', task_type: 'maintenance', priority: 'high', urgency_level: 4, estimated_duration: 4, estimated_cost: 500.00 },
    { task_title: 'Ventilator Filter Replacement', description: 'Replace air filters and check oxygen sensors', task_type: 'repair', priority: 'critical', urgency_level: 5, estimated_duration: 2, estimated_cost: 300.00 },
    { task_title: 'Lab Analyzer Preventive Maintenance', description: 'Quarterly preventive maintenance and cleaning', task_type: 'maintenance', priority: 'medium', urgency_level: 3, estimated_duration: 6, estimated_cost: 800.00 },
    { task_title: 'Ultrasound Probe Repair', description: 'Repair damaged ultrasound probe', task_type: 'repair', priority: 'high', urgency_level: 4, estimated_duration: 3, estimated_cost: 1200.00 },
    { task_title: 'ECG Machine Battery Replacement', description: 'Replace internal batteries and test functionality', task_type: 'repair', priority: 'medium', urgency_level: 2, estimated_duration: 1, estimated_cost: 150.00 },
    { task_title: 'Infusion Pump Software Update', description: 'Update software and calibrate flow rates', task_type: 'maintenance', priority: 'low', urgency_level: 1, estimated_duration: 2, estimated_cost: 200.00 },
    { task_title: 'Patient Monitor Screen Replacement', description: 'Replace damaged LCD screen', task_type: 'repair', priority: 'high', urgency_level: 4, estimated_duration: 3, estimated_cost: 800.00 },
    { task_title: 'Surgical Light Installation', description: 'Install new surgical lighting system', task_type: 'installation', priority: 'medium', urgency_level: 3, estimated_duration: 8, estimated_cost: 2000.00 },
    { task_title: 'Dental X-Ray Installation', description: 'Install new dental X-ray unit', task_type: 'installation', priority: 'medium', urgency_level: 3, estimated_duration: 6, estimated_cost: 1500.00 },
    { task_title: 'Autoclave Maintenance', description: 'Comprehensive maintenance and safety check', task_type: 'maintenance', priority: 'high', urgency_level: 4, estimated_duration: 4, estimated_cost: 400.00 }
  ]
};

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    console.log('🌱 Starting SMART-2MCE Modern Database Seeding...');
    
    // 1. Insert Users
    console.log('📝 Inserting users...');
    const hashedPassword = await bcrypt.hash('Password@2026', 12);
    
    for (const user of seedData.users) {
      const result = await client.query(
        'INSERT INTO users (email, password_hash, first_name, last_name, phone, role, is_verified, is_active) VALUES ($1, $2, $3, $4, $5, $6, true, true) RETURNING id',
        [user.email, hashedPassword, user.first_name, user.last_name, user.phone, user.role]
      );
      
      // Store user ID for later use
      user.id = result.rows[0].id;
    }
    
    // 2. Insert Institutions
    console.log('🏥 Inserting institutions...');
    const institutionUsers = seedData.users.filter(u => u.role === 'institution');
    
    for (let i = 0; i < seedData.institutions.length; i++) {
      const institution = seedData.institutions[i];
      const user = institutionUsers[i];
      
      const result = await client.query(`
        INSERT INTO institutions (
          user_id, institution_name, registration_number, institution_type, 
          province, district, sector, cell, village, contact_person, 
          contact_phone, license_number, is_approved
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true)
        RETURNING id
      `, [
        user.id, institution.institution_name, institution.registration_number,
        institution.institution_type, institution.province, institution.district,
        institution.sector, institution.cell, institution.village,
        institution.contact_person, institution.contact_phone,
        institution.license_number
      ]);
      
      institution.id = result.rows[0].id;
      institution.user_id = user.id;
    }
    
    // 3. Insert Technicians
    console.log('🔧 Inserting technicians...');
    const technicianUsers = seedData.users.filter(u => u.role === 'technician');
    
    for (let i = 0; i < seedData.technicians.length; i++) {
      const technician = seedData.technicians[i];
      const user = technicianUsers[i];
      
      const result = await client.query(`
        INSERT INTO technicians (
          user_id, specialization, experience_years, certification_number,
          service_areas, hourly_rate, is_verified, is_approved
        ) VALUES ($1, $2, $3, $4, $5, $6, true, true)
        RETURNING id
      `, [
        user.id, technician.specialization, technician.experience_years,
        technician.certification_number, technician.service_areas,
        technician.hourly_rate
      ]);
      
      technician.id = result.rows[0].id;
      technician.user_id = user.id;
    }
    
    // 4. Insert Suppliers
    console.log('📦 Inserting suppliers...');
    const supplierUsers = seedData.users.filter(u => u.role === 'supplier');
    
    for (let i = 0; i < seedData.suppliers.length; i++) {
      const supplier = seedData.suppliers[i];
      const user = supplierUsers[i];
      
      const result = await client.query(`
        INSERT INTO suppliers (
          user_id, company_name, company_registration, supplier_type,
          specialization, province, district, contact_person,
          business_license, is_verified, is_approved
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, true)
        RETURNING id
      `, [
        user.id, supplier.company_name, supplier.company_registration,
        supplier.supplier_type, supplier.specialization, supplier.province,
        supplier.district, supplier.contact_person, supplier.business_license
      ]);
      
      supplier.id = result.rows[0].id;
      supplier.user_id = user.id;
    }
    
    // 5. Insert Devices
    console.log('🏭 Inserting devices...');
    const categoryIds = await client.query('SELECT id, name FROM device_categories');
    const categoryMap = {};
    categoryIds.rows.forEach(cat => {
      categoryMap[cat.name.replace(/\s+/g, '-').toLowerCase()] = cat.id;
    });
    
    for (let i = 0; i < seedData.devices.length; i++) {
      const device = seedData.devices[i];
      const institution = seedData.institutions[i % seedData.institutions.length];
      const categoryId = categoryMap[device.category_id];
      
      await client.query(`
        INSERT INTO devices (
          institution_id, category_id, device_name, manufacturer,
          model_number, serial_number, purchase_date, warranty_expiry,
          installation_date, status, last_maintenance, next_maintenance
        ) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE - INTERVAL '${Math.floor(Math.random() * 365)} days',
                CURRENT_DATE + INTERVAL '${Math.floor(Math.random() * 1825)} days',
                CURRENT_DATE - INTERVAL '${Math.floor(Math.random() * 30)} days',
                'active', CURRENT_DATE - INTERVAL '${Math.floor(Math.random() * 90)} days',
                CURRENT_DATE + INTERVAL '${Math.floor(Math.random() * 90)} days')
      `, [
        institution.id, categoryId, device.device_name, device.manufacturer,
        device.model_number, device.serial_number
      ]);
      
      device.institution_id = institution.id;
    }
    
    // 6. Insert Maintenance Tasks
    console.log('🔨 Inserting maintenance tasks...');
    const deviceRows = await client.query('SELECT id, institution_id FROM devices LIMIT 10');
    const technicianRows = await client.query('SELECT id FROM technicians LIMIT 6');
    
    for (let i = 0; i < seedData.maintenanceTasks.length; i++) {
      const task = seedData.maintenanceTasks[i];
      const device = deviceRows.rows[i % deviceRows.rowCount];
      const technician = technicianRows.rows[i % technicianRows.rowCount];
      
      const statuses = ['pending', 'assigned', 'in_progress', 'completed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      await client.query(`
        INSERT INTO maintenance_tasks (
          institution_id, device_id, technician_id, task_title, description,
          task_type, priority, status, urgency_level, estimated_duration,
          estimated_cost, scheduled_date, created_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `, [
        device.institution_id, device.id, randomStatus === 'pending' ? null : technician.id,
        task.task_title, task.description, task.task_type, task.priority,
        randomStatus, task.urgency_level, task.estimated_duration,
        task.estimated_cost, 
        randomStatus === 'pending' ? null : new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
        seedData.users.find(u => u.role === 'admin').id
      ]);
    }
    
    // 7. Insert Sample Products
    console.log('🛍️ Inserting products...');
    const supplierRows = await client.query('SELECT id FROM suppliers LIMIT 6');
    
    const products = [
      { supplier_id: 0, category: 'X-Ray', product_name: 'X-Ray Tube', brand: 'Siemens', unit_price: 2500.00, stock_quantity: 15 },
      { supplier_id: 1, category: 'Biomedical', product_name: 'ECG Cable', brand: 'Medtronic', unit_price: 150.00, stock_quantity: 50 },
      { supplier_id: 2, category: 'Consumables', product_name: 'Medical Gloves', brand: 'Ansell', unit_price: 25.00, stock_quantity: 1000 },
      { supplier_id: 3, category: 'Surgical', product_name: 'Surgical Scalpel', brand: 'Johnson & Johnson', unit_price: 45.00, stock_quantity: 200 },
      { supplier_id: 4, category: 'Ventilator', product_name: 'Ventilator Circuit', brand: 'GE', unit_price: 180.00, stock_quantity: 75 },
      { supplier_id: 5, category: 'Parts', product_name: 'Battery Pack', brand: 'Philips', unit_price: 320.00, stock_quantity: 30 }
    ];
    
    for (const product of products) {
      const supplier = supplierRows.rows[product.supplier_id];
      await client.query(`
        INSERT INTO products (
          supplier_id, category, product_name, brand, unit_price,
          wholesale_price, stock_quantity, min_stock_level
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        supplier.id, product.category, product.product_name, product.brand,
        product.unit_price, product.unit_price * 0.8, product.stock_quantity, 10
      ]);
    }
    
    // 8. Insert Sample Orders
    console.log('📋 Inserting orders...');
    const institutionRows = await client.query('SELECT id FROM institutions LIMIT 6');
    const productRows = await client.query('SELECT id, unit_price FROM products LIMIT 10');
    
    for (let i = 0; i < 8; i++) {
      const institution = institutionRows.rows[i % institutionRows.rowCount];
      const supplier = supplierRows.rows[i % supplierRows.rowCount];
      const orderNumber = `ORD-2024-${String(i + 1).padStart(4, '0')}`;
      
      const orderResult = await client.query(`
        INSERT INTO supplier_orders (
          institution_id, supplier_id, order_number, order_status,
          payment_status, total_amount, tax_amount, shipping_cost,
          delivery_address, delivery_date, created_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id
      `, [
        institution.id, supplier.id, orderNumber,
        ['pending', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 4)],
        ['pending', 'paid'][Math.floor(Math.random() * 2)],
        Math.floor(Math.random() * 5000) + 1000,
        Math.floor(Math.random() * 500) + 100,
        Math.floor(Math.random() * 200) + 50,
        `${seedData.institutions[i % seedData.institutions.length].district}, Rwanda`,
        new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000),
        seedData.users.find(u => u.role === 'admin').id
      ]);
      
      // Add order items
      const orderId = orderResult.rows[0].id;
      const numItems = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < numItems; j++) {
        const product = productRows.rows[j % productRows.rowCount];
        const quantity = Math.floor(Math.random() * 5) + 1;
        const totalPrice = product.unit_price * quantity;
        
        await client.query(`
          INSERT INTO order_items (
            order_id, product_id, quantity, unit_price, total_price
          ) VALUES ($1, $2, $3, $4, $5)
        `, [orderId, product.id, quantity, product.unit_price, totalPrice]);
      }
    }
    
    // 9. Insert Sample Messages
    console.log('💬 Inserting messages...');
    const allUsers = await client.query('SELECT id FROM users LIMIT 10');
    
    for (let i = 0; i < 15; i++) {
      const user1 = allUsers.rows[Math.floor(Math.random() * allUsers.rowCount)];
      const user2 = allUsers.rows[Math.floor(Math.random() * allUsers.rowCount)];
      
      if (user1.id !== user2.id) {
        // Create chat room
        const roomResult = await client.query(`
          INSERT INTO chat_rooms (room_type, participants, created_by)
          VALUES ('direct', ARRAY[$1, $2], $1)
          RETURNING id
        `, [user1.id, user2.id]);
        
        // Add messages
        const messages = [
          'Hello, I need assistance with a maintenance task.',
          'I can help you with that. What type of equipment?',
          'It\'s an X-ray machine that needs calibration.',
          'I\'m available tomorrow afternoon. Does that work?',
          'Yes, that would be perfect. Thank you!'
        ];
        
        for (const message of messages) {
          await client.query(`
            INSERT INTO messages (room_id, sender_id, message, message_type, read_by)
            VALUES ($1, $2, $3, 'text', ARRAY[$1, $2])
          `, [roomResult.rows[0].id, Math.random() > 0.5 ? user1.id : user2.id, message]);
        }
      }
    }
    
    // 10. Insert Notifications
    console.log('🔔 Inserting notifications...');
    const notificationTypes = ['task_assigned', 'task_completed', 'order_status', 'payment', 'system'];
    const notifications = [
      'New maintenance task assigned to you',
      'Your task has been marked as completed',
      'Order status updated to shipped',
      'Payment received successfully',
      'System maintenance scheduled'
    ];
    
    for (let i = 0; i < 20; i++) {
      const user = allUsers.rows[Math.floor(Math.random() * allUsers.rowCount)];
      const notification = notifications[Math.floor(Math.random() * notifications.length)];
      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      
      await client.query(`
        INSERT INTO notifications (user_id, title, message, type, priority)
        VALUES ($1, $2, $3, $4, $5)
      `, [
        user.id,
        notification,
        `This is a sample ${type} notification for testing purposes.`,
        type,
        ['low', 'normal', 'high'][Math.floor(Math.random() * 3)]
      ]);
    }
    
    await client.query('COMMIT');
    
    console.log('\n✅ SMART-2MCE Database Seeded Successfully!');
    console.log('📊 Database Statistics:');
    
    // Print statistics
    const stats = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as users,
        (SELECT COUNT(*) FROM institutions) as institutions,
        (SELECT COUNT(*) FROM technicians) as technicians,
        (SELECT COUNT(*) FROM suppliers) as suppliers,
        (SELECT COUNT(*) FROM devices) as devices,
        (SELECT COUNT(*) FROM maintenance_tasks) as tasks,
        (SELECT COUNT(*) FROM supplier_orders) as orders,
        (SELECT COUNT(*) FROM messages) as messages,
        (SELECT COUNT(*) FROM notifications) as notifications
    `);
    
    const stat = stats.rows[0];
    console.log(`   👥 Users: ${stat.users}`);
    console.log(`   🏥 Institutions: ${stat.institutions}`);
    console.log(`   🔧 Technicians: ${stat.technicians}`);
    console.log(`   📦 Suppliers: ${stat.suppliers}`);
    console.log(`   🏭 Devices: ${stat.devices}`);
    console.log(`   🔨 Tasks: ${stat.tasks}`);
    console.log(`   📋 Orders: ${stat.orders}`);
    console.log(`   💬 Messages: ${stat.messages}`);
    console.log(`   🔔 Notifications: ${stat.notifications}`);
    
    console.log('\n🎯 Login Credentials:');
    console.log('   🏥 Kigali Central: kch@smart2mce.rw / Password@2026');
    console.log('   🔧 Tech 1: tech1@smart2mce.rw / Password@2026');
    console.log('   📦 MedEquip: medequip@smart2mce.rw / Password@2026');
    console.log('   👑 Admin: admin@smart2mce.rw / Password@2026');
    
    console.log('\n🚀 Modern SMART-2MCE ecosystem is ready for testing!');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run the seeding
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('\n🎉 Database seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Database seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
