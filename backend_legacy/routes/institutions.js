const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const Institution = require('../models/Institution');

const router = express.Router();

router.get('/dashboard', auth, authorize('institution'), async (req, res) => {
  try {
    const institution = await Institution.findByUserId(req.user.id);
    if (!institution) {
      return res.status(404).json({ message: 'Institution profile not found' });
    }
    
    const dashboardData = await Institution.getDashboardData(institution.id);
    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
});

router.get('/profile', auth, authorize('institution'), async (req, res) => {
  try {
    const institution = await Institution.findByUserId(req.user.id);
    if (!institution) {
      return res.status(404).json({ message: 'Institution profile not found' });
    }
    res.json(institution);
  } catch (error) {
    console.error('Get institution profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

module.exports = router;
