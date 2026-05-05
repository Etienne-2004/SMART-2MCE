import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Divider,
  Fade,
  Zoom
} from '@mui/material';
import {
  Email,
  Person,
  Phone,
  Business,
  Engineering,
  Inventory,
  Visibility,
  VisibilityOff,
  ArrowBack,
  ArrowForward,
  CheckCircle,
  MarkEmailRead,
  Refresh
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Logo from '../components/Logo';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Handle role parameter from URL
  useEffect(() => {
    const roleFromUrl = searchParams.get('role');
    if (roleFromUrl && ['institution', 'technician', 'supplier'].includes(roleFromUrl)) {
      setFormData(prev => ({
        ...prev,
        role: roleFromUrl
      }));
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: '',
    password: 'Password@2026',
    otp: ''
  });

  const [errors, setErrors] = useState({});

  const steps = ['Account Information', 'Email Verification', 'Complete'];

  const roles = [
    { value: 'institution', label: 'Healthcare Institution', icon: <Business />, description: 'Hospitals, clinics, and healthcare facilities' },
    { value: 'technician', label: 'Maintenance Technician', icon: <Engineering />, description: 'Internal and external maintenance professionals' },
    { value: 'supplier', label: 'Equipment Supplier', icon: <Inventory />, description: 'Medical equipment and spare parts providers' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.first_name) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!formData.last_name) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^07[8,9,2,3]\d{7}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Rwandan phone number';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOTP = async () => {
    if (!validateStep1()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/send-otp`, {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        role: formData.role
      });

      setOtpSent(true);
      setActiveStep(1);
      toast.success('OTP sent to your email address!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!formData.otp) {
      setErrors({ otp: 'OTP is required' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify-otp`, {
        email: formData.email,
        otp: formData.otp
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setOtpVerified(true);
      setActiveStep(2);
      toast.success('Registration successful!');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setResendLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/resend-otp`, {
        email: formData.email
      });
      toast.success('New OTP sent to your email!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const renderStep1 = () => (
    <Zoom in={activeStep === 0}>
      <Box>
        <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center">
          Create Your Account
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
          Join SMART-2MCE - Rwanda's Premier Maintenance Ecosystem
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              error={!!errors.first_name}
              helperText={errors.first_name}
              InputProps={{
                startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              error={!!errors.last_name}
              helperText={errors.last_name}
              InputProps={{
                startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          error={!!errors.phone}
          helperText={errors.phone || "Format: 0781234567"}
          InputProps={{
            startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
          }}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth error={!!errors.role} sx={{ mb: 3 }}>
          <InputLabel>Select Your Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            label="Select Your Role"
          >
            {roles.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                  <Box sx={{ mr: 2, color: 'primary.main' }}>
                    {role.icon}
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {role.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {role.description}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Select>
          {errors.role && (
            <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
              {errors.role}
            </Typography>
          )}
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={sendOTP}
          disabled={loading}
          sx={{ 
            py: 1.5,
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Verification Code'}
        </Button>
      </Box>
    </Zoom>
  );

  const renderStep2 = () => (
    <Fade in={activeStep === 1}>
      <Box textAlign="center">
        <Box sx={{ mb: 3 }}>
          <MarkEmailRead sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Verify Your Email
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We've sent a 6-digit verification code to<br />
            <strong>{formData.email}</strong>
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Enter OTP"
          name="otp"
          value={formData.otp}
          onChange={handleInputChange}
          error={!!errors.otp}
          helperText={errors.otp}
          inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' } }}
          sx={{ mb: 3 }}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setActiveStep(0)}
              startIcon={<ArrowBack />}
              sx={{ py: 1.5 }}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={verifyOTP}
              disabled={loading}
              sx={{ 
                py: 1.5,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                fontWeight: 'bold'
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify & Continue'}
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Didn't receive the code?
          </Typography>
          <Button
            variant="text"
            onClick={resendOTP}
            disabled={resendLoading}
            startIcon={resendLoading ? <CircularProgress size={16} /> : <Refresh />}
          >
            Resend OTP
          </Button>
        </Box>
      </Box>
    </Fade>
  );

  const renderStep3 = () => (
    <Fade in={activeStep === 2}>
      <Box textAlign="center">
        <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom fontWeight="bold" color="success.main">
          Registration Successful!
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Your account has been created and verified.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Redirecting to your dashboard...
        </Typography>
        <CircularProgress sx={{ mt: 2 }} />
      </Box>
    </Fade>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.isDark 
          ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 3,
            background: theme.isDark ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Logo */}
          <Box textAlign="center" mb={3}>
            <Logo size="large" />
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Form Content */}
          <Box sx={{ minHeight: 400 }}>
            {activeStep === 0 && renderStep1()}
            {activeStep === 1 && renderStep2()}
            {activeStep === 2 && renderStep3()}
          </Box>

          {/* Login Link */}
          {activeStep < 2 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Button
                    variant="text"
                    onClick={() => navigate('/login')}
                    sx={{ fontWeight: 'bold' }}
                  >
                    Sign In
                  </Button>
                </Typography>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
