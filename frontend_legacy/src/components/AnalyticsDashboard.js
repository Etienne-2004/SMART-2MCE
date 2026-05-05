import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  CircularProgress,
  Fab,
  Zoom,
  Fade,
  useTheme
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Business,
  Engineering,
  Inventory,
  Assignment,
  Refresh,
  Download
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const AnalyticsDashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    overview: {},
    trends: [],
    distribution: [],
    performance: []
  });

  const generateMockData = () => {
    return {
      overview: {
        totalInstitutions: 5,
        totalTechnicians: 5,
        totalSuppliers: 5,
        totalTasks: 25,
        activeTasks: 15,
        completedTasks: 10,
        totalOrders: 20,
        pendingOrders: 8,
        completedOrders: 12
      },
      trends: [
        { month: 'Jan', tasks: 12, orders: 8, revenue: 2400000 },
        { month: 'Feb', tasks: 15, orders: 10, revenue: 2800000 },
        { month: 'Mar', tasks: 18, orders: 12, revenue: 3200000 },
        { month: 'Apr', tasks: 22, orders: 15, revenue: 3800000 },
        { month: 'May', tasks: 25, orders: 18, revenue: 4500000 },
        { month: 'Jun', tasks: 30, orders: 20, revenue: 5200000 }
      ],
      distribution: [
        { name: 'Institutions', value: 5, color: '#1976d2' },
        { name: 'Technicians', value: 5, color: '#388e3c' },
        { name: 'Suppliers', value: 5, color: '#f57c00' }
      ],
      performance: [
        { category: 'Preventive', completed: 8, pending: 2 },
        { category: 'Corrective', completed: 12, pending: 3 },
        { category: 'Emergency', completed: 5, pending: 1 },
        { category: 'Predictive', completed: 3, pending: 1 }
      ]
    };
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setData(generateMockData());
      setLoading(false);
    };

    loadData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setData(generateMockData());
    setRefreshing(false);
  };

  const StatCard = ({ title, value, subtitle, icon, trend, color }) => (
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
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', color: trend > 0 ? 'success.main' : 'error.main' }}>
              {trend > 0 ? <TrendingUp /> : <TrendingDown />}
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {Math.abs(trend)}%
              </Typography>
            </Box>
          )}
        </Box>
        <Typography variant="caption" color="text.secondary">
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            Analytics Dashboard
          </Typography>
          <Box>
            <Fab
              size="small"
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{ mr: 1 }}
            >
              <Refresh sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            </Fab>
            <Fab size="small" color="primary">
              <Download />
            </Fab>
          </Box>
        </Box>

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Institutions"
              value={data.overview.totalInstitutions}
              subtitle="Active healthcare facilities"
              icon={<Business />}
              trend={12}
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Technicians"
              value={data.overview.totalTechnicians}
              subtitle="Maintenance professionals"
              icon={<Engineering />}
              trend={8}
              color="#388e3c"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Suppliers"
              value={data.overview.totalSuppliers}
              subtitle="Equipment providers"
              icon={<Inventory />}
              trend={15}
              color="#f57c00"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Tasks"
              value={data.overview.activeTasks}
              subtitle={`${data.overview.completedTasks} completed`}
              icon={<Assignment />}
              trend={-5}
              color="#d32f2f"
            />
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3}>
          {/* Trends Chart */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: 400 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Monthly Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="tasks"
                      stackId="1"
                      stroke="#1976d2"
                      fill="#1976d2"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="orders"
                      stackId="1"
                      stroke="#388e3c"
                      fill="#388e3c"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Distribution Pie Chart */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: 400 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  User Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.distribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2 }}>
                  {data.distribution.map((item, index) => (
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
                      <Typography variant="body2">
                        {item.name}: {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Performance Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: 400 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Task Performance by Category
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#388e3c" />
                    <Bar dataKey="pending" fill="#f57c00" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Revenue Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: 400 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Revenue Trends (RWF)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#1976d2"
                      strokeWidth={3}
                      dot={{ fill: '#1976d2', r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default AnalyticsDashboard;
