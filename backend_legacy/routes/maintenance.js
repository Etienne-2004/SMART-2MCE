const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const maintenanceController = require('../controllers/maintenanceController');

const router = express.Router();

router.get('/tasks', auth, maintenanceController.getTasks);
router.post('/tasks', auth, authorize('institution'), maintenanceController.createTask);
router.get('/tasks/:id', auth, maintenanceController.getTask);
router.put('/tasks/:id', auth, maintenanceController.updateTask);
router.delete('/tasks/:id', auth, authorize('institution'), maintenanceController.deleteTask);

// Marketplace
router.get('/marketplace', auth, authorize('technician'), maintenanceController.getMarketplaceTasks);

// Applications
router.post('/tasks/:taskId/apply', auth, authorize('technician'), maintenanceController.applyForTask);
router.get('/tasks/:taskId/applications', auth, authorize('institution'), maintenanceController.getApplications);
router.patch('/applications/:applicationId', auth, authorize('institution'), maintenanceController.updateApplicationStatus);

// Assignment
router.post('/tasks/:taskId/assign', auth, authorize('institution'), maintenanceController.assignTechnician);

module.exports = router;
