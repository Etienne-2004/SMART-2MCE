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
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import {
  Assignment,
  Build,
  TrendingUp,
  Schedule,
  CheckCircle,
  Visibility,
  Apply,
  Business,
  LocationOn,
  AttachMoney
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const TechnicianDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openApplicationDialog, setOpenApplicationDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [applicationForm, setApplicationForm] = useState({
    proposed_budget: '',
    proposed_completion_time: '',
    cover_letter: ''
  });

  useEffect(() => {
    fetchAvailableTasks();
    fetchMyTasks();
    fetchApplications();
  }, []);

  const fetchAvailableTasks = async () => {
    try {
      const response = await axios.get('/api/maintenance/marketplace');
      setAvailableTasks(response.data);
    } catch (err) {
      console.error('Error fetching available tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyTasks = async () => {
    try {
      const response = await axios.get('/api/maintenance/my-tasks');
      setMyTasks(response.data);
    } catch (err) {
      console.error('Error fetching my tasks:', err);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/maintenance/applications');
      setApplications(response.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const handleApplyForTask = (task) => {
    setSelectedTask(task);
    setOpenApplicationDialog(true);
  };

  const handleSubmitApplication = async () => {
    try {
      await axios.post(`/api/maintenance/tasks/${selectedTask.id}/apply`, applicationForm);
      toast.success('Application submitted successfully!');
      setOpenApplicationDialog(false);
      setApplicationForm({
        proposed_budget: '',
        proposed_completion_time: '',
        cover_letter: ''
      });
      fetchApplications();
      fetchAvailableTasks();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to submit application';
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

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      case 'withdrawn': return 'default';
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
        Technician Dashboard
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Available Tasks" icon={<Assignment />} />
          <Tab label="My Tasks" icon={<Build />} />
          <Tab label="Applications" icon={<Business />} />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Available Tasks in Marketplace
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Task Title</TableCell>
                      <TableCell>Institution</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Urgency</TableCell>
                      <TableCell>Budget</TableCell>
                      <TableCell>Deadline</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {availableTasks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Typography color="text.secondary">
                            No available tasks at the moment.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      availableTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>{task.institution_name}</TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              <LocationOn fontSize="small" />
                              {task.province_name}, {task.district_name}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={task.urgency}
                              color={getUrgencyColor(task.urgency)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {task.budget ? `RWF ${task.budget.toLocaleString()}` : 'N/A'}
                          </TableCell>
                          <TableCell>
                            {task.application_deadline 
                              ? new Date(task.application_deadline).toLocaleDateString()
                              : 'N/A'
                            }
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<Apply />}
                              onClick={() => handleApplyForTask(task)}
                            >
                              Apply
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                My Assigned Tasks
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Task Title</TableCell>
                      <TableCell>Institution</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Assigned Date</TableCell>
                      <TableCell>Deadline</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myTasks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography color="text.secondary">
                            You haven't been assigned any tasks yet.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      myTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>{task.institution_name}</TableCell>
                          <TableCell>
                            <Chip
                              label={task.status}
                              color={getStatusColor(task.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {new Date(task.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {task.expected_completion_time
                              ? new Date(task.expected_completion_time).toLocaleDateString()
                              : 'N/A'
                            }
                          </TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <Visibility />
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
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                My Applications
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Task Title</TableCell>
                      <TableCell>Institution</TableCell>
                      <TableCell>Proposed Budget</TableCell>
                      <TableCell>Application Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography color="text.secondary">
                            You haven't submitted any applications yet.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      applications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>{application.task_title}</TableCell>
                          <TableCell>{application.institution_name}</TableCell>
                          <TableCell>
                            {application.proposed_budget 
                              ? `RWF ${application.proposed_budget.toLocaleString()}`
                              : 'N/A'
                            }
                          </TableCell>
                          <TableCell>
                            {new Date(application.applied_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={application.status}
                              color={getApplicationStatusColor(application.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <Visibility />
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
        </Grid>
      )}

      {/* Application Dialog */}
      <Dialog open={openApplicationDialog} onClose={() => setOpenApplicationDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Apply for Task: {selectedTask?.title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Proposed Budget (RWF)"
                value={applicationForm.proposed_budget}
                onChange={(e) => setApplicationForm({ ...applicationForm, proposed_budget: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Proposed Completion Time"
                InputLabelProps={{ shrink: true }}
                value={applicationForm.proposed_completion_time}
                onChange={(e) => setApplicationForm({ ...applicationForm, proposed_completion_time: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Cover Letter"
                placeholder="Explain why you're the right technician for this job..."
                value={applicationForm.cover_letter}
                onChange={(e) => setApplicationForm({ ...applicationForm, cover_letter: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApplicationDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitApplication} variant="contained">Submit Application</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TechnicianDashboard;
