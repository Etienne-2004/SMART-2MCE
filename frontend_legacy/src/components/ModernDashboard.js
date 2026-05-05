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
  IconButton,
  Tooltip,
  Badge,
  Fab,
  Zoom,
  Fade,
  Slide,
  useTheme,
  alpha,
  Stack,
  Divider
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
  Dashboard as DashboardIcon,
  Refresh,
  Download,
  Settings,
  Timeline,
  Assessment,
  People,
  ShoppingCart,
  Speed,
  Analytics,
  Add,
  Edit,
  Delete,
  Visibility,
  Phone,
  Email,
  LocationOn,
  Star,
  AccessTime,
  LocalShipping,
  Payment,
  Security,
  MedicalServices,
  Build,
  AttachMoney,
  DateRange,
  FilterList,
  Search,
  MoreVert
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ModernDashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    stats: {},
    charts: {},
    recent: {},
    alerts: []
  });

  // Generate modern mock data
  const generateModernData = () => {
    return {
      stats: {
        totalUsers: 19,
        activeUsers: 17,
        totalDevices: 10,
        activeDevices: 8,
        totalTasks: 10,
        pendingTasks: 3,
        completedTasks: 5,
        inProgressTasks: 2,
        totalOrders: 8,
        pendingOrders: 2,
        completedOrders: 5,
        processingOrders: 1,
        totalRevenue: 45678.90,
        avgResponseTime: 2.3,
        systemUptime: 99.8,
        customerSatisfaction: 4.6
      },
      charts: {
        performance: [
          { month: 'Jan', tasks: 12, orders: 8, revenue: 8500 },
          { month: 'Feb', tasks: 15, orders: 10, revenue: 10200 },
          { month: 'Mar', tasks: 18, orders: 12, revenue: 12800 },
          { month: 'Apr', tasks: 22, orders: 15, revenue: 15600 },
          { month: 'May', tasks: 25, orders: 18, revenue: 18900 },
          { month: 'Jun', tasks: 30, orders: 20, revenue: 22400 }
        ],
        distribution: [
          { name: 'Institutions', value: 6, color: '#1976d2' },
          { name: 'Technicians', value: 6, color: '#388e3c' },
          { name: 'Suppliers', value: 6, color: '#f57c00' },
          { name: 'Admins', value: 1, color: '#d32f2f' }
        ],
        deviceStatus: [
          { status: 'Active', count: 8, color: '#4caf50' },
          { status: 'Maintenance', count: 1, color: '#ff9800' },
          { status: 'Repair', count: 1, color: '#f44336' }
        ],
        taskPriority: [
          { priority: 'Critical', count: 1, color: '#d32f2f' },
          { priority: 'High', count: 2, color: '#ff5722' },
          { priority: 'Medium', count: 4, color: '#ff9800' },
          { priority: 'Low', count: 3, color: '#4caf50' }
        ],
        technicianPerformance: [
          { technician: 'Eric Nteziryayo', rating: 4.8, tasks: 12, response: 1.2 },
          { technician: 'Joseph Munyaneza', rating: 4.6, tasks: 10, response: 1.5 },
          { technician: 'Annie Uwase', rating: 4.9, tasks: 15, response: 1.0 },
          { technician: 'David Niyonzima', rating: 4.5, tasks: 8, response: 2.0 },
          { technician: 'Sarah Mukamana', rating: 4.7, tasks: 11, response: 1.3 }
        ]
      },
      recent: {
        tasks: [
          { id: 1, title: 'X-Ray Machine Calibration', priority: 'high', status: 'in-progress', technician: 'Eric Nteziryayo', dueDate: '2024-05-06' },
          { id: 2, title: 'Ventilator Filter Replacement', priority: 'critical', status: 'pending', technician: 'Unassigned', dueDate: '2024-05-04' },
          { id: 3, title: 'Lab Analyzer Maintenance', priority: 'medium', status: 'completed', technician: 'Annie Uwase', dueDate: '2024-05-05' },
          { id: 4, title: 'Ultrasound Probe Repair', priority: 'high', status: 'assigned', technician: 'Joseph Munyaneza', dueDate: '2024-05-07' },
          { id: 5, title: 'ECG Machine Battery Replacement', priority: 'medium', status: 'pending', technician: 'Unassigned', dueDate: '2024-05-08' }
        ],
        orders: [
          { id: 1, orderNumber: 'ORD-2024-0001', supplier: 'MedEquip Rwanda', status: 'delivered', amount: 2500.00 },
          { id: 2, orderNumber: 'ORD-2024-0002', supplier: 'BioMed Solutions', status: 'processing', amount: 1800.00 },
          { id: 3, orderNumber: 'ORD-2024-0003', supplier: 'PharmaPlus Rwanda', status: 'shipped', amount: 950.00 },
          { id: 4, orderNumber: 'ORD-2024-0004', supplier: 'TechSupply Africa', status: 'pending', amount: 3200.00 },
          { id: 5, orderNumber: 'ORD-2024-0005', supplier: 'Healthcare Systems Ltd', status: 'delivered', amount: 1500.00 }
        ]
      },
      alerts: [
        { type: 'warning', message: 'Critical task requires immediate attention', time: '5 min ago' },
        { type: 'info', message: 'New order received from Kigali Central Hospital', time: '15 min ago' },
        { type: 'success', message: 'Task completed successfully by Eric Nteziryayo', time: '1 hour ago' },
        { type: 'error', message: 'Device maintenance overdue for X-Ray Machine', time: '2 hours ago' }
      ]
    };
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setData(generateModernData());
      setLoading(false);
    };

    loadData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setData(generateModernData());
    setRefreshing(false);
  };

  const ModernStatCard = ({ title, value, subtitle, icon, color, trend, progress, chip }) => (
    <Card
      sx={{
        height: '100%',
        background: theme.isDark 
          ? `linear-gradient(135deg, ${alpha(color, 0.1)}, ${alpha(color, 0.05)})`
          : `linear-gradient(135deg, #ffffff, ${alpha(color, 0.05)})`,
        border: `1px solid ${alpha(color, 0.2)}`,
        borderRadius: 3,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: theme.isDark 
            ? `0 20px 40px ${alpha(color, 0.3)}`
            : `0 20px 40px ${alpha(color, 0.2)}`,
          '& .stat-icon': {
            transform: 'scale(1.1) rotate(5deg)',
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color}, ${alpha(color, 0.6)})`,
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box
            className="stat-icon"
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: alpha(color, 0.1),
              color: color,
              mr: 2,
              transition: 'all 0.3s ease',
            }}
          >
            {icon}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3" fontWeight="bold" color={color} sx={{ lineHeight: 1.2 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            {chip && (
              <Chip
                label={chip}
                size="small"
                color={color}
                variant="outlined"
                sx={{ fontSize: '0.7rem', height: 24 }}
              />
            )}
          </Box>
          {trend !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', color: trend > 0 ? 'success.main' : 'error.main' }}>
              {trend > 0 ? <TrendingUp sx={{ fontSize: 20 }} /> : <TrendingDown sx={{ fontSize: 20 }} />}
              <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 'bold' }}>
                {Math.abs(trend)}%
              </Typography>
            </Box>
          )}
        </Box>
        
        {progress !== undefined && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: alpha(color, 0.1),
                '& .MuiLinearProgress-bar': {
                  bgcolor: color,
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${color}, ${alpha(color, 0.8)})`,
                }
              }}
            />
          </Box>
        )}
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  const ModernAlertCard = ({ alert, index }) => {
    const getAlertColor = (type) => {
      switch (type) {
        case 'error': return '#f44336';
        case 'warning': return '#ff9800';
        case 'success': return '#4caf50';
        case 'info': return '#2196f3';
        default: return '#757575';
      }
    };

    const getAlertIcon = (type) => {
      switch (type) {
        case 'error': return <Warning />;
        case 'warning': return <Schedule />;
        case 'success': return <CheckCircle />;
        case 'info': return <Notifications />;
        default: return <Notifications />;
      }
    };

    return (
      <Slide direction="right" in={true} timeout={300 + index * 100}>
        <Card
          sx={{
            mb: 1,
            background: alpha(getAlertColor(alert.type), 0.05),
            border: `1px solid ${alpha(getAlertColor(alert.type), 0.2)}`,
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateX(8px)',
              boxShadow: `0 4px 20px ${alpha(getAlertColor(alert.type), 0.2)}`,
            }
          }}
        >
          <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ color: getAlertColor(alert.type), mr: 2 }}>
                {getAlertIcon(alert.type)}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  {alert.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {alert.time}
                </Typography>
              </Box>
              <IconButton size="small">
                <MoreVert fontSize="small" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Slide>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress size={80} thickness={2} />
      </Box>
    );
  }

  return (
    <Fade in={!loading}>
      <Box>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          background: theme.isDark 
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, transparent)`,
          p: 3,
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}>
          <Box>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Modern Analytics Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time insights and performance metrics for SMART-2MCE ecosystem
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Refresh Data">
              <Fab
                size="small"
                onClick={handleRefresh}
                disabled={refreshing}
                sx={{
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                  }
                }}
              >
                <Refresh sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
              </Fab>
            </Tooltip>
            <Tooltip title="Download Report">
              <Fab
                size="small"
                sx={{
                  background: 'linear-gradient(45deg, #388e3c, #66bb6a)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #2e7d32, #388e3c)',
                  }
                }}
              >
                <Download />
              </Fab>
            </Tooltip>
          </Box>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <ModernStatCard
              title="Total Users"
              value={data.stats.totalUsers}
              subtitle={`${data.stats.activeUsers} active users`}
              icon={<People />}
              color="#1976d2"
              trend={12}
              chip="All Roles"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ModernStatCard
              title="Active Devices"
              value={data.stats.activeDevices}
              subtitle={`${data.stats.totalDevices} total devices`}
              icon={<MedicalServices />}
              color="#388e3c"
              trend={8}
              progress={80}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ModernStatCard
              title="Pending Tasks"
              value={data.stats.pendingTasks}
              subtitle={`${data.stats.completedTasks} completed`}
              icon={<Assignment />}
              color="#f57c00"
              trend={-5}
              chip="High Priority"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ModernStatCard
              title="Total Revenue"
              value={`RWF ${data.stats.totalRevenue.toLocaleString()}`}
              subtitle="This month"
              icon={<AttachMoney />}
              color="#d32f2f"
              trend={18}
              progress={75}
            />
          </Grid>
        </Grid>

        {/* Charts Row 1 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ height: 400, borderRadius: 3 }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Performance Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.charts.performance}>
                    <defs>
                      <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#1976d2" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#388e3c" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#388e3c" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.1)} />
                    <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <RechartsTooltip 
                      contentStyle={{ 
                        borderRadius: 8, 
                        border: 'none', 
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
                      }} 
                    />
                    <Area
                      type="monotone"
                      dataKey="tasks"
                      stroke="#1976d2"
                      fillOpacity={1}
                      fill="url(#colorTasks)"
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="orders"
                      stroke="#388e3c"
                      fillOpacity={1}
                      fill="url(#colorOrders)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: 400, borderRadius: 3 }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  User Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data.charts.distribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.charts.distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2 }}>
                  {data.charts.distribution.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: item.color,
                          mr: 1
                        }}
                      />
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Row 2 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: 400, borderRadius: 3 }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Device Status Overview
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.charts.deviceStatus}>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.1)} />
                    <XAxis dataKey="status" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <RechartsTooltip />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {data.charts.deviceStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: 400, borderRadius: 3 }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Task Priority Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.charts.taskPriority} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.1)} />
                    <XAxis type="number" stroke={theme.palette.text.secondary} />
                    <YAxis dataKey="priority" type="category" stroke={theme.palette.text.secondary} />
                    <RechartsTooltip />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {data.charts.taskPriority.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activity and Alerts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Recent Tasks
                </Typography>
                <List>
                  {data.recent.tasks.map((task, index) => (
                    <ListItem key={task.id} divider sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Assignment color={task.status === 'completed' ? 'success' : task.priority === 'critical' ? 'error' : 'warning'} />
                      </ListItemIcon>
                      <ListItemText
                        primary={task.title}
                        secondary={
                          <Box>
                            <Chip
                              label={task.status}
                              size="small"
                              color={task.status === 'completed' ? 'success' : 'default'}
                              sx={{ mr: 1, fontSize: '0.7rem' }}
                            />
                            <Chip
                              label={task.priority}
                              size="small"
                              color={task.priority === 'critical' ? 'error' : task.priority === 'high' ? 'warning' : 'default'}
                              sx={{ fontSize: '0.7rem' }}
                            />
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                              {task.technician} • Due: {task.dueDate}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  System Alerts
                </Typography>
                <Box>
                  {data.alerts.map((alert, index) => (
                    <ModernAlertCard key={index} alert={alert} index={index} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Floating Action Button */}
        <Zoom in>
          <Fab
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                transform: 'scale(1.05)',
              }
            }}
          >
            <Add />
          </Fab>
        </Zoom>
      </Box>
    </Fade>
  );
};

export default ModernDashboard;
