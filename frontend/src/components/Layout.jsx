import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Monitor, Package, ClipboardList, ShoppingCart, 
  Bell, BarChart3, Settings, LogOut, BookOpen, AlertCircle, Phone, Mail, MapPin
} from 'lucide-react';
import Footer from './Footer';

const Layout = ({ children, setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    navigate('/');
  };

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Overview', path: '/dashboard' },
    { icon: <Monitor size={18} />, label: 'Devices', path: '/devices' },
    { icon: <Package size={18} />, label: 'Materials', path: '/materials' },
    { icon: <ClipboardList size={18} />, label: 'Service Requests', path: '/requests' },
    { icon: <ShoppingCart size={18} />, label: 'Marketplace', path: '/marketplace' },
    { icon: <AlertCircle size={18} />, label: 'Alerts', path: '/alerts' },
    { icon: <BarChart3 size={18} />, label: 'Analytics', path: '/analytics' },
    { icon: <BookOpen size={18} />, label: 'Learning', path: '/learning' },
    { icon: <Settings size={18} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="layout-wrapper" style={{ background: 'transparent' }}>
      {/* Official Header */}
      <header className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '240px' }}>
          <img src="/logo.png" alt="SMART-2MCE" style={{ height: '40px', width: '40px', borderRadius: '4px' }} />
          <div>
            <h1 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0, letterSpacing: '0.5px' }}>SMART-2MCE</h1>
            <p style={{ fontSize: '0.55rem', opacity: 0.7, margin: 0 }}>National Maintenance Ecosystem</p>
          </div>
        </div>

        <nav style={{ display: 'flex', marginLeft: '2rem', flex: 1 }}>
           {['Dashboard', 'Devices', 'Materials', 'Requests', 'Marketplace', 'Analytics', 'Learning'].map((item) => (
             <NavLink key={item} to={`/${item.toLowerCase() === 'dashboard' ? 'dashboard' : item.toLowerCase()}`} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
               {item}
             </NavLink>
           ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
           <Bell size={18} style={{ cursor: 'pointer', opacity: 0.8 }} />
           <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>ETIENNE H.</p>
              <p style={{ fontSize: '0.65rem', color: '#f9a825', margin: 0, fontWeight: 700 }}>MANAGER</p>
           </div>
           <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '50%', color: '#1a1c2c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem' }}>EH</div>
           <button 
             onClick={handleLogout}
             style={{ 
               background: 'rgba(255,255,255,0.15)', 
               border: '1px solid rgba(255,255,255,0.2)', 
               padding: '0.6rem', 
               borderRadius: '6px', 
               color: 'white', 
               cursor: 'pointer',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               transition: 'all 0.2s'
             }}
             title="Sign Out Portal"
             onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(211, 47, 47, 0.4)'}
             onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
           >
             <LogOut size={18} />
           </button>
        </div>

        <style>{`
          .nav-item {
            padding: 0 1.25rem;
            height: 60px;
            display: flex;
            align-items: center;
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: 600;
            transition: all 0.2s;
            text-transform: uppercase;
          }
          .nav-item:hover { color: white; }
          .nav-item.active {
            background: var(--primary-blue);
            color: white;
            box-shadow: inset 0 -3px 0 white;
          }
        `}</style>
      </header>

      {/* Official Sidebar */}
      <aside className="sidebar" style={{ height: 'calc(100vh - 60px)' }}>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
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

        <div style={{ marginTop: 'auto', padding: '1.5rem 1rem' }}>
           <button 
             onClick={handleLogout}
             className="sidebar-link"
             style={{ 
               width: '100%', 
               background: 'rgba(211, 47, 47, 0.15)', 
               color: '#f87171', 
               border: '1px solid rgba(211, 47, 47, 0.3)', 
               borderRadius: '6px', 
               cursor: 'pointer',
               justifyContent: 'flex-start',
               fontWeight: 800
             }}
           >
             <LogOut size={18} />
             <span>Sign Out Portal</span>
           </button>
        </div>

        <style>{`
          .sidebar-link {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.85rem 1.5rem;
            color: rgba(255,255,255,0.6);
            text-decoration: none;
            font-size: 0.85rem;
            transition: all 0.2s;
            border-left: 4px solid transparent;
          }
          .sidebar-link:hover {
            background: rgba(255,255,255,0.05);
            color: white;
          }
          .sidebar-link.active {
            background: rgba(30, 104, 179, 0.15);
            color: white;
            border-left: 4px solid var(--primary-blue);
          }
        `}</style>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <main style={{ minHeight: 'calc(100vh - 160px)' }}>
          {children}
        </main>

        <div style={{ marginTop: '6rem', marginLeft: '-2.5rem', marginRight: '-2.5rem' }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
