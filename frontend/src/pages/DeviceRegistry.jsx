import React from 'react';
import { Monitor, Plus, Filter, Search, Download, Trash2, Edit3 } from 'lucide-react';

const DeviceRegistry = () => {
  const devices = [
    { id: 'UR-SRV-01', name: 'Main Campus Server', type: 'Infrastructure', status: 'Optimal', lastService: '2026-04-12' },
    { id: 'KFH-NET-09', name: 'King Faisal Switch', type: 'Networking', status: 'Warning', lastService: '2026-03-22' },
    { id: 'RBC-LAB-44', name: 'Centrifuge #4', type: 'Bio-Medical', status: 'Optimal', lastService: '2026-04-28' },
    { id: 'UR-ENG-22', name: '3D Printer', type: 'Engineering', status: 'In Repair', lastService: '2026-05-01' }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>National Device Registry</h1>
          <p style={{ color: 'var(--text-muted)' }}>Centralized inventory of all institutional assets and devices</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>+ Register New Asset</button>
      </header>

      <div className="premium-card" style={{ padding: 0, overflow: 'hidden', background: 'white' }}>
         <div style={{ padding: '1.25rem 2rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', width: '300px' }}>
               <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
               <input type="text" placeholder="Search devices..." style={{ width: '100%', paddingLeft: '2.5rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.875rem' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
               <button className="btn" style={{ background: 'white', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}><Filter size={14} /> Filter</button>
               <button className="btn" style={{ background: 'white', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}><Download size={14} /> Export</button>
            </div>
         </div>
         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
               <tr style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem 2rem' }}>Asset Details</th>
                  <th style={{ padding: '1rem 2rem' }}>Type</th>
                  <th style={{ padding: '1rem 2rem' }}>Status</th>
                  <th style={{ padding: '1rem 2rem' }}>Last Service</th>
                  <th style={{ padding: '1rem 2rem', textAlign: 'right' }}>Actions</th>
               </tr>
            </thead>
            <tbody>
               {devices.map((d, i) => (
                 <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1.25rem 2rem' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ padding: '0.5rem', background: '#eff6ff', color: '#3b82f6', borderRadius: '8px' }}><Monitor size={18} /></div>
                          <div>
                             <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1e293b' }}>{d.name}</p>
                             <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{d.id}</p>
                          </div>
                       </div>
                    </td>
                    <td style={{ padding: '1.25rem 2rem', fontSize: '0.875rem', color: '#475569' }}>{d.type}</td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                       <span style={{ 
                         padding: '0.25rem 0.75rem', 
                         borderRadius: '4px', 
                         background: d.status === 'Optimal' ? '#dcfce7' : d.status === 'Warning' ? '#fef3c7' : '#f1f5f9',
                         color: d.status === 'Optimal' ? '#166534' : d.status === 'Warning' ? '#92400e' : '#475569',
                         fontSize: '0.7rem',
                         fontWeight: 800
                       }}>
                         {d.status.toUpperCase()}
                       </span>
                    </td>
                    <td style={{ padding: '1.25rem 2rem', fontSize: '0.875rem', color: '#64748b' }}>{d.lastService}</td>
                    <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                       <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                          <Edit3 size={16} color="#64748b" style={{ cursor: 'pointer' }} />
                          <Trash2 size={16} color="#ef4444" style={{ cursor: 'pointer' }} />
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default DeviceRegistry;
