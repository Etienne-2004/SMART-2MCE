import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Business,
  Engineering,
  Inventory,
  CheckCircle,
  Speed,
  Security,
  Support,
  TrendingUp,
  ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Business fontSize="large" />,
      title: 'Institutions',
      description: 'Public, Private, and NGOs can register devices, create maintenance tasks, and manage their operations efficiently.',
      color: '#1976d2'
    },
    {
      icon: <Engineering fontSize="large" />,
      title: 'Technicians',
      description: 'Internal staff and external graduates can browse tasks, apply for jobs, and track their maintenance work.',
      color: '#388e3c'
    },
    {
      icon: <Inventory fontSize="large" />,
      title: 'Suppliers',
      description: 'Spare parts and equipment providers can receive requests, respond to institutions, and track orders.',
      color: '#f57c00'
    }
  ];

  const benefits = [
    'Real-time communication between all stakeholders',
    'Location-based task assignment and filtering',
    'Comprehensive reporting and analytics',
    'Secure and scalable platform architecture',
    'Professional workflow management',
    'National ecosystem coverage'
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box className="hero-gradient" sx={{ py: { xs: 8, md: 12 }, color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Logo size="large" variant="white" />
              </Box>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                SMART-2MCE
              </Typography>
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Smart Multi-Maintenance and Multi-Connect Ecosystem
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Rwanda's national digital platform connecting institutions, technicians, and suppliers 
                for efficient maintenance management and collaboration.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' }
                  }}
                  endIcon={<ArrowForward />}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    borderColor: 'white', 
                    color: 'white',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Sign In
                </Button>
              </Stack>
              
              {/* User Type Selection */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
                  Join as:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        textAlign: 'center',
                        p: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          background: 'rgba(255,255,255,0.2)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }
                      }}
                      onClick={() => navigate('/register?role=institution')}
                    >
                      <Business sx={{ fontSize: 40, mb: 1, color: 'white' }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                        Institution
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Hospitals, Clinics & Healthcare Facilities
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        textAlign: 'center',
                        p: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          background: 'rgba(255,255,255,0.2)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }
                      }}
                      onClick={() => navigate('/register?role=technician')}
                    >
                      <Engineering sx={{ fontSize: 40, mb: 1, color: 'white' }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                        Technician
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Maintenance Professionals & Engineers
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        textAlign: 'center',
                        p: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          background: 'rgba(255,255,255,0.2)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }
                      }}
                      onClick={() => navigate('/register?role=supplier')}
                    >
                      <Inventory sx={{ fontSize: 40, mb: 1, color: 'white' }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                        Supplier
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Equipment & Parts Providers
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/api/placeholder/600/400"
                alt="SMART-2MCE Platform"
                sx={{
                  width: '100%',
                  maxWidth: 600,
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 4
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Three interconnected ecosystems working together seamlessly
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  className="feature-card"
                  sx={{ 
                    height: '100%', 
                    textAlign: 'center',
                    p: 3,
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: feature.color,
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                Why Choose SMART-2MCE?
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                Our platform is designed to revolutionize maintenance management across Rwanda, 
                providing a comprehensive solution for all stakeholders.
              </Typography>
              
              <Stack spacing={2} sx={{ mt: 3 }}>
                {benefits.map((benefit, index) => (
                  <Box key={index} display="flex" alignItems="center">
                    <CheckCircle sx={{ color: 'success.main', mr: 2 }} />
                    <Typography variant="body1">{benefit}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: 3
                }}
              >
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  Ready to Get Started?
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                  Join Rwanda's leading maintenance ecosystem platform today and experience 
                  the future of facility management.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' }
                  }}
                  endIcon={<ArrowForward />}
                >
                  Register Now
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'grey.900', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={6} md={3}>
              <Typography variant="h3" component="div" fontWeight="bold" gutterBottom>
                500+
              </Typography>
              <Typography variant="body1" color="grey.300">
                Institutions
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" component="div" fontWeight="bold" gutterBottom>
                2,000+
              </Typography>
              <Typography variant="body1" color="grey.300">
                Technicians
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" component="div" fontWeight="bold" gutterBottom>
                300+
              </Typography>
              <Typography variant="body1" color="grey.300">
                Suppliers
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" component="div" fontWeight="bold" gutterBottom>
                10,000+
              </Typography>
              <Typography variant="body1" color="grey.300">
                Tasks Completed
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;
