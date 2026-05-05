const express = require('express');
const Location = require('../models/Location');

const router = express.Router();

router.get('/provinces', async (req, res) => {
  try {
    const provinces = await Location.getProvinces();
    res.json(provinces);
  } catch (error) {
    console.error('Get provinces error:', error);
    res.status(500).json({ message: 'Server error fetching provinces' });
  }
});

router.get('/districts/:provinceId', async (req, res) => {
  try {
    const { provinceId } = req.params;
    const districts = await Location.getDistricts(provinceId);
    res.json(districts);
  } catch (error) {
    console.error('Get districts error:', error);
    res.status(500).json({ message: 'Server error fetching districts' });
  }
});

router.get('/sectors/:districtId', async (req, res) => {
  try {
    const { districtId } = req.params;
    const sectors = await Location.getSectors(districtId);
    res.json(sectors);
  } catch (error) {
    console.error('Get sectors error:', error);
    res.status(500).json({ message: 'Server error fetching sectors' });
  }
});

router.get('/cells/:sectorId', async (req, res) => {
  try {
    const { sectorId } = req.params;
    const cells = await Location.getCells(sectorId);
    res.json(cells);
  } catch (error) {
    console.error('Get cells error:', error);
    res.status(500).json({ message: 'Server error fetching cells' });
  }
});

router.get('/villages/:cellId', async (req, res) => {
  try {
    const { cellId } = req.params;
    const villages = await Location.getVillages(cellId);
    res.json(villages);
  } catch (error) {
    console.error('Get villages error:', error);
    res.status(500).json({ message: 'Server error fetching villages' });
  }
});

module.exports = router;
