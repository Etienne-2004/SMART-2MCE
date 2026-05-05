const MaintenanceTask = require('../models/MaintenanceTask');
const TechnicianApplication = require('../models/TechnicianApplication');

const getTasks = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    let tasks;
    if (user.role === 'institution') {
      const institution = await require('../models/Institution').findByUserId(user.id);
      tasks = await MaintenanceTask.getByInstitution(institution.id, status, limit, (page - 1) * limit);
    } else if (user.role === 'technician') {
      tasks = await MaintenanceTask.getTasksByTechnician(req.user.id, status);
    } else {
      tasks = await MaintenanceTask.getMarketplaceTasks(req.query);
    }
    
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
};

const createTask = async (req, res) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const institution = await require('../models/Institution').findByUserId(user.id);
    
    const taskData = {
      ...req.body,
      institution_id: institution.id
    };
    
    const task = await MaintenanceTask.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error creating task' });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await MaintenanceTask.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error fetching task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await MaintenanceTask.update(id, req.body);
    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error updating task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await MaintenanceTask.delete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error deleting task' });
  }
};

const getMarketplaceTasks = async (req, res) => {
  try {
    const tasks = await MaintenanceTask.getMarketplaceTasks(req.query);
    res.json(tasks);
  } catch (error) {
    console.error('Get marketplace tasks error:', error);
    res.status(500).json({ message: 'Server error fetching marketplace tasks' });
  }
};

const applyForTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const technician = await require('../models/Technician').findByUserId(user.id);
    
    const applicationData = {
      task_id: taskId,
      technician_id: technician.id,
      ...req.body
    };
    
    const application = await TechnicianApplication.create(applicationData);
    res.status(201).json(application);
  } catch (error) {
    console.error('Apply for task error:', error);
    res.status(500).json({ message: 'Server error applying for task' });
  }
};

const getApplications = async (req, res) => {
  try {
    const { taskId } = req.params;
    const applications = await TechnicianApplication.getByTask(taskId);
    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error fetching applications' });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    
    const application = await TechnicianApplication.updateStatus(applicationId, status);
    
    // If application is accepted, assign technician to task
    if (status === 'accepted') {
      await MaintenanceTask.assignTechnician(application.task_id, application.technician_id);
    }
    
    res.json(application);
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error updating application status' });
  }
};

const assignTechnician = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { technicianId } = req.body;
    
    const task = await MaintenanceTask.assignTechnician(taskId, technicianId);
    res.json(task);
  } catch (error) {
    console.error('Assign technician error:', error);
    res.status(500).json({ message: 'Server error assigning technician' });
  }
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getMarketplaceTasks,
  applyForTask,
  getApplications,
  updateApplicationStatus,
  assignTechnician
};
