const pool = require('../config/database');

class Institution {
  static async create(institutionData) {
    const {
      user_id,
      institution_name,
      institution_type,
      registration_number,
      province_id,
      district_id,
      sector_id,
      cell_id,
      village_id,
      address,
      description
    } = institutionData;
    
    const query = `
      INSERT INTO institutions (
        user_id, institution_name, institution_type, registration_number,
        province_id, district_id, sector_id, cell_id, village_id,
        address, description
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    
    const values = [
      user_id, institution_name, institution_type, registration_number,
      province_id, district_id, sector_id, cell_id, village_id,
      address, description
    ];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(user_id) {
    const query = 'SELECT * FROM institutions WHERE user_id = $1';
    try {
      const result = await pool.query(query, [user_id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const query = `
      SELECT i.*, u.email, u.first_name, u.last_name, u.phone,
             p.name as province_name, d.name as district_name,
             s.name as sector_name, c.name as cell_name, v.name as village_name
      FROM institutions i
      JOIN users u ON i.user_id = u.id
      LEFT JOIN provinces p ON i.province_id = p.id
      LEFT JOIN districts d ON i.district_id = d.id
      LEFT JOIN sectors s ON i.sector_id = s.id
      LEFT JOIN cells c ON i.cell_id = c.id
      LEFT JOIN villages v ON i.village_id = v.id
      WHERE i.id = $1
    `;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getAll(limit = 50, offset = 0) {
    const query = `
      SELECT i.*, u.email, u.first_name, u.last_name,
             p.name as province_name, d.name as district_name
      FROM institutions i
      JOIN users u ON i.user_id = u.id
      LEFT JOIN provinces p ON i.province_id = p.id
      LEFT JOIN districts d ON i.district_id = d.id
      ORDER BY i.created_at DESC
      LIMIT $1 OFFSET $2
    `;
    try {
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, institutionData) {
    const {
      institution_name,
      institution_type,
      registration_number,
      province_id,
      district_id,
      sector_id,
      cell_id,
      village_id,
      address,
      description
    } = institutionData;
    
    const query = `
      UPDATE institutions 
      SET institution_name = $1, institution_type = $2, registration_number = $3,
          province_id = $4, district_id = $5, sector_id = $6, cell_id = $7, village_id = $8,
          address = $9, description = $10, updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING *
    `;
    
    const values = [
      institution_name, institution_type, registration_number,
      province_id, district_id, sector_id, cell_id, village_id,
      address, description, id
    ];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getDashboardData(institutionId) {
    const queries = {
      totalDevices: 'SELECT COUNT(*) as count FROM devices WHERE institution_id = $1',
      activeTasks: 'SELECT COUNT(*) as count FROM maintenance_tasks WHERE institution_id = $1 AND status IN ($2, $3, $4)',
      completedTasks: 'SELECT COUNT(*) as count FROM maintenance_tasks WHERE institution_id = $1 AND status = $2',
      pendingOrders: 'SELECT COUNT(*) as count FROM supplier_orders WHERE institution_id = $1 AND status = $2'
    };
    
    try {
      const [devices, active, completed, orders] = await Promise.all([
        pool.query(queries.totalDevices, [institutionId]),
        pool.query(queries.activeTasks, [institutionId, 'assigned', 'in_progress', 'pending']),
        pool.query(queries.completedTasks, [institutionId, 'completed']),
        pool.query(queries.pendingOrders, [institutionId, 'pending'])
      ]);
      
      return {
        totalDevices: parseInt(devices.rows[0].count),
        activeTasks: parseInt(active.rows[0].count),
        completedTasks: parseInt(completed.rows[0].count),
        pendingOrders: parseInt(orders.rows[0].count)
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Institution;
