import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Build,
  Inventory,
  Assignment,
  Add,
  Visibility,
  Edit,
  Delete,
  TrendingUp,
  Schedule,
  Warning,
  CheckCircle
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const InstitutionDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalDevices: 0,
    activeTasks: 0,
    completedTasks: 0,
    pendingOrders: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openDeviceDialog, setOpenDeviceDialog] = useState(false);

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    urgency: 'medium',
    expected_completion_time: '',
    task_type: 'internal',
    budget: '',
    device_id: ''
  });

  const [deviceForm, setDeviceForm] = useState({
    device_name: '',
    device_id: '',
    device_type: '',
    manufacturer: '',
    model: '',
    serial_number: '',
    location_room: '',
    status: 'operational'
  });

  useEffect(() => {
    fetchDashboardData();
    fetchRecentTasks();
    fetchDevices();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/institutions/dashboard');
      setDashboardData(response.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    }
  };

  const fetchRecentTasks = async () => {
    try {
      const response = await axios.get('/api/maintenance/tasks?limit=5');
      setRecentTasks(response.data);
    } catch (err) {
      console.error('Error fetching recent tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDevices = async () => {
    try {
      const response = await axios.get('/api/devices');
      setDevices(response.data);
    } catch (err) {
      console.error('Error fetching devices:', err);
    }
  };

  const handleCreateTask = async () => {
    try {
      await axios.post('/api/maintenance/tasks', taskForm);
      toast.success('Task created successfully!');
      setOpenTaskDialog(false);
      setTaskForm({
        title: '',
        description: '',
        urgency: 'medium',
        expected_completion_time: '',
        task_type: 'internal',
        budget: '',
        device_id: ''
      });
      fetchRecentTasks();
      fetchDashboardData();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create task';
      toast.error(errorMessage);
    }
  };

  const handleCreateDevice = async () => {
    try {
      await axios.post('/api/devices', deviceForm);
      toast.success('Device registered successfully!');
      setOpenDeviceDialog(false);
      setDeviceForm({
        device_name: '',
        device_id: '',
        device_type: '',
        manufacturer: '',
        model: '',
        serial_number: '',
        location_room: '',
        status: 'operational'
      });
      fetchDevices();
      fetchDashboardData();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to register device';
      toast.error(errorMessage);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'assigned': return 'info';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Institution Dashboard
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stats-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="white" gutterBottom>
                    Total Devices
                  </Typography>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    {dashboardData.totalDevices}
                  </Typography>
                </Box>
                <Build sx={{ fontSize: 40, color: 'rgba(255,255,255,0.7)' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="stats-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="white" gutterBottom>
                    Active Tasks
                  </Typography>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    {dashboardData.activeTasks}
                  </Typography>
                </Box>
                <Assignment sx={{ fontSize: 40, color: 'rgba(255,255,255,0.7)' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="stats-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="white" gutterBottom>
                    Completed Tasks
                  </Typography>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    {dashboardData.completedTasks}
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, color: 'rgba(255,255,255,0.7)' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="stats-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="white" gutterBottom>
                    Pending Orders
                  </Typography>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    {dashboardData.pendingOrders}
                  </Typography>
                </Box>
                <Inventory sx={{ fontSize: 40, color: 'rgba(255,255,255,0.7)' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Tasks and Devices */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Recent Maintenance Tasks
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenTaskDialog(true)}
              >
                Create Task
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Task Title</TableCell>
                    <TableCell>Device</TableCell>
                    <TableCell>Urgency</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography color="text.secondary">
                          No tasks found. Create your first task to get started.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>
                          {task.device_name || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={task.urgency}
                            color={getUrgencyColor(task.urgency)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={task.status}
                            color={getStatusColor(task.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                          <IconButton size="small">
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Quick Actions
              </Typography>
            </Box>
            
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Build />}
                onClick={() => setOpenDeviceDialog(true)}
              >
                Register Device
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Inventory />}
              >
                Manage Materials
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Assignment />}
              >
                View All Tasks
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Business />}
              >
                Marketplace
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpenTaskDialog(true)}
      >
        <Add />
      </Fab>

      {/* Create Task Dialog */}
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Maintenance Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={taskForm.description}
                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Urgency</InputLabel>
                <Select
                  value={taskForm.urgency}
                  label="Urgency"
                  onChange={(e) => setTaskForm({ ...taskForm, urgency: e.target.value })}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Task Type</InputLabel>
                <Select
                  value={taskForm.task_type}
                  label="Task Type"
                  onChange={(e) => setTaskForm({ ...taskForm, task_type: e.target.value })}
                >
                  <MenuItem value="internal">Internal</MenuItem>
                  <MenuItem value="external">External</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Expected Completion Time"
                InputLabelProps={{ shrink: true }}
                value={taskForm.expected_completion_time}
                onChange={(e) => setTaskForm({ ...taskForm, expected_completion_time: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Budget (RWF)"
                value={taskForm.budget}
                onChange={(e) => setTaskForm({ ...taskForm, budget: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateTask} variant="contained">Create Task</Button>
        </DialogActions>
      </Dialog>

      {/* Register Device Dialog */}
      <Dialog open={openDeviceDialog} onClose={() => setOpenDeviceDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Register Device</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Device Name"
                value={deviceForm.device_name}
                onChange={(e) => setDeviceForm({ ...deviceForm, device_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Device ID (e.g., KRH/MH/001)"
                value={deviceForm.device_id}
                onChange={(e) => setDeviceForm({ ...deviceForm, device_id: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Device Type"
                value={deviceForm.device_type}
                onChange={(e) => setDeviceForm({ ...deviceForm, device_type: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Manufacturer"
                value={deviceForm.manufacturer}
                onChange={(e) => setDeviceForm({ ...deviceForm, manufacturer: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Model"
                value={deviceForm.model}
                onChange={(e) => setDeviceForm({ ...deviceForm, model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Serial Number"
                value={deviceForm.serial_number}
                onChange={(e) => setDeviceForm({ ...deviceForm, serial_number: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location/Room"
                value={deviceForm.location_room}
                onChange={(e) => setDeviceForm({ ...deviceForm, location_room: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={deviceForm.status}
                  label="Status"
                  onChange={(e) => setDeviceForm({ ...deviceForm, status: e.target.value })}
                >
                  <MenuItem value="operational">Operational</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                  <MenuItem value="broken">Broken</MenuItem>
                  <MenuItem value="retired">Retired</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeviceDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateDevice} variant="contained">Register Device</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InstitutionDashboard;
