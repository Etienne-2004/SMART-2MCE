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
  Inventory,
  Assignment,
  TrendingUp,
  CheckCircle,
  Visibility,
  Add,
  LocalShipping,
  AttachMoney,
  Schedule
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const SupplierDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openProductDialog, setOpenProductDialog] = useState(false);

  const [productForm, setProductForm] = useState({
    product_name: '',
    product_type: '',
    description: '',
    unit_price: '',
    quantity_in_stock: '',
    unit: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/suppliers/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/suppliers/orders');
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleCreateProduct = async () => {
    try {
      await axios.post('/api/suppliers/products', productForm);
      toast.success('Product added successfully!');
      setOpenProductDialog(false);
      setProductForm({
        product_name: '',
        product_type: '',
        description: '',
        unit_price: '',
        quantity_in_stock: '',
        unit: ''
      });
      fetchProducts();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add product';
      toast.error(errorMessage);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`/api/suppliers/orders/${orderId}`, { status: newStatus });
      toast.success('Order status updated successfully!');
      fetchOrders();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update order status';
      toast.error(errorMessage);
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'accepted': return 'info';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      case 'cancelled': return 'default';
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
        Supplier Dashboard
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
                    Total Products
                  </Typography>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    {products.length}
                  </Typography>
                </Box>
                <Inventory sx={{ fontSize: 40, color: 'rgba(255,255,255,0.7)' }} />
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
                    Active Orders
                  </Typography>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    {orders.filter(o => o.status === 'accepted' || o.status === 'pending').length}
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
                    Completed Orders
                  </Typography>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    {orders.filter(o => o.status === 'delivered').length}
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
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    RWF {orders
                      .filter(o => o.status === 'delivered')
                      .reduce((sum, o) => sum + (o.total_price || 0), 0)
                      .toLocaleString()}
                  </Typography>
                </Box>
                <AttachMoney sx={{ fontSize: 40, color: 'rgba(255,255,255,0.7)' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Products" icon={<Inventory />} />
          <Tab label="Orders" icon={<Assignment />} />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  My Products
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setOpenProductDialog(true)}
                >
                  Add Product
                </Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Unit Price</TableCell>
                      <TableCell>Stock Quantity</TableCell>
                      <TableCell>Unit</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Typography color="text.secondary">
                            No products added yet. Add your first product to get started.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.product_name}</TableCell>
                          <TableCell>{product.product_type}</TableCell>
                          <TableCell>
                            {product.unit_price ? `RWF ${product.unit_price.toLocaleString()}` : 'N/A'}
                          </TableCell>
                          <TableCell>{product.quantity_in_stock || 0}</TableCell>
                          <TableCell>{product.unit || 'N/A'}</TableCell>
                          <TableCell>
                            <Chip
                              label={product.quantity_in_stock > 0 ? 'In Stock' : 'Out of Stock'}
                              color={product.quantity_in_stock > 0 ? 'success' : 'error'}
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

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Orders
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Institution</TableCell>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Order Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          <Typography color="text.secondary">
                            No orders received yet.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>#{order.id}</TableCell>
                          <TableCell>{order.institution_name}</TableCell>
                          <TableCell>{order.item_name}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>
                            {order.total_price ? `RWF ${order.total_price.toLocaleString()}` : 'N/A'}
                          </TableCell>
                          <TableCell>
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={order.status}
                              color={getOrderStatusColor(order.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Box display="flex" gap={1}>
                              {order.status === 'pending' && (
                                <>
                                  <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    onClick={() => handleUpdateOrderStatus(order.id, 'accepted')}
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleUpdateOrderStatus(order.id, 'rejected')}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                              {order.status === 'accepted' && (
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                                >
                                  Mark Delivered
                                </Button>
                              )}
                              <IconButton size="small">
                                <Visibility />
                              </IconButton>
                            </Box>
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

      {/* Add Product Dialog */}
      <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Name"
                value={productForm.product_name}
                onChange={(e) => setProductForm({ ...productForm, product_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Type"
                value={productForm.product_type}
                onChange={(e) => setProductForm({ ...productForm, product_type: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Unit Price (RWF)"
                value={productForm.unit_price}
                onChange={(e) => setProductForm({ ...productForm, unit_price: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Quantity in Stock"
                value={productForm.quantity_in_stock}
                onChange={(e) => setProductForm({ ...productForm, quantity_in_stock: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Unit (e.g., pieces, kg, liters)"
                value={productForm.unit}
                onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProductDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateProduct} variant="contained">Add Product</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupplierDashboard;
