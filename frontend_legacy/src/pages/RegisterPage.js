import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Link,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [cells, setCells] = useState([]);
  const [villages, setVillages] = useState([]);
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm();

  const watchedProvince = watch('province_id');
  const watchedDistrict = watch('district_id');
  const watchedSector = watch('sector_id');
  const watchedCell = watch('cell_id');
  const watchedRole = watch('role');

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (watchedProvince) {
      fetchDistricts(watchedProvince);
      setDistricts([]);
      setSectors([]);
      setCells([]);
      setVillages([]);
    }
  }, [watchedProvince]);

  useEffect(() => {
    if (watchedDistrict) {
      fetchSectors(watchedDistrict);
      setSectors([]);
      setCells([]);
      setVillages([]);
    }
  }, [watchedDistrict]);

  useEffect(() => {
    if (watchedSector) {
      fetchCells(watchedSector);
      setCells([]);
      setVillages([]);
    }
  }, [watchedSector]);

  useEffect(() => {
    if (watchedCell) {
      fetchVillages(watchedCell);
      setVillages([]);
    }
  }, [watchedCell]);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('/api/locations/provinces');
      setProvinces(response.data);
    } catch (err) {
      console.error('Error fetching provinces:', err);
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await axios.get(`/api/locations/districts/${provinceId}`);
      setDistricts(response.data);
    } catch (err) {
      console.error('Error fetching districts:', err);
    }
  };

  const fetchSectors = async (districtId) => {
    try {
      const response = await axios.get(`/api/locations/sectors/${districtId}`);
      setSectors(response.data);
    } catch (err) {
      console.error('Error fetching sectors:', err);
    }
  };

  const fetchCells = async (sectorId) => {
    try {
      const response = await axios.get(`/api/locations/cells/${sectorId}`);
      setCells(response.data);
    } catch (err) {
      console.error('Error fetching cells:', err);
    }
  };

  const fetchVillages = async (cellId) => {
    try {
      const response = await axios.get(`/api/locations/villages/${cellId}`);
      setVillages(response.data);
    } catch (err) {
      console.error('Error fetching villages:', err);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/auth/register', data);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success('Registration successful!');
      navigate('/dashboard');
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: 'background.default', py: 4 }}>
      <Container component="main" maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
              SMART-2MCE
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Create your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* User Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  {...register('first_name', { required: 'First name is required' })}
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  {...register('last_name', { required: 'Last name is required' })}
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  {...register('phone')}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: 'Please select your role' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.role}>
                      <InputLabel>Role *</InputLabel>
                      <Select {...field} label="Role *">
                        <MenuItem value="institution">Institution</MenuItem>
                        <MenuItem value="technician">Technician</MenuItem>
                        <MenuItem value="supplier">Supplier</MenuItem>
                      </Select>
                      {errors.role && (
                        <Typography variant="caption" color="error">
                          {errors.role.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Location Information */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Location Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Controller
                  name="province_id"
                  control={control}
                  rules={{ required: 'Province is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.province_id}>
                      <InputLabel>Province *</InputLabel>
                      <Select {...field} label="Province *">
                        {provinces.map((province) => (
                          <MenuItem key={province.id} value={province.id}>
                            {province.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.province_id && (
                        <Typography variant="caption" color="error">
                          {errors.province_id.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Controller
                  name="district_id"
                  control={control}
                  rules={{ required: 'District is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.district_id}>
                      <InputLabel>District *</InputLabel>
                      <Select {...field} label="District *" disabled={!watchedProvince}>
                        {districts.map((district) => (
                          <MenuItem key={district.id} value={district.id}>
                            {district.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.district_id && (
                        <Typography variant="caption" color="error">
                          {errors.district_id.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Controller
                  name="sector_id"
                  control={control}
                  rules={{ required: 'Sector is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.sector_id}>
                      <InputLabel>Sector *</InputLabel>
                      <Select {...field} label="Sector *" disabled={!watchedDistrict}>
                        {sectors.map((sector) => (
                          <MenuItem key={sector.id} value={sector.id}>
                            {sector.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.sector_id && (
                        <Typography variant="caption" color="error">
                          {errors.sector_id.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Controller
                  name="cell_id"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Cell</InputLabel>
                      <Select {...field} label="Cell" disabled={!watchedSector}>
                        {cells.map((cell) => (
                          <MenuItem key={cell.id} value={cell.id}>
                            {cell.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Controller
                  name="village_id"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Village</InputLabel>
                      <Select {...field} label="Village" disabled={!watchedCell}>
                        {villages.map((village) => (
                          <MenuItem key={village.id} value={village.id}>
                            {village.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Role-specific fields */}
              {watchedRole === 'institution' && (
                <>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Institution Information
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Institution Name"
                      {...register('institution_name', { required: 'Institution name is required' })}
                      error={!!errors.institution_name}
                      helperText={errors.institution_name?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="institution_type"
                      control={control}
                      rules={{ required: 'Institution type is required' }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.institution_type}>
                          <InputLabel>Institution Type *</InputLabel>
                          <Select {...field} label="Institution Type *">
                            <MenuItem value="public">Public</MenuItem>
                            <MenuItem value="private">Private</MenuItem>
                            <MenuItem value="ngo">NGO</MenuItem>
                          </Select>
                          {errors.institution_type && (
                            <Typography variant="caption" color="error">
                              {errors.institution_type.message}
                            </Typography>
                          )}
                        </FormControl>
                      )}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Registration Number"
                      {...register('registration_number')}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Address"
                      {...register('address')}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Description"
                      {...register('description')}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link 
                  href="#" 
                  variant="body2" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                >
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Box mt={4} pt={2} borderTop={1} borderColor="grey.200">
            <Typography variant="body2" color="text.secondary" textAlign="center">
              SMART-2MCE - Rwanda's Maintenance Ecosystem Platform
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
