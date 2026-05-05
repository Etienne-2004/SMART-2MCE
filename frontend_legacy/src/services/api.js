import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Location API
export const locationAPI = {
  getProvinces: () => api.get('/locations/provinces'),
  getDistricts: (provinceId) => api.get(`/locations/districts/${provinceId}`),
  getSectors: (districtId) => api.get(`/locations/sectors/${districtId}`),
  getCells: (sectorId) => api.get(`/locations/cells/${sectorId}`),
  getVillages: (cellId) => api.get(`/locations/villages/${cellId}`),
};

// Institution API
export const institutionAPI = {
  getDashboard: () => api.get('/institutions/dashboard'),
  getProfile: () => api.get('/institutions/profile'),
  updateProfile: (data) => api.put('/institutions/profile', data),
  getDevices: (params = {}) => api.get('/institutions/devices', { params }),
  createDevice: (deviceData) => api.post('/institutions/devices', deviceData),
  updateDevice: (id, deviceData) => api.put(`/institutions/devices/${id}`, deviceData),
  deleteDevice: (id) => api.delete(`/institutions/devices/${id}`),
  getMaterials: (params = {}) => api.get('/institutions/materials', { params }),
  createMaterial: (materialData) => api.post('/institutions/materials', materialData),
  updateMaterial: (id, materialData) => api.put(`/institutions/materials/${id}`, materialData),
  deleteMaterial: (id) => api.delete(`/institutions/materials/${id}`),
};

// Technician API
export const technicianAPI = {
  getDashboard: () => api.get('/technicians/dashboard'),
  getProfile: () => api.get('/technicians/profile'),
  updateProfile: (data) => api.put('/technicians/profile', data),
  getAvailableTasks: (params = {}) => api.get('/technicians/marketplace', { params }),
  getMyTasks: (params = {}) => api.get('/technicians/tasks', { params }),
  applyForTask: (taskId, applicationData) => api.post(`/technicians/tasks/${taskId}/apply`, applicationData),
  getApplications: (params = {}) => api.get('/technicians/applications', { params }),
  updateTaskStatus: (taskId, status) => api.patch(`/technicians/tasks/${taskId}`, { status }),
};

// Supplier API
export const supplierAPI = {
  getDashboard: () => api.get('/suppliers/dashboard'),
  getProfile: () => api.get('/suppliers/profile'),
  updateProfile: (data) => api.put('/suppliers/profile', data),
  getProducts: (params = {}) => api.get('/suppliers/products', { params }),
  createProduct: (productData) => api.post('/suppliers/products', productData),
  updateProduct: (id, productData) => api.put(`/suppliers/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/suppliers/products/${id}`),
  getOrders: (params = {}) => api.get('/suppliers/orders', { params }),
  updateOrderStatus: (orderId, status) => api.patch(`/suppliers/orders/${orderId}`, { status }),
};

// Maintenance API
export const maintenanceAPI = {
  getTasks: (params = {}) => api.get('/maintenance/tasks', { params }),
  createTask: (taskData) => api.post('/maintenance/tasks', taskData),
  getTask: (id) => api.get(`/maintenance/tasks/${id}`),
  updateTask: (id, taskData) => api.put(`/maintenance/tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/maintenance/tasks/${id}`),
  assignTechnician: (taskId, technicianId) => api.post(`/maintenance/tasks/${taskId}/assign`, { technicianId }),
  getMarketplaceTasks: (params = {}) => api.get('/maintenance/marketplace', { params }),
  getApplications: (taskId) => api.get(`/maintenance/tasks/${taskId}/applications`),
  updateApplicationStatus: (applicationId, status) => api.patch(`/maintenance/applications/${applicationId}`, { status }),
};

// Messages API
export const messagesAPI = {
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (conversationId, params = {}) => api.get(`/messages/conversations/${conversationId}`, { params }),
  sendMessage: (messageData) => api.post('/messages', messageData),
  markAsRead: (messageId) => api.patch(`/messages/${messageId}`, { is_read: true }),
  getUnreadCount: () => api.get('/messages/unread-count'),
};

// Reports API
export const reportsAPI = {
  getInstitutionReports: (params = {}) => api.get('/reports/institution', { params }),
  getTechnicianReports: (params = {}) => api.get('/reports/technician', { params }),
  getSupplierReports: (params = {}) => api.get('/reports/supplier', { params }),
  exportReport: (type, params = {}) => api.get(`/reports/export/${type}`, { 
    params, 
    responseType: 'blob' 
  }),
};

// File Upload API
export const fileAPI = {
  uploadFile: (file, type = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  downloadFile: (fileId) => api.get(`/files/${fileId}`, { responseType: 'blob' }),
};

export default api;
