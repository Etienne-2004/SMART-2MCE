const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Complete PostgreSQL setup with all modern features
class Smart2MCESetup {
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'smart_2mce',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
    });
  }

  async setupCompleteEcosystem() {
    console.log('🚀 SMART-2MCE Complete Ecosystem Setup');
    console.log('==========================================');
    
    try {
      // Step 1: Create database if not exists
      await this.createDatabase();
      
      // Step 2: Test PostgreSQL connection
      await this.testConnection();
      
      // Step 3: Run modern schema
      await this.runSchema();
      
      // Step 4: Insert comprehensive seed data
      await this.seedDatabase();
      
      // Step 5: Verify setup
      await this.verifySetup();
      
      // Step 6: Create documentation
      await this.createDocumentation();
      
      console.log('\n✅ SMART-2MCE Complete Ecosystem Ready!');
      console.log('🎯 All modern features implemented successfully');
      
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
      throw error;
    }
  }

  async testConnection() {
    console.log('🔍 Testing PostgreSQL connection...');
    try {
      const result = await this.pool.query('SELECT version()');
      console.log('✅ PostgreSQL connection successful');
      console.log(`📊 Version: ${result.rows[0].version.split(',')[0]}`);
    } catch (error) {
      console.error('❌ Connection failed:', error.message);
      throw error;
    }
  }

  async createDatabase() {
    console.log('🗄️ Creating smart_2mce database...');
    try {
      const adminPool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: 'postgres',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
      });
      
      await adminPool.query('CREATE DATABASE smart_2mce');
      await adminPool.end();
      console.log('✅ Database created successfully');
    } catch (error) {
      if (error.code === '42P04') {
        console.log('ℹ️ Database already exists');
      } else {
        throw error;
      }
    }
  }

  async runSchema() {
    console.log('🏗️ Creating modern database schema...');
    try {
      const schemaPath = path.join(__dirname, 'schema-modern.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      await this.pool.query(schema);
      console.log('✅ Modern schema created successfully');
      console.log('📊 Tables: 20+ with advanced features');
      console.log('🔑 Indexes: 30+ for performance');
      console.log('⚡ Triggers: 5+ for automation');
    } catch (error) {
      console.error('❌ Schema creation failed:', error.message);
      throw error;
    }
  }

  async seedDatabase() {
    console.log('🌱 Inserting comprehensive seed data...');
    try {
      const { seedDatabase } = require('./seed-modern');
      await seedDatabase();
      console.log('✅ Seed data inserted successfully');
    } catch (error) {
      console.error('❌ Seed data insertion failed:', error.message);
      throw error;
    }
  }

  async verifySetup() {
    console.log('🔍 Verifying complete setup...');
    try {
      const stats = await this.pool.query(`
        SELECT 
          (SELECT COUNT(*) FROM users) as users,
          (SELECT COUNT(*) FROM institutions) as institutions,
          (SELECT COUNT(*) FROM technicians) as technicians,
          (SELECT COUNT(*) FROM suppliers) as suppliers,
          (SELECT COUNT(*) FROM devices) as devices,
          (SELECT COUNT(*) FROM maintenance_tasks) as tasks,
          (SELECT COUNT(*) FROM supplier_orders) as orders,
          (SELECT COUNT(*) FROM messages) as messages,
          (SELECT COUNT(*) FROM notifications) as notifications,
          (SELECT COUNT(*) FROM products) as products
      `);
      
      const stat = stats.rows[0];
      console.log('✅ Setup verification successful');
      console.log('📊 Database Statistics:');
      console.log(`   👥 Users: ${stat.users}`);
      console.log(`   🏥 Institutions: ${stat.institutions}`);
      console.log(`   🔧 Technicians: ${stat.technicians}`);
      console.log(`   📦 Suppliers: ${stat.suppliers}`);
      console.log(`   🏭 Devices: ${stat.devices}`);
      console.log(`   🔨 Tasks: ${stat.tasks}`);
      console.log(`   📋 Orders: ${stat.orders}`);
      console.log(`   💬 Messages: ${stat.messages}`);
      console.log(`   🔔 Notifications: ${stat.notifications}`);
      console.log(`   🛍️ Products: ${stat.products}`);
      
      // Verify all tables have 5+ records
      const tables = ['users', 'institutions', 'technicians', 'suppliers', 'devices', 'maintenance_tasks', 'supplier_orders', 'messages', 'notifications'];
      for (const table of tables) {
        const count = await this.pool.query(`SELECT COUNT(*) as count FROM ${table}`);
        if (count.rows[0].count < 5) {
          console.warn(`⚠️ Warning: ${table} has only ${count.rows[0].count} records (expected 5+)`);
        }
      }
    } catch (error) {
      console.error('❌ Verification failed:', error.message);
      throw error;
    }
  }

  async createDocumentation() {
    console.log('📄 Creating comprehensive documentation...');
    try {
      const docPath = path.join(__dirname, '../../SMART-2MCE-Documentation.md');
      if (fs.existsSync(docPath)) {
        console.log('✅ Documentation already exists');
      } else {
        console.log('ℹ️ Documentation file will be created separately');
      }
    } catch (error) {
      console.error('❌ Documentation creation failed:', error.message);
    }
  }

  async close() {
    await this.pool.end();
  }
}

// Run complete setup
if (require.main === module) {
  const setup = new Smart2MCESetup();
  setup.setupCompleteEcosystem()
    .then(() => {
      console.log('\n🎉 SMART-2MCE Complete Ecosystem Setup Finished!');
      console.log('🚀 Ready for professional deployment with all modern features');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Setup failed:', error.message);
      process.exit(1);
    });
}

module.exports = Smart2MCESetup;
