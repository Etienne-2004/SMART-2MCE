import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Fade,
  useTheme
} from '@mui/material';
import {
  Business,
  Engineering,
  Inventory,
  Assignment,
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule,
  Message,
  Notifications,
  BarChart,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import axios from 'axios';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`dashboard-tabpanel-${index}`}
    aria-labelledby={`dashboard-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    recentTasks: [],
    notifications: [],
    quickActions: []
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setDashboardData({
          stats: {
            totalDevices: 15,
            activeTasks: 15,
            pendingOrders: 8,
            unreadMessages: 4,
            completionRate: 75,
            avgResponseTime: 2.5
          },
          recentTasks: [
            { id: 1, title: 'X-Ray Machine Service', status: 'in-progress', priority: 'high', dueDate: '2024-05-06' },
            { id: 2, title: 'Ventilator Filter Replacement', status: 'pending', priority: 'medium', dueDate: '2024-05-07' },
            { id: 3, title: 'Laboratory Analyzer Calibration', status: 'completed', priority: 'low', dueDate: '2024-05-05' },
            { id: 4, title: 'Emergency Power System Check', status: 'pending', priority: 'critical', dueDate: '2024-05-04' },
            { id: 5, title: 'PCR Machine Maintenance', status: 'assigned', priority: 'high', dueDate: '2024-05-08' }
          ],
          notifications: [
            { id: 1, title: 'New task assigned', message: 'Ventilator maintenance task assigned to you', time: '2 hours ago', type: 'info' },
            { id: 2, title: 'Order delivered', message: 'X-Ray tube has been delivered', time: '4 hours ago', type: 'success' },
            { id: 3, title: 'Urgent task', message: 'Emergency power system needs immediate attention', time: '6 hours ago', type: 'warning' },
            { id: 4, title: 'Task completed', message: 'Laboratory calibration completed successfully', time: '1 day ago', type: 'success' }
          ],
          quickActions: [
            { title: 'Create Task', icon: <Assignment />, color: '#1976d2', path: '/dashboard/tasks' },
            { title: 'Browse Marketplace', icon: <Business />, color: '#388e3c', path: '/dashboard/marketplace' },
            { title: 'View Devices', icon: <Engineering />, color: '#f57c00', path: '/dashboard/devices' },
            { title: 'Check Materials', icon: <Inventory />, color: '#d32f2f', path: '/dashboard/materials' }
          ]
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
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
      case 'in-progress': return 'warning';
      case 'assigned': return 'info';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color, progress }) => (
    <Card
      sx={{
        height: '100%',
        background: theme.isDark 
          ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(25, 118, 210, 0.05))'
          : 'linear-gradient(135deg, #ffffff, #f5f5f5)',
        border: `1px solid ${color}20`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.isDark 
            ? '0 8px 32px rgba(25, 118, 210, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: `${color}20`,
              color: color,
              mr: 2
            }}
          >
            {icon}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" fontWeight="bold" color={color}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
        {progress !== undefined && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: `${color}20`,
                '& .MuiLinearProgress-bar': {
                  bgcolor: color,
                  borderRadius: 3
                }
              }}
            />
          </Box>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Fade in={!loading}>
      <Box>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome back, {user?.first_name}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here's what's happening with your SMART-2MCE ecosystem today.
          </Typography>
        </Box>

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<DashboardIcon />} label="Overview" />
            <Tab icon={<BarChart />} label="Analytics" />
            <Tab icon={<Assignment />} label="Tasks" />
            <Tab icon={<Notifications />} label="Notifications" />
          </Tabs>
        </Paper>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={2}>
              <StatCard
                title="Total Devices"
                value={dashboardData.stats.totalDevices}
                subtitle="Across all institutions"
                icon={<Engineering />}
                color="#1976d2"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <StatCard
                title="Active Tasks"
                value={dashboardData.stats.activeTasks}
                subtitle="Currently in progress"
                icon={<Assignment />}
                color="#388e3c"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <StatCard
                title="Pending Orders"
                value={dashboardData.stats.pendingOrders}
                subtitle="Awaiting delivery"
                icon={<Inventory />}
                color="#f57c00"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <StatCard
                title="Unread Messages"
                value={dashboardData.stats.unreadMessages}
                subtitle="New communications"
                icon={<Message />}
                color="#d32f2f"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <StatCard
                title="Completion Rate"
                value={`${dashboardData.stats.completionRate}%`}
                subtitle="Tasks completed"
                icon={<CheckCircle />}
                color="#7b1fa2"
                progress={dashboardData.stats.completionRate}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <StatCard
                title="Avg Response Time"
                value={`${dashboardData.stats.avgResponseTime}h`}
                subtitle="Task assignment"
                icon={<Schedule />}
                color="#0288d1"
              />
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Actions
              </Typography>
            </Grid>
            {dashboardData.quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.isDark 
                        ? '0 8px 32px rgba(25, 118, 210, 0.3)'
                        : '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <Box sx={{ color: action.color, mb: 1 }}>
                    {React.cloneElement(action.icon, { sx: { fontSize: 40 } })}
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    {action.title}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Recent Tasks */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Recent Tasks
              </Typography>
              <Paper>
                <List>
                  {dashboardData.recentTasks.map((task) => (
                    <ListItem key={task.id} divider>
                      <ListItemIcon>
                        <Assignment color={getStatusColor(task.status)} />
                      </ListItemIcon>
                      <ListItemText
                        primary={task.title}
                        secondary={
                          <Box>
                            <Chip
                              label={task.status}
                              size="small"
                              color={getStatusColor(task.status)}
                              sx={{ mr: 1 }}
                            />
                            <Chip
                              label={task.priority}
                              size="small"
                              color={getPriorityColor(task.priority)}
                            />
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                              Due: {task.dueDate}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Recent Notifications
              </Typography>
              <Paper>
                <List>
                  {dashboardData.notifications.map((notification) => (
                    <ListItem key={notification.id} divider>
                      <ListItemIcon>
                        <Notifications color={notification.type} />
                      </ListItemIcon>
                      <ListItemText
                        primary={notification.title}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              {notification.message}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {notification.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Analytics Tab */}
        <TabPanel value={tabValue} index={1}>
          <AnalyticsDashboard />
        </TabPanel>

        {/* Tasks Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Task Management
          </Typography>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Navigate to the Tasks page for comprehensive task management.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => window.location.href = '/dashboard/tasks'}
            >
              Go to Tasks
            </Button>
          </Paper>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Notifications Center
          </Typography>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Navigate to Messages for real-time communications.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => window.location.href = '/dashboard/messages'}
            >
              Go to Messages
            </Button>
          </Paper>
        </TabPanel>
      </Box>
    </Fade>
  );
};

export default Dashboard;
