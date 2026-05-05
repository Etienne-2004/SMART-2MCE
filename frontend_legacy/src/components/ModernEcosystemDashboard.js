import React, { useState, useEffect, useCallback } from 'react';
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
  Divider,
  Skeleton,
  Alert,
  Snackbar,
  Backdrop,
  Modal,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  FormGroup,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip as MuiChip
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
  MoreVert,
  ExpandMore,
  Send,
  AttachFile,
  Mic,
  Videocam,
  Image,
  CloudUpload,
  CloudDownload,
  Sync,
  OfflineBolt,
  Wifi,
  BatteryFull,
  SignalCellularAlt,
  Lock,
  Public,
  Language,
  DarkMode,
  LightMode,
  NotificationsActive,
  NotificationsNone,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  FullscreenExit,
  ViewList,
  ViewModule,
  ViewQuilt,
  Apps,
  MenuOpen,
  Close,
  ArrowUpward,
  ArrowDownward,
  TrendingFlat,
  FilterAlt,
  Sort,
  Print,
  Share,
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  ThumbUp,
  ThumbDown,
  Comment,
  Reply,
  Forward,
  Flag,
  Report,
  Block,
  Person,
  Group,
  School,
  Work,
  Home,
  AccountCircle,
  ExitToApp,
  Help,
  Info,
  Error,
  Success,
  Warning as WarningIcon,
  Info as InfoIcon
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
  Radar,
  ScatterChart,
  Scatter,
  Treemap,
  FunnelChart,
  Funnel,
  Legend
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useTheme as useThemeContext } from '../context/ThemeContext';
import axios from 'axios';

