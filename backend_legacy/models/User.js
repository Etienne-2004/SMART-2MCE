const pool = require('../config/database');

class User {
  static async create(userData) {
    const { email, password, first_name, last_name, phone, role } = userData;
    const query = `
      INSERT INTO users (email, password, first_name, last_name, phone, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [email, password, first_name, last_name, phone, role];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async updatePassword(id, newPassword) {
    const query = 'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2';
    try {
      const result = await pool.query(query, [newPassword, id]);
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }

  static async updateProfile(id, userData) {
    const { first_name, last_name, phone } = userData;
    const query = `
      UPDATE users 
      SET first_name = $1, last_name = $2, phone = $3, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $4
      RETURNING *
    `;
    const values = [first_name, last_name, phone, id];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
