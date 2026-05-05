const pool = require('../config/database');

const rwandaLocations = {
  provinces: [
    { name: 'Kigali City', code: '01' },
    { name: 'Northern Province', code: '02' },
    { name: 'Southern Province', code: '03' },
    { name: 'Eastern Province', code: '04' },
    { name: 'Western Province', code: '05' }
  ],
  
  districts: {
    '01': [ // Kigali City
      { name: 'Gasabo', code: '01' },
      { name: 'Kicukiro', code: '02' },
      { name: 'Nyarugenge', code: '03' }
    ],
    '02': [ // Northern Province
      { name: 'Burera', code: '01' },
      { name: 'Gicumbi', code: '02' },
      { name: 'Gakenke', code: '03' },
      { name: 'Musanze', code: '04' },
      { name: 'Rulindo', code: '05' }
    ],
    '03': [ // Southern Province
      { name: 'Gisagara', code: '01' },
      { name: 'Huye', code: '02' },
      { name: 'Kamonyi', code: '03' },
      { name: 'Karongi', code: '04' },
      { name: 'Muhanga', code: '05' },
      { name: 'Nyamagabe', code: '06' },
      { name: 'Nyanza', code: '07' },
      { name: 'Nyagatare', code: '08' },
      { name: 'Nyaruguru', code: '09' },
      { name: 'Ruhango', code: '10' }
    ],
    '04': [ // Eastern Province
      { name: 'Bugesera', code: '01' },
      { name: 'Gatsibo', code: '02' },
      { name: 'Kayonza', code: '03' },
      { name: 'Kirehe', code: '04' },
      { name: 'Ngoma', code: '05' },
      { name: 'Nyagatare', code: '06' },
      { name: 'Rwamagana', code: '07' }
    ],
    '05': [ // Western Province
      { name: 'Karongi', code: '01' },
      { name: 'Ngororero', code: '02' },
      { name: 'Nyabihu', code: '03' },
      { name: 'Nyamasheke', code: '04' },
      { name: 'Rubavu', code: '05' },
      { name: 'Rusizi', code: '06' },
      { name: 'Rutsiro', code: '07' }
    ]
  },
  
  sectors: {
    // Sample sectors for each district (complete implementation would include all sectors)
    '01-01': [ // Gasabo
      { name: 'Bumbogo', code: '01' },
      { name: 'Gikondo', code: '02' },
      { name: 'Jali', code: '03' },
      { name: 'Kacyiru', code: '04' },
      { name: 'Kigali', code: '05' },
      { name: 'Kimihurura', code: '06' },
      { name: 'Kimironko', code: '07' },
      { name: 'Kinyinya', code: '08' },
      { name: 'Remera', code: '09' },
      { name: 'Rusororo', code: '10' }
    ],
    '01-02': [ // Kicukiro
      { name: 'Gahanga', code: '01' },
      { name: 'Gatenga', code: '02' },
      { name: 'Gikondo', code: '03' },
      { name: 'Kagarama', code: '04' },
      { name: 'Kanombe', code: '05' },
      { name: 'Kicukiro', code: '06' },
      { name: 'Kigarama', code: '07' },
      { name: 'Masaka', code: '08' },
      { name: 'Niboye', code: '09' },
      { name: 'Nyarugunga', code: '10' }
    ],
    '01-03': [ // Nyarugenge
      { name: 'Gitega', code: '01' },
      { name: 'Kanyinya', code: '02' },
      { name: 'Kigali', code: '03' },
      { name: 'Kimisagara', code: '04' },
      { name: 'Mageragere', code: '05' },
      { name: 'Muhima', code: '06' },
      { name: 'Nyabugogo', code: '07' },
      { name: 'Nyamirambo', code: '08' },
      { name: 'Rwezamenyo', code: '09' },
      { name: 'Rwandex', code: '10' }
    ]
  }
};

