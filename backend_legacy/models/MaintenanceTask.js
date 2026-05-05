const pool = require('../config/database');

class MaintenanceTask {
  static async create(taskData) {
    const {
      institution_id,
      device_id,
      title,
      description,
      urgency,
      expected_completion_time,
      task_type,
      assigned_technician_id,
      budget,
      announcement_file_path,
      application_deadline
    } = taskData;
    
    const query = `
      INSERT INTO maintenance_tasks (
        institution_id, device_id, title, description, urgency,
        expected_completion_time, task_type, assigned_technician_id,
        budget, announcement_file_path, application_deadline
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    
    const values = [
      institution_id, device_id, title, description, urgency,
      expected_completion_time, task_type, assigned_technician_id,
      budget, announcement_file_path, application_deadline
    ];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const query = `
      SELECT mt.*, i.institution_name, d.device_name, d.device_id as device_identifier,
             t.first_name as tech_first_name, t.last_name as tech_last_name
      FROM maintenance_tasks mt
      JOIN institutions i ON mt.institution_id = i.id
      LEFT JOIN devices d ON mt.device_id = d.id
      LEFT JOIN technicians tech ON mt.assigned_technician_id = tech.id
      LEFT JOIN users t ON tech.user_id = t.id
      WHERE mt.id = $1
    `;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getByInstitution(institutionId, status = null, limit = 50, offset = 0) {
    let query = `
      SELECT mt.*, d.device_name, d.device_id as device_identifier,
             t.first_name as tech_first_name, t.last_name as tech_last_name
      FROM maintenance_tasks mt
      LEFT JOIN devices d ON mt.device_id = d.id
      LEFT JOIN technicians tech ON mt.assigned_technician_id = tech.id
      LEFT JOIN users t ON tech.user_id = t.id
      WHERE mt.institution_id = $1
    `;
    const values = [institutionId];
    
    if (status) {
      query += ` AND mt.status = $2`;
      values.push(status);
    }
    
    query += ` ORDER BY mt.created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);
    
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getMarketplaceTasks(filters = {}) {
    let query = `
      SELECT mt.*, i.institution_name, i.institution_type,
             p.name as province_name, d.name as district_name,
             s.name as sector_name
      FROM maintenance_tasks mt
      JOIN institutions i ON mt.institution_id = i.id
      LEFT JOIN provinces p ON i.province_id = p.id
      LEFT JOIN districts d ON i.district_id = d.id
      LEFT JOIN sectors s ON i.sector_id = s.id
      WHERE mt.task_type = 'external' AND mt.status = 'pending'
    `;
    
    const values = [];
    let paramIndex = 1;
    
    if (filters.urgency) {
      query += ` AND mt.urgency = $${paramIndex++}`;
      values.push(filters.urgency);
    }
    
    if (filters.province_id) {
      query += ` AND i.province_id = $${paramIndex++}`;
      values.push(filters.province_id);
    }
    
    if (filters.district_id) {
      query += ` AND i.district_id = $${paramIndex++}`;
      values.push(filters.district_id);
    }
    
    if (filters.skill_required) {
      query += ` AND (mt.title ILIKE $${paramIndex++} OR mt.description ILIKE $${paramIndex++})`;
      values.push(`%${filters.skill_required}%`, `%${filters.skill_required}%`);
    }
    
    query += ` ORDER BY mt.created_at DESC`;
    
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateStatus(id, status, actualCompletionTime = null) {
    const query = `
      UPDATE maintenance_tasks 
      SET status = $1, actual_completion_time = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    
    try {
      const result = await pool.query(query, [status, actualCompletionTime, id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async assignTechnician(taskId, technicianId) {
    const query = `
      UPDATE maintenance_tasks 
      SET assigned_technician_id = $1, status = 'assigned', updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    
    try {
      const result = await pool.query(query, [technicianId, taskId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getTasksByTechnician(technicianId, status = null) {
    let query = `
      SELECT mt.*, i.institution_name, d.device_name, d.device_id as device_identifier
      FROM maintenance_tasks mt
      JOIN institutions i ON mt.institution_id = i.id
      LEFT JOIN devices d ON mt.device_id = d.id
      WHERE mt.assigned_technician_id = $1
    `;
    const values = [technicianId];
    
    if (status) {
      query += ` AND mt.status = $2`;
      values.push(status);
    }
    
    query += ` ORDER BY mt.created_at DESC`;
    
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MaintenanceTask;