const ModernEcosystemDashboard = () => {
  const theme = useTheme();
  const { isDark, toggleTheme } = useThemeContext();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedView, setSelectedView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [systemStatus, setSystemStatus] = useState({
    database: 'online',
    api: 'online',
    websocket: 'online',
    storage: 'online',
    email: 'online'
  });
  const [data, setData] = useState({
    stats: {},
    charts: {},
    recent: {},
    alerts: [],
    performance: {}
  });

  // Generate comprehensive modern data
  const generateComprehensiveData = useCallback(() => {
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
        customerSatisfaction: 4.6,
        apiCalls: 15420,
        dataTransferred: 2.4,
        activeConnections: 127,
        errorRate: 0.02,
        cacheHitRate: 94.5,
        avgLoadTime: 245
      },
      charts: {
        performance: [
          { month: 'Jan', tasks: 12, orders: 8, revenue: 8500, users: 45, devices: 8 },
          { month: 'Feb', tasks: 15, orders: 10, revenue: 10200, users: 52, devices: 9 },
          { month: 'Mar', tasks: 18, orders: 12, revenue: 12800, users: 61, devices: 10 },
          { month: 'Apr', tasks: 22, orders: 15, revenue: 15600, users: 73, devices: 10 },
          { month: 'May', tasks: 25, orders: 18, revenue: 18900, users: 89, devices: 10 },
          { month: 'Jun', tasks: 30, orders: 20, revenue: 22400, users: 105, devices: 11 }
        ],
        distribution: [
          { name: 'Institutions', value: 6, color: '#1976d2', growth: 12 },
          { name: 'Technicians', value: 6, color: '#388e3c', growth: 8 },
          { name: 'Suppliers', value: 6, color: '#f57c00', growth: 15 },
          { name: 'Admins', value: 1, color: '#d32f2f', growth: 0 }
        ],
        deviceStatus: [
          { status: 'Active', count: 8, color: '#4caf50', percentage: 80 },
          { status: 'Maintenance', count: 1, color: '#ff9800', percentage: 10 },
          { status: 'Repair', count: 1, color: '#f44336', percentage: 10 }
        ],
        taskPriority: [
          { priority: 'Critical', count: 1, color: '#d32f2f', percentage: 10 },
          { priority: 'High', count: 2, color: '#ff5722', percentage: 20 },
          { priority: 'Medium', count: 4, color: '#ff9800', percentage: 40 },
          { priority: 'Low', count: 3, color: '#4caf50', percentage: 30 }
        ],
        technicianPerformance: [
          { technician: 'Eric Nteziryayo', rating: 4.8, tasks: 12, response: 1.2, efficiency: 95 },
          { technician: 'Joseph Munyaneza', rating: 4.6, tasks: 10, response: 1.5, efficiency: 88 },
          { technician: 'Annie Uwase', rating: 4.9, tasks: 15, response: 1.0, efficiency: 98 },
          { technician: 'David Niyonzima', rating: 4.5, tasks: 8, response: 2.0, efficiency: 82 },
          { technician: 'Sarah Mukamana', rating: 4.7, tasks: 11, response: 1.3, efficiency: 91 }
        ],
        realTimeMetrics: [
          { time: '00:00', cpu: 45, memory: 62, network: 23, disk: 38 },
          { time: '04:00', cpu: 38, memory: 58, network: 18, disk: 35 },
          { time: '08:00', cpu: 72, memory: 78, network: 45, disk: 42 },
          { time: '12:00', cpu: 85, memory: 82, network: 68, disk: 48 },
          { time: '16:00', cpu: 78, memory: 75, network: 52, disk: 44 },
          { time: '20:00', cpu: 52, memory: 68, network: 35, disk: 40 }
        ],
        geographicDistribution: [
          { province: 'Kigali', institutions: 2, technicians: 3, suppliers: 4, color: '#1976d2' },
          { province: 'Northern', institutions: 1, technicians: 2, suppliers: 1, color: '#388e3c' },
          { province: 'Eastern', institutions: 2, technicians: 1, suppliers: 1, color: '#f57c00' },
          { province: 'Southern', institutions: 1, technicians: 0, suppliers: 0, color: '#d32f2f' },
          { province: 'Western', institutions: 0, technicians: 0, suppliers: 0, color: '#7b1fa2' }
        ]
      },
      recent: {
        tasks: [
          { id: 1, title: 'X-Ray Machine Calibration', priority: 'high', status: 'in-progress', technician: 'Eric Nteziryayo', dueDate: '2024-05-06', progress: 65 },
          { id: 2, title: 'Ventilator Filter Replacement', priority: 'critical', status: 'pending', technician: 'Unassigned', dueDate: '2024-05-04', progress: 0 },
          { id: 3, title: 'Lab Analyzer Maintenance', priority: 'medium', status: 'completed', technician: 'Annie Uwase', dueDate: '2024-05-05', progress: 100 },
          { id: 4, title: 'Ultrasound Probe Repair', priority: 'high', status: 'assigned', technician: 'Joseph Munyaneza', dueDate: '2024-05-07', progress: 25 },
          { id: 5, title: 'ECG Machine Battery Replacement', priority: 'medium', status: 'pending', technician: 'Unassigned', dueDate: '2024-05-08', progress: 0 }
        ],
        orders: [
          { id: 1, orderNumber: 'ORD-2024-0001', supplier: 'MedEquip Rwanda', status: 'delivered', amount: 2500.00, items: 5 },
          { id: 2, orderNumber: 'ORD-2024-0002', supplier: 'BioMed Solutions', status: 'processing', amount: 1800.00, items: 3 },
          { id: 3, orderNumber: 'ORD-2024-0003', supplier: 'PharmaPlus Rwanda', status: 'shipped', amount: 950.00, items: 8 },
          { id: 4, orderNumber: 'ORD-2024-0004', supplier: 'TechSupply Africa', status: 'pending', amount: 3200.00, items: 12 },
          { id: 5, orderNumber: 'ORD-2024-0005', supplier: 'Healthcare Systems Ltd', status: 'delivered', amount: 1500.00, items: 4 }
        ],
        activities: [
          { id: 1, user: 'Eric Nteziryayo', action: 'completed task', target: 'X-Ray Calibration', time: '2 min ago', icon: <CheckCircle />, color: 'success' },
          { id: 2, user: 'Kigali Central', action: 'created order', target: 'Medical Supplies', time: '5 min ago', icon: <ShoppingCart />, color: 'info' },
          { id: 3, user: 'Annie Uwase', action: 'updated profile', target: 'Certification', time: '15 min ago', icon: <Person />, color: 'warning' },
          { id: 4, user: 'System', action: 'backup completed', target: 'Database', time: '1 hour ago', icon: <CloudDownload />, color: 'success' },
          { id: 5, user: 'Admin', action: 'maintenance scheduled', target: 'System Update', time: '2 hours ago', icon: <Schedule />, color: 'info' }
        ]
      },
      alerts: [
        { type: 'error', message: 'Critical task requires immediate attention', time: '5 min ago', action: 'View Task' },
        { type: 'warning', message: 'Device maintenance overdue for X-Ray Machine', time: '15 min ago', action: 'Schedule' },
        { type: 'info', message: 'New order received from Kigali Central Hospital', time: '30 min ago', action: 'View Order' },
        { type: 'success', message: 'Task completed successfully by Eric Nteziryayo', time: '1 hour ago', action: 'View Report' },
        { type: 'warning', message: 'System backup scheduled for tonight', time: '2 hours ago', action: 'Configure' }
      ],
      performance: {
        apiResponseTime: 245,
        databaseQueryTime: 89,
        cacheHitRate: 94.5,
        errorRate: 0.02,
        throughput: 1250,
        concurrentUsers: 127,
        memoryUsage: 68,
        cpuUsage: 45,
        diskUsage: 38,
        networkLatency: 23
      }
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setData(generateComprehensiveData());
      
      // Generate notifications
      const newNotifications = [
        { id: 1, title: 'Task Assigned', message: 'New task assigned to you', type: 'task', read: false },
        { id: 2, title: 'Order Update', message: 'Your order has been shipped', type: 'order', read: false },
        { id: 3, title: 'System Maintenance', message: 'Scheduled maintenance tonight', type: 'system', read: true },
        { id: 4, title: 'New Message', message: 'You have a new message', type: 'message', read: false },
        { id: 5, title: 'Performance Alert', message: 'High CPU usage detected', type: 'alert', read: true }
      ];
      setNotifications(newNotifications);
      setUnreadCount(newNotifications.filter(n => !n.read).length);
      
      setLoading(false);
    };

    loadData();
  }, [generateComprehensiveData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setData(generateComprehensiveData());
    setRefreshing(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleNotificationClick = (notification) => {
    // Mark notification as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const ModernStatCard = ({ title, value, subtitle, icon, color, trend, progress, chip, badge, action }) => (
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
          {badge && (
            <Badge badgeContent={badge} color="error">
              <IconButton size="small">
                <Notifications />
              </IconButton>
            </Badge>
          )}
          {trend !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', color: trend > 0 ? 'success.main' : 'error.main' }}>
              {trend > 0 ? <TrendingUp sx={{ fontSize: 20 }} /> : trend < 0 ? <ArrowDownward sx={{ fontSize: 20 }} /> : <TrendingFlat sx={{ fontSize: 20 }} />}
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
        
        {action && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button size="small" variant="outlined" color={color}>
              View Details
            </Button>
            <Button size="small" variant="contained" color={color}>
              Take Action
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const SystemStatusCard = ({ service, status, icon, color }) => (
    <Card
      sx={{
        p: 2,
        background: theme.isDark ? alpha(color, 0.1) : alpha(color, 0.05),
        border: `1px solid ${alpha(color, 0.2)}`,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: `0 4px 20px ${alpha(color, 0.3)}`,
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ color: color }}>
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            {service}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {status}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: status === 'online' ? 'success.main' : 'error.main',
            animation: status === 'online' ? 'pulse 2s infinite' : 'none',
          }}
        />
      </Box>
    </Card>
  );

  const ActivityItem = ({ activity }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
      <Box sx={{ color: `${activity.color}.main`, mr: 2 }}>
        {activity.icon}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" fontWeight="medium">
          {activity.user} {activity.action} {activity.target}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {activity.time}
        </Typography>
      </Box>
    </Box>
  );

  const AlertCard = ({ alert, index }) => {
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
        case 'error': return <Error />;
        case 'warning': return <WarningIcon />;
        case 'success': return <Success />;
        case 'info': return <InfoIcon />;
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
              <Button size="small" variant="text" color={alert.type}>
                {alert.action}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Slide>
    );
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="rectangular" height={60} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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
              SMART-2MCE Ecosystem Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time insights and comprehensive management for Rwanda's premier maintenance ecosystem
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Tooltip title="Theme Toggle">
              <IconButton onClick={toggleTheme} color="inherit">
                {isDark ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={unreadCount} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
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

        {/* System Status Bar */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SignalCellularAlt sx={{ mr: 1, color: 'success.main' }} />
            <Typography variant="h6" fontWeight="bold">
              System Status
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Last updated: {new Date().toLocaleTimeString()}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2.4}>
              <SystemStatusCard service="Database" status="online" icon={<Storage />} color="#1976d2" />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <SystemStatusCard service="API Server" status="online" icon={<Api />} color="#388e3c" />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <SystemStatusCard service="WebSocket" status="online" icon={<Wifi />} color="#f57c00" />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <SystemStatusCard service="Storage" status="online" icon={<CloudUpload />} color="#d32f2f" />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <SystemStatusCard service="Email Service" status="online" icon={<Email />} color="#7b1fa2" />
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab icon={<DashboardIcon />} label="Overview" />
            <Tab icon={<Analytics />} label="Analytics" />
            <Tab icon={<Assignment />} label="Tasks" />
            <Tab icon={<ShoppingCart />} label="Orders" />
            <Tab icon={<People />} label="Users" />
            <Tab icon={<Message />} label="Communication" />
            <Tab icon={<Settings />} label="Settings" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Box>
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
                  badge={unreadCount}
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
                  action
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

            {/* Performance Metrics */}
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
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f57c00" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f57c00" stopOpacity={0.1}/>
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
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#f57c00"
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
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
                          <Typography variant="caption" color="success.main" sx={{ ml: 1 }}>
                            +{item.growth}%
                          </Typography>
                        </Box>
                      ))}
                    </Box>
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
                      Recent Activity
                    </Typography>
                    <Box>
                      {data.recent.activities.map((activity, index) => (
                        <ActivityItem key={activity.id} activity={activity} />
                      ))}
                    </Box>
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
                        <AlertCard key={index} alert={alert} index={index} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Analytics Tab */}
        {activeTab === 1 && (
          <Box>
            <Grid container spacing={3}>
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
                      Real-Time System Metrics
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data.charts.realTimeMetrics}>
                        <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.1)} />
                        <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                        <YAxis stroke={theme.palette.text.secondary} />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="cpu" stroke="#1976d2" strokeWidth={2} />
                        <Line type="monotone" dataKey="memory" stroke="#388e3c" strokeWidth={2} />
                        <Line type="monotone" dataKey="network" stroke="#f57c00" strokeWidth={2} />
                        <Line type="monotone" dataKey="disk" stroke="#d32f2f" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

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

export default ModernEcosystemDashboard;
