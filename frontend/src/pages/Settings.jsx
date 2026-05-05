import React from 'react';
import { User, Shield, Bell, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Account & System Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your institutional profile and security preferences</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
        <div className="premium-card" style={{ padding: '1rem', height: 'fit-content' }}>
           {[
             { icon: <User size={18} />, label: 'Profile Information', active: true },
             { icon: <Shield size={18} />, label: 'Security & Password', active: false },
             { icon: <Bell size={18} />, label: 'Notifications', active: false },
             { icon: <Globe size={18} />, label: 'Ecosystem Visibility', active: false }
           ].map((item, i) => (
             <div key={i} style={{ 
               padding: '1rem', 
               display: 'flex', 
               alignItems: 'center', 
               gap: '0.75rem', 
               borderRadius: '8px',
               background: item.active ? 'var(--primary-blue)' : 'transparent',
               color: item.active ? 'white' : 'var(--text-main)',
               fontWeight: 600,
               cursor: 'pointer',
               marginBottom: '0.25rem'
             }}>
               {item.icon} {item.label}
             </div>
           ))}
        </div>

        <div className="premium-card" style={{ padding: '2.5rem' }}>
           <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>Profile Information</h3>
           <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ORGANIZATION NAME</label>
                    <input type="text" defaultValue="University of Rwanda" style={{ width: '100%' }} />
                 </div>
                 <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>REGISTRATION NUMBER</label>
                    <input type="text" defaultValue="UR/2026/001" style={{ width: '100%' }} />
                 </div>
                 <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CONTACT EMAIL</label>
                    <input type="email" defaultValue="admin@ur.ac.rw" style={{ width: '100%' }} />
                 </div>
                 <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>PHONE NUMBER</label>
                    <input type="text" defaultValue="+250 788 123 456" style={{ width: '100%' }} />
                 </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                 <button className="btn" style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>Discard</button>
                 <button className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Save Changes</button>
              </div>
           </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
