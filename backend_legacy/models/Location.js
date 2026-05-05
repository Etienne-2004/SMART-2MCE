const pool = require('../config/database');

class Location {
  static async getProvinces() {
    const query = 'SELECT * FROM provinces ORDER BY name';
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getDistricts(provinceId) {
    const query = 'SELECT * FROM districts WHERE province_id = $1 ORDER BY name';
    try {
      const result = await pool.query(query, [provinceId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getSectors(districtId) {
    const query = 'SELECT * FROM sectors WHERE district_id = $1 ORDER BY name';
    try {
      const result = await pool.query(query, [districtId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getCells(sectorId) {
    const query = 'SELECT * FROM cells WHERE sector_id = $1 ORDER BY name';
    try {
      const result = await pool.query(query, [sectorId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getVillages(cellId) {
    const query = 'SELECT * FROM villages WHERE cell_id = $1 ORDER BY name';
    try {
      const result = await pool.query(query, [cellId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getLocationHierarchy(locationIds) {
    const { province_id, district_id, sector_id, cell_id, village_id } = locationIds;
    
    let query = `
      SELECT 
        p.name as province_name,
        d.name as district_name,
        s.name as sector_name,
        c.name as cell_name,
        v.name as village_name
      FROM provinces p
      LEFT JOIN districts d ON d.province_id = p.id
      LEFT JOIN sectors s ON s.district_id = d.id
      LEFT JOIN cells c ON c.sector_id = s.id
      LEFT JOIN villages v ON v.cell_id = c.id
      WHERE 1=1
    `;
    
    const values = [];
    let paramIndex = 1;
    
    if (province_id) {
      query += ` AND p.id = $${paramIndex++}`;
      values.push(province_id);
    }
    if (district_id) {
      query += ` AND d.id = $${paramIndex++}`;
      values.push(district_id);
    }
    if (sector_id) {
      query += ` AND s.id = $${paramIndex++}`;
      values.push(sector_id);
    }
    if (cell_id) {
      query += ` AND c.id = $${paramIndex++}`;
      values.push(cell_id);
    }
    if (village_id) {
      query += ` AND v.id = $${paramIndex++}`;
      values.push(village_id);
    }
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Location;
