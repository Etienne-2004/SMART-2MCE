const express = require('express');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, authorize('supplier'), (req, res) => {
  res.json({ message: 'Supplier dashboard - to be implemented' });
});

module.exports = router;
