import React from 'react';
import { LayoutDashboard, AlertTriangle, CheckCircle, Clock, TrendingUp, Users, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1c2c' }}>Dashboard — University of Rwanda</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Welcome back, Admin Etienne | Last login: Today 08:14</p>
      </header>

      {/* Stat Cards Area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Devices', value: '47', color: '#1e68b3' },
          { label: 'Open Requests', value: '3', color: '#2e7d32' },
          { label: 'Late Tasks', value: '2', color: '#c62828' },
          { label: 'Active Technicians', value: '12', color: '#6a1b9a' }
        ].map((stat, i) => (
          <div key={i} className="stat-card" style={{ background: stat.color }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>{stat.value}</h3>
            <p style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 600 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Critical Alert */}
      <div style={{ 
        background: '#fff5f5', 
        border: '1px solid #feb2b2', 
        borderRadius: '4px', 
        padding: '1rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        color: '#c53030', 
        marginBottom: '2rem',
        fontSize: '0.85rem'
      }}>
        <AlertTriangle size={18} />
        <p style={{ margin: 0 }}><strong>Critical Alert:</strong> Task SR-002 (Network Switch) is LATE by 2h 14m — King Faisal Hospital</p>
      </div>

      {/* Recent Service Requests Table */}
      <div className="premium-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '0.85rem 1.25rem', background: '#1a1c2c', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Recent Service Requests</h3>
           <span style={{ fontSize: '0.75rem', cursor: 'pointer', opacity: 0.8 }}>View All →</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#1e68b3', color: 'white', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem 1.25rem' }}>ID</th>
              <th style={{ padding: '0.75rem 1.25rem' }}>Device / Material</th>
              <th style={{ padding: '0.75rem 1.25rem' }}>Institution Dept</th>
              <th style={{ padding: '0.75rem 1.25rem' }}>Priority</th>
              <th style={{ padding: '0.75rem 1.25rem' }}>Deadline</th>
              <th style={{ padding: '0.75rem 1.25rem' }}>Countdown</th>
              <th style={{ padding: '0.75rem 1.25rem' }}>Status</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.8rem' }}>
            {[
              { id: 'SR-001', device: 'Epson Projector — Lab A', dept: 'Computer Science', priority: 'HIGH', deadline: '28 Apr', countdown: '1d 4h 22m', status: 'In Progress', statusColor: '#2e7d32' },
              { id: 'SR-002', device: 'Network Switch — Server Room', dept: 'IT Department', priority: 'CRITICAL', deadline: '26 Apr', countdown: 'LATE 2h 14m', status: 'LATE', statusColor: '#c62828', rowBg: '#fff5f5' },
              { id: 'SR-003', device: 'Office Chair x4', dept: 'Admin Block', priority: 'LOW', deadline: '02 May', countdown: '5d 6h', status: 'Open', statusColor: '#1e68b3' },
              { id: 'SR-004', device: 'Generator UR/EL/001', dept: 'Power Room', priority: 'HIGH', deadline: '29 Apr', countdown: '2d 8h', status: 'Assigned', statusColor: '#2e7d32', rowBg: '#f0fdf4' },
              { id: 'SR-005', device: 'Dell Laptop UR/CS/005', dept: 'CS Lab 2', priority: 'MEDIUM', deadline: '01 May', countdown: '4d 2h', status: 'Under Review', statusColor: '#1e68b3' }
            ].map((row, i) => (
              <tr key={i} style={{ background: row.rowBg || 'white', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>{row.id}</td>
                <td style={{ padding: '1rem 1.25rem' }}>{row.device}</td>
                <td style={{ padding: '1rem 1.25rem', color: '#64748b' }}>{row.dept}</td>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: row.priority === 'CRITICAL' ? '#c62828' : '#1a1c2c' }}>{row.priority}</td>
                <td style={{ padding: '1rem 1.25rem' }}>{row.deadline}</td>
                <td style={{ padding: '1rem 1.25rem', color: row.status === 'LATE' ? '#c62828' : '#64748b' }}>{row.countdown}</td>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 800, color: row.statusColor }}>
                   {row.status === 'LATE' && <span style={{ marginRight: '4px' }}>⚠</span>}
                   {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
