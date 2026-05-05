const pool = require('../config/database');

class TechnicianApplication {
  static async create(applicationData) {
    const {
      task_id,
      technician_id,
      proposed_budget,
      proposed_completion_time,
      cover_letter
    } = applicationData;
    
    const query = `
      INSERT INTO technician_applications (
        task_id, technician_id, proposed_budget, proposed_completion_time, cover_letter
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const values = [task_id, technician_id, proposed_budget, proposed_completion_time, cover_letter];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getByTask(taskId) {
    const query = `
      SELECT ta.*, 
             t.first_name as tech_first_name,
             t.last_name as tech_last_name,
             t.phone as tech_phone,
             tech.skills,
             tech.experience_years,
             tech.rating,
             tech.total_jobs,
             u.email as tech_email
      FROM technician_applications ta
      JOIN technicians tech ON ta.technician_id = tech.id
      JOIN users u ON tech.user_id = u.id
      WHERE ta.task_id = $1
      ORDER BY ta.applied_at DESC
    `;
    
    try {
      const result = await pool.query(query, [taskId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getByTechnician(technicianId, status = null) {
    let query = `
      SELECT ta.*, 
             mt.title as task_title,
             mt.description as task_description,
             mt.urgency,
             i.institution_name,
             i.institution_type
      FROM technician_applications ta
      JOIN maintenance_tasks mt ON ta.task_id = mt.id
      JOIN institutions i ON mt.institution_id = i.id
      WHERE ta.technician_id = $1
    `;
    const values = [technicianId];
    
    if (status) {
      query += ` AND ta.status = $2`;
      values.push(status);
    }
    
    query += ` ORDER BY ta.applied_at DESC`;
    
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateStatus(applicationId, status) {
    const query = `
      UPDATE technician_applications 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    
    try {
      const result = await pool.query(query, [status, applicationId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const query = `
      SELECT ta.*, 
             t.first_name as tech_first_name,
             t.last_name as tech_last_name,
             tech.skills,
             tech.experience_years,
             tech.rating,
             mt.title as task_title,
             i.institution_name
      FROM technician_applications ta
      JOIN technicians tech ON ta.technician_id = tech.id
      JOIN users t ON tech.user_id = t.id
      JOIN maintenance_tasks mt ON ta.task_id = mt.id
      JOIN institutions i ON mt.institution_id = i.id
      WHERE ta.id = $1
    `;
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async checkExistingApplication(taskId, technicianId) {
    const query = `
      SELECT id FROM technician_applications 
      WHERE task_id = $1 AND technician_id = $2
    `;
    
    try {
      const result = await pool.query(query, [taskId, technicianId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async withdrawApplication(applicationId, technicianId) {
    const query = `
      UPDATE technician_applications 
      SET status = 'withdrawn', updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND technician_id = $2
      RETURNING *
    `;
    
    try {
      const result = await pool.query(query, [applicationId, technicianId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TechnicianApplication;