const seedRwandaLocations = async () => {
  try {
    console.log('Seeding Rwanda location data...');

    // Clear existing location data
    await pool.query('DELETE FROM villages');
    await pool.query('DELETE FROM cells');
    await pool.query('DELETE FROM sectors');
    await pool.query('DELETE FROM districts');
    await pool.query('DELETE FROM provinces');

    // Insert provinces
    const provinceResult = await pool.query(`
      INSERT INTO provinces (name, code) VALUES
      ${rwandaLocations.provinces.map(p => `('${p.name}', '${p.code}')`).join(', ')}
      RETURNING id, code
    `);

    const provinceMap = {};
    provinceResult.rows.forEach(row => {
      provinceMap[row.code] = row.id;
    });

    console.log('Inserted provinces');

    // Insert districts and sectors
    for (const [provinceCode, districts] of Object.entries(rwandaLocations.districts)) {
      const provinceId = provinceMap[provinceCode];
      
      // Insert districts
      const districtResult = await pool.query(`
        INSERT INTO districts (name, code, province_id) VALUES
        ${districts.map(d => `('${d.name}', '${provinceCode}${d.code}', ${provinceId})`).join(', ')}
        RETURNING id, code
      `);

      const districtMap = {};
      districtResult.rows.forEach(row => {
        districtMap[row.code] = row.id;
      });

      console.log(`Inserted districts for province ${provinceCode}`);

      // Insert sectors for this province's districts
      for (const [districtKey, sectors] of Object.entries(rwandaLocations.sectors)) {
        if (districtKey.startsWith(provinceCode + '-')) {
          const districtCode = districtKey.split('-')[1];
          const districtId = districtMap[provinceCode + districtCode];
          
          if (districtId && sectors) {
            await pool.query(`
              INSERT INTO sectors (name, code, district_id) VALUES
              ${sectors.map(s => `('${s.name}', '${districtKey}${s.code}', ${districtId})`).join(', ')}
            `);
          }
        }
      }
    }

    // Insert sample cells and villages for a few sectors
    await pool.query(`
      INSERT INTO cells (name, code, sector_id) VALUES
      ('Cell 1', '01', (SELECT id FROM sectors WHERE code = '01-0101')),
      ('Cell 2', '02', (SELECT id FROM sectors WHERE code = '01-0101')),
      ('Cell 3', '03', (SELECT id FROM sectors WHERE code = '01-0101')),
      ('Cell 4', '04', (SELECT id FROM sectors WHERE code = '01-0101'))
    `);

    await pool.query(`
      INSERT INTO villages (name, code, cell_id) VALUES
      ('Village 1', '01', (SELECT id FROM cells WHERE code = '01')),
      ('Village 2', '02', (SELECT id FROM cells WHERE code = '01')),
      ('Village 3', '03', (SELECT id FROM cells WHERE code = '01')),
      ('Village 4', '04', (SELECT id FROM cells WHERE code = '01')),
      ('Village 5', '05', (SELECT id FROM cells WHERE code = '02')),
      ('Village 6', '06', (SELECT id FROM cells WHERE code = '02'))
    `);

    console.log('Rwanda location data seeded successfully!');
    
    // Display summary
    const [provinceCount, districtCount, sectorCount, cellCount, villageCount] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM provinces'),
      pool.query('SELECT COUNT(*) as count FROM districts'),
      pool.query('SELECT COUNT(*) as count FROM sectors'),
      pool.query('SELECT COUNT(*) as count FROM cells'),
      pool.query('SELECT COUNT(*) as count FROM villages')
    ]);

    console.log('\nLocation Summary:');
    console.log(`Provinces: ${provinceCount.rows[0].count}`);
    console.log(`Districts: ${districtCount.rows[0].count}`);
    console.log(`Sectors: ${sectorCount.rows[0].count}`);
    console.log(`Cells: ${cellCount.rows[0].count}`);
    console.log(`Villages: ${villageCount.rows[0].count}`);

  } catch (error) {
    console.error('Error seeding Rwanda locations:', error);
  } finally {
    await pool.end();
  }
};

// Run if called directly
if (require.main === module) {
  seedRwandaLocations();
}

module.exports = seedRwandaLocations;
