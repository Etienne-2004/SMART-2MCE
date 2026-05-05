import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import CreateRequest from './pages/CreateRequest';
import TechnicianDashboard from './pages/TechnicianDashboard';
import DeviceRegistry from './pages/DeviceRegistry';
import Negotiation from './pages/Negotiation';
import SupplierDashboard from './pages/SupplierDashboard';
import Analytics from './pages/Analytics';
import MaterialsRegistry from './pages/MaterialsRegistry';
import Alerts from './pages/Alerts';
import Learning from './pages/Learning';
import Settings from './pages/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return <Layout setAuth={setIsAuthenticated}>{children}</Layout>;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        
        {/* Protected Routes (Wrapped in Layout) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tech-dashboard" element={<ProtectedRoute><TechnicianDashboard /></ProtectedRoute>} />
        <Route path="/supplier" element={<ProtectedRoute><SupplierDashboard /></ProtectedRoute>} />
        <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
        <Route path="/requests" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
        <Route path="/devices" element={<ProtectedRoute><DeviceRegistry /></ProtectedRoute>} />
        <Route path="/negotiation" element={<ProtectedRoute><Negotiation /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/materials" element={<ProtectedRoute><MaterialsRegistry /></ProtectedRoute>} />
        <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
        <Route path="/learning" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
