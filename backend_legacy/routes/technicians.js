const express = require('express');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, authorize('technician'), (req, res) => {
  res.json({ message: 'Technician dashboard - to be implemented' });
});

module.exports = router;
