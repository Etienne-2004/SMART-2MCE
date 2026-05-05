import React from 'react';
import { Wrench, MapPin, Clock, DollarSign, ArrowUpRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TechnicianDashboard = () => {
  const availableTasks = [
    { id: 'SR-92', title: 'Network Server Rack Cooling', inst: 'King Faisal Hospital', budget: '$150', loc: 'Kigali', time: '2h ago' },
    { id: 'SR-88', title: 'Bio-Medical Fridge Calibration', inst: 'RBC Center', budget: '$300', loc: 'Remera', time: '5h ago' }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Technician Command Center</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your assigned tasks and explore available opportunities</p>
      </header>

      <div className="grid-auto" style={{ marginBottom: '2.5rem' }}>
        {[
          { label: 'Completed Tasks', value: '142', icon: <Star size={20} />, color: '#f59e0b' },
          { label: 'Active Jobs', value: '4', icon: <Wrench size={20} />, color: '#3b82f6' },
          { label: 'Total Earnings', value: '$12,450', icon: <DollarSign size={20} />, color: '#10b981' },
          { label: 'Avg Rating', value: '4.9', icon: <Star size={20} />, color: '#f59e0b' }
        ].map((stat, i) => (
          <div key={i} className="premium-card" style={{ padding: '1.5rem', background: '#334155', color: 'white', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '12px' }}>{stat.icon}</div>
            <div>
              <p style={{ fontSize: '1.25rem', fontWeight: 800 }}>{stat.value}</p>
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <section className="premium-card" style={{ padding: '2rem', background: 'white' }}>
           <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', color: '#1e293b' }}>New Task Opportunities</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {availableTasks.map((t, i) => (
                <div key={i} style={{ padding: '1.5rem', border: '1px solid #f1f5f9', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                      <div style={{ padding: '0.75rem', background: '#eff6ff', color: '#3b82f6', borderRadius: '10px' }}><Wrench size={20} /></div>
                      <div>
                         <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>{t.title}</h4>
                         <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{t.inst} • {t.loc}</p>
                      </div>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.25rem' }}>{t.budget}</p>
                      <button className="btn" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6' }}>Submit Bid <ArrowUpRight size={14} /></button>
                   </div>
                </div>
              ))}
           </div>
        </section>

        <section className="premium-card" style={{ padding: '2rem', background: 'white' }}>
           <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', color: '#1e293b' }}>Upcoming Schedule</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { time: '09:00 AM', label: 'Server Maintenance', at: 'University of Rwanda' },
                { time: '02:30 PM', label: 'UPS Battery Check', at: 'King Faisal Hospital' }
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                   <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '8px', minWidth: '70px', textAlign: 'center' }}>
                      <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e293b' }}>{s.time}</p>
                   </div>
                   <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>{s.label}</p>
                      <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.at}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
