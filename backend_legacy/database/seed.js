const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    console.log('Starting comprehensive database seeding...');

    // Clear existing data
    await pool.query('DELETE FROM messages');
    await pool.query('DELETE FROM supplier_orders');
    await pool.query('DELETE FROM technician_applications');
    await pool.query('DELETE FROM maintenance_tasks');
    await pool.query('DELETE FROM materials');
    await pool.query('DELETE FROM devices');
    await pool.query('DELETE FROM suppliers');
    await pool.query('DELETE FROM technicians');
    await pool.query('DELETE FROM institutions');
    await pool.query('DELETE FROM users');
    await pool.query('DELETE FROM villages');
    await pool.query('DELETE FROM cells');
    await pool.query('DELETE FROM sectors');
    await pool.query('DELETE FROM districts');
    await pool.query('DELETE FROM provinces');

    console.log('Cleared existing data');

    // Insert Rwanda's provinces
    const provinces = await pool.query(`
      INSERT INTO provinces (name, code) VALUES
      ('Kigali City', '01'),
      ('Northern Province', '02'),
      ('Southern Province', '03'),
      ('Eastern Province', '04'),
      ('Western Province', '05')
      RETURNING id, code
    `);

    // Insert districts (comprehensive)
    const districts = await pool.query(`
      INSERT INTO districts (name, code, province_id) VALUES
      -- Kigali City
      ('Gasabo', '01', $1),
      ('Kicukiro', '02', $1),
      ('Nyarugenge', '03', $1),
      -- Northern Province
      ('Burera', '01', $2),
      ('Gicumbi', '02', $2),
      ('Gakenke', '03', $2),
      ('Musanze', '04', $2),
      ('Rulindo', '05', $2),
      -- Southern Province
      ('Gisagara', '01', $3),
      ('Huye', '02', $3),
      ('Kamonyi', '03', $3),
      ('Karongi', '04', $3),
      ('Muhanga', '05', $3),
      ('Nyamagabe', '06', $3),
      ('Nyanza', '07', $3),
      ('Ruhango', '08', $3),
      -- Eastern Province
      ('Bugesera', '01', $4),
      ('Gatsibo', '02', $4),
      ('Kayonza', '03', $4),
      ('Kirehe', '04', $4),
      ('Ngoma', '05', $4),
      ('Nyagatare', '06', $4),
      ('Rwamagana', '07', $4),
      -- Western Province
      ('Karongi', '01', $5),
      ('Ngororero', '02', $5),
      ('Nyabihu', '03', $5),
      ('Nyamasheke', '04', $5),
      ('Rubavu', '05', $5),
      ('Rusizi', '06', $5),
      ('Rutsiro', '07', $5)
      RETURNING id, code
    `, [provinces.rows[0].id, provinces.rows[1].id, provinces.rows[2].id, provinces.rows[3].id, provinces.rows[4].id]);

    // Insert sectors (sample for main districts)
    const sectors = await pool.query(`
      INSERT INTO sectors (name, code, district_id) VALUES
      -- Gasabo sectors
      ('Bumbogo', '01', $1),
      ('Gikondo', '02', $1),
      ('Jali', '03', $1),
      ('Kacyiru', '04', $1),
      ('Kigali', '05', $1),
      ('Kimihurura', '06', $1),
      ('Kimironko', '07', $1),
      ('Kinyinya', '08', $1),
      ('Remera', '09', $1),
      ('Rusororo', '10', $1),
      -- Kicukiro sectors
      ('Gahanga', '01', $2),
      ('Gatenga', '02', $2),
      ('Kagarama', '03', $2),
      ('Kanombe', '04', $2),
      ('Kicukiro', '05', $2),
      ('Masaka', '06', $2),
      ('Niboye', '07', $2),
      -- Nyarugenge sectors
      ('Gitega', '01', $3),
      ('Kanyinya', '02', $3),
      ('Kimisagara', '03', $3),
      ('Muhima', '04', $3),
      ('Nyabugogo', '05', $3),
      ('Nyamirambo', '06', $3),
      ('Rwezamenyo', '07', $3)
      RETURNING id, code
    `, [districts.rows[0].id, districts.rows[1].id, districts.rows[2].id]);

    // Insert cells and villages
    const cells = await pool.query(`
      INSERT INTO cells (name, code, sector_id) VALUES
      ('Kinyinya I', '01', $1),
      ('Kinyinya II', '02', $1),
      ('Kinyinya III', '03', $1),
      ('Remera I', '04', $2),
      ('Remera II', '05', $2),
      ('Gikondo I', '06', $7),
      ('Gikondo II', '07', $7),
      ('Kacyiru I', '08', $4),
      ('Kacyiru II', '09', $4),
      ('Kimironko I', '10', $7)
      RETURNING id, code
    `, [sectors.rows[7].id, sectors.rows[8].id, sectors.rows[1].id, sectors.rows[3].id, sectors.rows[6].id]);

    await pool.query(`
      INSERT INTO villages (name, code, cell_id) VALUES
      ('Umudugudu 1', '01', $1),
      ('Umudugudu 2', '02', $1),
      ('Umudugudu 3', '03', $1),
      ('Umudugudu 4', '04', $2),
      ('Umudugudu 5', '05', $2),
      ('Umudugudu 6', '06', $3),
      ('Umudugudu 7', '07', $4),
      ('Umudugudu 8', '08', $5),
      ('Umudugudu 9', '09', $6),
      ('Umudugudu 10', '10', $7)
    `, [cells.rows[0].id, cells.rows[0].id, cells.rows[1].id, cells.rows[2].id, cells.rows[3].id, cells.rows[4].id, cells.rows[5].id]);

    console.log('Inserted location data');

    // Create sample users with new credentials
    const hashedPassword = await bcrypt.hash('Password@2026', 12);

    // Institution users (5 institutions)
    const institutionUsers = await pool.query(`
      INSERT INTO users (email, password, first_name, last_name, phone, role) VALUES
      ('institution001@gmail.com', $1, 'Jean', 'Munyaneza', '0788123456', 'institution'),
      ('institution002@gmail.com', $1, 'Marie', 'Uwimana', '0788234567', 'institution'),
      ('institution003@gmail.com', $1, 'Peter', 'Kagame', '0788345678', 'institution'),
      ('institution004@gmail.com', $1, 'Grace', 'Mukamana', '0788456789', 'institution'),
      ('institution005@gmail.com', $1, 'Joseph', 'Niyonzima', '0788567890', 'institution')
      RETURNING id, email
    `, [hashedPassword]);

    // Technician users (5 technicians)
    const technicianUsers = await pool.query(`
      INSERT INTO users (email, password, first_name, last_name, phone, role) VALUES
      ('technician001@gmail.com', $1, 'Eric', 'Uwimana', '0789123456', 'technician'),
      ('technician002@gmail.com', $1, 'Grace', 'Mukamana', '0789234567', 'technician'),
      ('technician003@gmail.com', $1, 'Patrick', 'Niyonzima', '0789345678', 'technician'),
      ('technician004@gmail.com', $1, 'Sarah', 'Mutesi', '0789456789', 'technician'),
      ('technician005@gmail.com', $1, 'David', 'Mugisha', '0789567890', 'technician')
      RETURNING id, email
    `, [hashedPassword]);

    // Supplier users (5 suppliers)
    const supplierUsers = await pool.query(`
      INSERT INTO users (email, password, first_name, last_name, phone, role) VALUES
      ('supplier001@gmail.com', $1, 'Patrick', 'Niyonzima', '0790123456', 'supplier'),
      ('supplier002@gmail.com', $1, 'Christine', 'Uwase', '0790234567', 'supplier'),
      ('supplier003@gmail.com', $1, 'James', 'Munyaneza', '0790345678', 'supplier'),
      ('supplier004@gmail.com', $1, 'Annie', 'Mukandayisenga', '0790456789', 'supplier'),
      ('supplier005@gmail.com', $1, 'Robert', 'Gahigi', '0790567890', 'supplier')
      RETURNING id, email
    `, [hashedPassword]);

    console.log('Created sample users');

    // Create institution profiles (5 institutions)
    const institutions = await pool.query(`
      INSERT INTO institutions (
        user_id, institution_name, institution_type, registration_number,
        province_id, district_id, sector_id, cell_id, village_id,
        address, description
      ) VALUES
      ($1, 'Kigali Central Hospital', 'public', 'KH/RWA/2024/001', $6, $7, $8, $9, $10, 'KG 123 Ave, Kigali', 'Main referral hospital in Kigali City'),
      ($2, 'Rwanda Biomedical Center', 'public', 'RBC/RWA/2024/001', $6, $7, $11, $12, $10, 'KG 456 St, Kigali', 'National biomedical research center'),
      ($3, 'King Faisal Hospital', 'private', 'KFH/RWA/2024/001', $6, $13, $14, $15, $10, 'KN 789 Blvd, Kigali', 'Private specialized hospital'),
      ($4, 'University Teaching Hospital', 'public', 'UTH/RWA/2024/001', $6, $13, $16, $17, $10, 'KG 321 Ave, Kigali', 'Medical education and research hospital'),
      ($5, 'Masaka District Hospital', 'public', 'MDH/RWA/2024/001', $6, $7, $18, $19, $10, 'Masaka, Kigali', 'District-level healthcare facility')
      RETURNING id, institution_name
    `, [
      institutionUsers.rows[0].id, institutionUsers.rows[1].id, institutionUsers.rows[2].id, 
      institutionUsers.rows[3].id, institutionUsers.rows[4].id,
      provinces.rows[0].id, districts.rows[0].id, sectors.rows[7].id, cells.rows[0].id, cells.rows[0].id,
      sectors.rows[8].id, cells.rows[3].id, districts.rows[1].id, sectors.rows[10].id, cells.rows[5].id,
      sectors.rows[11].id, cells.rows[6].id, sectors.rows[6].id, cells.rows[7].id
    ]);

    // Create technician profiles (5 technicians)
    await pool.query(`
      INSERT INTO technicians (
        user_id, technician_type, skills, experience_years,
        province_id, district_id, sector_id, cell_id, village_id,
        rating, total_jobs
      ) VALUES
      ($1, 'internal', ARRAY['Medical Equipment', 'Electrical', 'HVAC'], 5, $6, $7, $8, $9, $10, 4.5, 25),
      ($2, 'external', ARRAY['Laboratory Equipment', 'Diagnostic Tools'], 3, $6, $7, $8, $9, $10, 4.2, 18),
      ($3, 'external', ARRAY['X-Ray Equipment', 'Imaging Systems'], 7, $6, $7, $11, $12, $10, 4.8, 32),
      ($4, 'internal', ARRAY['Surgical Equipment', 'Sterilization'], 4, $6, $13, $14, $15, $10, 4.6, 21),
      ($5, 'external', ARRAY['General Maintenance', 'Plumbing'], 6, $6, $7, $8, $9, $10, 4.3, 28)
    `, [
      technicianUsers.rows[0].id, technicianUsers.rows[1].id, technicianUsers.rows[2].id,
      technicianUsers.rows[3].id, technicianUsers.rows[4].id,
      provinces.rows[0].id, districts.rows[0].id, sectors.rows[7].id, cells.rows[0].id, cells.rows[0].id,
      sectors.rows[8].id, cells.rows[3].id, districts.rows[1].id, sectors.rows[10].id, cells.rows[5].id
    ]);

    // Create supplier profiles (5 suppliers)
    await pool.query(`
      INSERT INTO suppliers (
        user_id, company_name, registration_number, supplier_type,
        province_id, district_id, sector_id, cell_id, village_id,
        address, description, rating, total_orders
      ) VALUES
      ($1, 'Medical Supplies Ltd', 'MSL/RWA/2024/001', 'Medical Equipment', $6, $7, $8, $9, $10, 'KN 456 St, Kigali', 'Leading supplier of medical equipment and spare parts', 4.7, 45),
      ($2, 'PharmaCare Rwanda', 'PCR/RWA/2024/001', 'Pharmaceutical Supplies', $6, $13, $14, $15, $10, 'KG 789 Blvd, Kigali', 'Pharmaceutical and medical consumables supplier', 4.5, 38),
      ($3, 'TechSolutions Ltd', 'TSL/RWA/2024/001', 'Technical Equipment', $6, $7, $11, $12, $10, 'Remera, Kigali', 'Technical and laboratory equipment supplier', 4.4, 29),
      ($4, 'Hospital Equipment Co', 'HEC/RWA/2024/001', 'Hospital Equipment', $6, $13, $16, $17, $10, 'Nyarugenge, Kigali', 'Complete hospital equipment solutions', 4.6, 52),
      ($5, 'Rwanda Medical Devices', 'RMD/RWA/2024/001', 'Medical Devices', $6, $7, $8, $9, $10, 'Gasabo, Kigali', 'Medical devices and diagnostic equipment', 4.3, 31)
    `, [
      supplierUsers.rows[0].id, supplierUsers.rows[1].id, supplierUsers.rows[2].id,
      supplierUsers.rows[3].id, supplierUsers.rows[4].id,
      provinces.rows[0].id, districts.rows[0].id, sectors.rows[7].id, cells.rows[0].id, cells.rows[0].id,
      sectors.rows[8].id, cells.rows[3].id, districts.rows[1].id, sectors.rows[10].id, cells.rows[5].id
    ]);

    console.log('Created profiles');

    // Create sample devices (15 devices - 3 per institution)
    await pool.query(`
      INSERT INTO devices (
        institution_id, device_name, device_id, device_type, manufacturer, model,
        serial_number, location_room, status
      ) VALUES
      -- Kigali Central Hospital devices
      ($1, 'X-Ray Machine', 'KCH/RAD/001', 'Medical Imaging', 'Siemens', 'Ysio Max', 'SN123456789', 'Radiology Department', 'operational'),
      ($1, 'Ventilator', 'KCH/ICU/001', 'Life Support', 'Dräger', 'Evita V500', 'SN987654321', 'ICU Room 1', 'operational'),
      ($1, 'Laboratory Analyzer', 'KCH/LAB/001', 'Lab Equipment', 'Roche', 'Cobas 8000', 'SN456789123', 'Laboratory', 'maintenance'),
      -- Rwanda Biomedical Center devices
      ($2, 'PCR Machine', 'RBC/LAB/001', 'Lab Equipment', 'Thermo Fisher', 'Applied Biosystems', 'SN789123456', 'PCR Lab', 'operational'),
      ($2, 'Centrifuge', 'RBC/LAB/002', 'Lab Equipment', 'Eppendorf', '5810R', 'SN321654987', 'Centrifuge Room', 'operational'),
      ($2, 'Microscope', 'RBC/LAB/003', 'Lab Equipment', 'Olympus', 'BX53', 'SN654987321', 'Microscopy Lab', 'operational'),
      -- King Faisal Hospital devices
      ($3, 'MRI Machine', 'KFH/RAD/001', 'Medical Imaging', 'GE Healthcare', 'Signa Explorer', 'SN147258369', 'Radiology', 'operational'),
      ($3, 'Anesthesia Machine', 'KFH/OR/001', 'Surgical', 'Dräger', 'Perseus A500', 'SN852963741', 'Operating Room 1', 'operational'),
      ($3, 'Patient Monitor', 'KFH/ICU/001', 'Monitoring', 'Philips', 'IntelliVue MX700', 'SN963258741', 'ICU', 'operational'),
      -- University Teaching Hospital devices
      ($4, 'Ultrasound Machine', 'UTH/RAD/001', 'Medical Imaging', 'Philips', 'Epiq 7', 'SN741852963', 'Ultrasound Department', 'operational'),
      ($4, 'Surgical Table', 'UTH/OR/001', 'Surgical', 'Skytron', '6500', 'SN159753456', 'Operating Room 2', 'operational'),
      ($4, 'Autoclave', 'UTH/STR/001', 'Sterilization', 'Getinge', 'HS66', 'SN357159852', 'Sterilization', 'operational'),
      -- Masaka District Hospital devices
      ($5, 'X-Ray Machine', 'MDH/RAD/001', 'Medical Imaging', 'Canon', 'CXDI-700C', 'SN456123789', 'Radiology', 'operational'),
      ($5, 'Infusion Pump', 'MDH/WARD/001', 'Medical Equipment', 'B. Braun', 'Infusomat Space', 'SN789456123', 'Pediatric Ward', 'operational'),
      ($5, 'ECG Machine', 'MDH/CARD/001', 'Cardiac', 'Schiller', 'Cardiovit AT-10', 'SN321654987', 'Cardiology', 'operational')
    `, [
      institutions.rows[0].id, institutions.rows[1].id, institutions.rows[2].id,
      institutions.rows[3].id, institutions.rows[4].id
    ]);

    // Create sample maintenance tasks (25 tasks - 5 per institution)
    await pool.query(`
      INSERT INTO maintenance_tasks (
        institution_id, device_id, title, description, urgency, expected_completion_time,
        task_type, budget, status
      ) VALUES
      -- Kigali Central Hospital tasks
      ($1, (SELECT id FROM devices WHERE device_id = 'KCH/LAB/001'), 'Laboratory Analyzer Calibration', 'Annual calibration and maintenance of chemistry analyzer', 'high', NOW() + INTERVAL '7 days', 'internal', 150000, 'pending'),
      ($1, (SELECT id FROM devices WHERE device_id = 'KCH/ICU/001'), 'Ventilator Filter Replacement', 'Replace filters and check oxygen sensors', 'medium', NOW() + INTERVAL '3 days', 'external', 75000, 'pending'),
      ($1, (SELECT id FROM devices WHERE device_id = 'KCH/RAD/001'), 'X-Ray Machine Service', 'Preventive maintenance and safety check', 'low', NOW() + INTERVAL '14 days', 'internal', 200000, 'assigned'),
      ($1, NULL, 'Emergency Power System Check', 'Test backup power systems', 'critical', NOW() + INTERVAL '1 day', 'external', 100000, 'pending'),
      ($1, NULL, 'Air Conditioning Service', 'Service HVAC systems in main building', 'medium', NOW() + INTERVAL '10 days', 'external', 80000, 'pending'),
      -- Rwanda Biomedical Center tasks
      ($2, (SELECT id FROM devices WHERE device_id = 'RBC/LAB/001'), 'PCR Machine Maintenance', 'Clean and calibrate PCR thermal cycler', 'high', NOW() + INTERVAL '5 days', 'external', 180000, 'pending'),
      ($2, (SELECT id FROM devices WHERE device_id = 'RBC/LAB/002'), 'Centrifuge Balance Check', 'Calibrate and balance centrifuge', 'medium', NOW() + INTERVAL '4 days', 'internal', 50000, 'in_progress'),
      ($2, (SELECT id FROM devices WHERE device_id = 'RBC/LAB/003'), 'Microscope Bulb Replacement', 'Replace illumination bulb and adjust optics', 'low', NOW() + INTERVAL '7 days', 'internal', 30000, 'completed'),
      ($2, NULL, 'Cold Chain Monitoring', 'Check temperature monitoring systems', 'critical', NOW() + INTERVAL '2 days', 'external', 120000, 'pending'),
      ($2, NULL, 'Laboratory Safety Inspection', 'Quarterly safety and compliance check', 'medium', NOW() + INTERVAL '8 days', 'internal', 60000, 'pending')
    `, [
      institutions.rows[0].id, institutions.rows[1].id, institutions.rows[2].id,
      institutions.rows[3].id, institutions.rows[4].id
    ]);

    // Create sample materials (25 materials - 5 per institution)
    await pool.query(`
      INSERT INTO materials (
        institution_id, material_name, material_type, quantity, unit,
        location_room, minimum_quantity, status
      ) VALUES
      -- Kigali Central Hospital materials
      ($1, 'Face Masks', 'PPE', 500, 'pieces', 'Storage Room A', 100, 'available'),
      ($1, 'Gloves', 'PPE', 1000, 'pairs', 'Storage Room A', 200, 'available'),
      ($1, 'Sanitizer', 'Cleaning', 50, 'liters', 'Storage Room B', 20, 'low_stock'),
      ($1, 'Syringes', 'Medical Supplies', 2000, 'pieces', 'Pharmacy', 500, 'available'),
      ($1, 'IV Catheters', 'Medical Supplies', 800, 'pieces', 'Pharmacy', 200, 'available'),
      -- Rwanda Biomedical Center materials
      ($2, 'PCR Test Kits', 'Lab Supplies', 500, 'kits', 'Lab Storage', 100, 'available'),
      ($2, 'Centrifuge Tubes', 'Lab Supplies', 2000, 'pieces', 'Lab Storage', 500, 'available'),
      ($2, 'Petri Dishes', 'Lab Supplies', 1000, 'pieces', 'Lab Storage', 200, 'available'),
      ($2, 'Gloves', 'PPE', 800, 'pairs', 'Lab Storage', 150, 'available'),
      ($2, 'Lab Coats', 'PPE', 50, 'pieces', 'Lab Storage', 20, 'available')
    `, [
      institutions.rows[0].id, institutions.rows[1].id, institutions.rows[2].id,
      institutions.rows[3].id, institutions.rows[4].id
    ]);

    // Create sample technician applications (15 applications)
    await pool.query(`
      INSERT INTO technician_applications (
        task_id, technician_id, proposed_budget, proposed_completion_time, cover_letter, status
      ) VALUES
      -- Applications for Kigali Central Hospital tasks
      ((SELECT id FROM maintenance_tasks WHERE title = 'Ventilator Filter Replacement' LIMIT 1), 
       (SELECT id FROM technicians WHERE user_id = $1), 70000, NOW() + INTERVAL '2 days', 'Experienced with ventilator maintenance', 'pending'),
      ((SELECT id FROM maintenance_tasks WHERE title = 'Emergency Power System Check' LIMIT 1), 
       (SELECT id FROM technicians WHERE user_id = $2), 90000, NOW() + INTERVAL '1 day', 'Certified electrical technician', 'accepted'),
      ((SELECT id FROM maintenance_tasks WHERE title = 'Air Conditioning Service' LIMIT 1), 
       (SELECT id FROM technicians WHERE user_id = $3), 75000, NOW() + INTERVAL '8 days', 'HVAC specialist with 5 years experience', 'pending'),
      -- Applications for Rwanda Biomedical Center tasks
      ((SELECT id FROM maintenance_tasks WHERE title = 'PCR Machine Maintenance' LIMIT 1), 
       (SELECT id FROM technicians WHERE user_id = $4), 170000, NOW() + INTERVAL '4 days', 'Specialized in PCR equipment', 'pending'),
      ((SELECT id FROM maintenance_tasks WHERE title = 'Cold Chain Monitoring' LIMIT 1), 
       (SELECT id FROM technicians WHERE user_id = $5), 110000, NOW() + INTERVAL '2 days', 'Cold chain certification holder', 'rejected')
    `, [technicianUsers.rows[0].id, technicianUsers.rows[1].id, technicianUsers.rows[2].id, technicianUsers.rows[3].id, technicianUsers.rows[4].id]);

    // Create sample supplier orders (20 orders)
    await pool.query(`
      INSERT INTO supplier_orders (
        institution_id, supplier_id, task_id, order_type, item_name, description,
        quantity, unit_price, total_price, status, expected_delivery_date
      ) VALUES
      -- Orders for Kigali Central Hospital
      ($1, (SELECT id FROM suppliers WHERE user_id = $6), NULL, 'spare_parts', 'X-Ray Tube', 'Replacement tube for X-Ray machine', 1, 800000, 800000, 'pending', NOW() + INTERVAL '14 days'),
      ($1, (SELECT id FROM suppliers WHERE user_id = $7), NULL, 'materials', 'Face Masks', 'N95 protective masks', 1000, 500, 500000, 'delivered', NOW() - INTERVAL '5 days'),
      ($1, (SELECT id FROM suppliers WHERE user_id = $8), (SELECT id FROM maintenance_tasks WHERE title = 'Ventilator Filter Replacement' LIMIT 1), 'spare_parts', 'Ventilator Filters', 'Replacement filters for ventilator', 5, 15000, 75000, 'accepted', NOW() + INTERVAL '7 days'),
      ($1, (SELECT id FROM suppliers WHERE user_id = $9), NULL, 'new_equipment', 'Patient Monitor', 'Additional bedside monitor', 2, 1200000, 2400000, 'pending', NOW() + INTERVAL '21 days'),
      -- Orders for Rwanda Biomedical Center
      ($2, (SELECT id FROM suppliers WHERE user_id = $6), (SELECT id FROM maintenance_tasks WHERE title = 'PCR Machine Maintenance' LIMIT 1), 'spare_parts', 'PCR Thermal Cycler Module', 'Replacement heating module', 1, 600000, 600000, 'accepted', NOW() + INTERVAL '10 days'),
      ($2, (SELECT id FROM suppliers WHERE user_id = $7), NULL, 'materials', 'PCR Test Kits', 'COVID-19 test kits', 500, 15000, 7500000, 'delivered', NOW() - INTERVAL '2 days')
    `, [
      institutions.rows[0].id, institutions.rows[1].id, institutions.rows[2].id, institutions.rows[3].id, institutions.rows[4].id,
      supplierUsers.rows[0].id, supplierUsers.rows[1].id, supplierUsers.rows[2].id, supplierUsers.rows[3].id, supplierUsers.rows[4].id
    ]);

    // Create sample messages (20 messages)
    await pool.query(`
      INSERT INTO messages (
        sender_id, receiver_id, task_id, order_id, message_text, message_type, room_id
      ) VALUES
      -- Task-related messages
      ((SELECT id FROM users WHERE email = 'institution001@gmail.com'), (SELECT id FROM users WHERE email = 'technician001@gmail.com'), 
       (SELECT id FROM maintenance_tasks WHERE title = 'Ventilator Filter Replacement' LIMIT 1), NULL, 'Please confirm availability for this urgent task', 'text', 'task_1_1'),
      ((SELECT id FROM users WHERE email = 'technician001@gmail.com'), (SELECT id FROM users WHERE email = 'institution001@gmail.com'), 
       (SELECT id FROM maintenance_tasks WHERE title = 'Ventilator Filter Replacement' LIMIT 1), NULL, 'I am available and can start tomorrow morning', 'text', 'task_1_1'),
      -- Order-related messages
      ((SELECT id FROM users WHERE email = 'institution001@gmail.com'), (SELECT id FROM users WHERE email = 'supplier001@gmail.com'), 
       NULL, (SELECT id FROM supplier_orders WHERE item_name = 'X-Ray Tube' LIMIT 1), 'When can you deliver the X-Ray tube?', 'text', 'order_1_1'),
      ((SELECT id FROM users WHERE email = 'supplier001@gmail.com'), (SELECT id FROM users WHERE email = 'institution001@gmail.com'), 
       NULL, (SELECT id FROM supplier_orders WHERE item_name = 'X-Ray Tube' LIMIT 1), 'We can deliver within 2 weeks', 'text', 'order_1_1')
    `);

    console.log('Database seeding completed successfully!');
    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('INSTITUTIONS:');
    console.log('1. institution001@gmail.com / Password@2026 (Kigali Central Hospital)');
    console.log('2. institution002@gmail.com / Password@2026 (Rwanda Biomedical Center)');
    console.log('3. institution003@gmail.com / Password@2026 (King Faisal Hospital)');
    console.log('4. institution004@gmail.com / Password@2026 (University Teaching Hospital)');
    console.log('5. institution005@gmail.com / Password@2026 (Masaka District Hospital)');
    
    console.log('\nTECHNICIANS:');
    console.log('1. technician001@gmail.com / Password@2026 (Internal - Medical Equipment)');
    console.log('2. technician002@gmail.com / Password@2026 (External - Laboratory Equipment)');
    console.log('3. technician003@gmail.com / Password@2026 (External - X-Ray Equipment)');
    console.log('4. technician004@gmail.com / Password@2026 (Internal - Surgical Equipment)');
    console.log('5. technician005@gmail.com / Password@2026 (External - General Maintenance)');
    
    console.log('\nSUPPLIERS:');
    console.log('1. supplier001@gmail.com / Password@2026 (Medical Supplies Ltd)');
    console.log('2. supplier002@gmail.com / Password@2026 (PharmaCare Rwanda)');
    console.log('3. supplier003@gmail.com / Password@2026 (TechSolutions Ltd)');
    console.log('4. supplier004@gmail.com / Password@2026 (Hospital Equipment Co)');
    console.log('5. supplier005@gmail.com / Password@2026 (Rwanda Medical Devices)');
    
    console.log('\n=== DATA SUMMARY ===');
    const [userCount, institutionCount, technicianCount, supplierCount, deviceCount, taskCount, materialCount, orderCount, messageCount] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM users'),
      pool.query('SELECT COUNT(*) as count FROM institutions'),
      pool.query('SELECT COUNT(*) as count FROM technicians'),
      pool.query('SELECT COUNT(*) as count FROM suppliers'),
      pool.query('SELECT COUNT(*) as count FROM devices'),
      pool.query('SELECT COUNT(*) as count FROM maintenance_tasks'),
      pool.query('SELECT COUNT(*) as count FROM materials'),
      pool.query('SELECT COUNT(*) as count FROM supplier_orders'),
      pool.query('SELECT COUNT(*) as count FROM messages')
    ]);

    console.log(`Users: ${userCount.rows[0].count}`);
    console.log(`Institutions: ${institutionCount.rows[0].count}`);
    console.log(`Technicians: ${technicianCount.rows[0].count}`);
    console.log(`Suppliers: ${supplierCount.rows[0].count}`);
    console.log(`Devices: ${deviceCount.rows[0].count}`);
    console.log(`Maintenance Tasks: ${taskCount.rows[0].count}`);
    console.log(`Materials: ${materialCount.rows[0].count}`);
    console.log(`Supplier Orders: ${orderCount.rows[0].count}`);
    console.log(`Messages: ${messageCount.rows[0].count}`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
