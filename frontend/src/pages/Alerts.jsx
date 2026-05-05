import React from 'react';
import { INITIAL_DATA } from '../MockData';
import { Bell, Info, AlertTriangle } from 'lucide-react';

const Alerts = () => {
  const { systemAlerts } = INITIAL_DATA;

  return (
    <>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>System Alerts & Notifications</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time updates on task statuses, procurement, and system health</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {systemAlerts.map((alert, i) => (
          <div key={i} className="premium-card" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', borderLeft: `6px solid ${alert.color}` }}>
            <div style={{ background: alert.color, color: 'white', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
               {alert.type === 'CRITICAL' ? <AlertTriangle size={24} /> : alert.type === 'INFO' ? <Info size={24} /> : <Bell size={24} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h4 style={{ fontWeight: 700, color: 'var(--text-main)' }}>{alert.title}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alert.time}</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{alert.message}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>View Details</button>
                <button className="btn" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem', background: 'transparent', border: '1px solid var(--border-color)' }}>Mark as Read</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Alerts;
