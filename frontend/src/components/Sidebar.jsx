import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Monitor, 
  Package, 
  ClipboardList, 
  ShoppingCart, 
  Bell, 
  BarChart3, 
  GraduationCap, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
    { icon: <Monitor size={20} />, label: 'Devices', path: '/devices' },
    { icon: <Package size={20} />, label: 'Materials', path: '/materials' },
    { icon: <ClipboardList size={20} />, label: 'Service Requests', path: '/requests' },
    { icon: <ShoppingCart size={20} />, label: 'Marketplace', path: '/marketplace' },
    { icon: <Bell size={20} />, label: 'Alerts (3)', path: '/alerts' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <GraduationCap size={20} />, label: 'Learning', path: '/learning' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="sidebar">
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 40, height: 40, background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://via.placeholder.com/32" alt="Logo" style={{ width: 32 }} />
        </div>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>SMART-2MCE</h2>
          <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>Maintenance Ecosystem</p>
        </div>
      </div>
      
      <nav>
        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path} 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Switch Dashboard:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <NavLink to="/dashboard" className="sidebar-link" style={{ fontSize: '0.75rem', padding: '0.4rem' }}>Institution</NavLink>
            <NavLink to="/tech-dashboard" className="sidebar-link" style={{ fontSize: '0.75rem', padding: '0.4rem' }}>Technician</NavLink>
            <NavLink to="/supplier" className="sidebar-link" style={{ fontSize: '0.75rem', padding: '0.4rem' }}>Supplier</NavLink>
          </div>
        </div>
        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Logged in as:</p>
          <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Etienne H.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
