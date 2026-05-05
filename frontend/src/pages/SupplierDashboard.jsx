import React from 'react';
import { Package, Truck, DollarSign, Clock, BarChart3, ArrowRight } from 'lucide-react';

const SupplierDashboard = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Supplier Management Hub</h1>
        <p style={{ color: 'var(--text-muted)' }}>Inventory tracking and procurement order management</p>
      </header>

      <div className="grid-auto" style={{ marginBottom: '2.5rem' }}>
        {[
          { label: 'Total Revenue', value: '$84,200', icon: <DollarSign size={20} />, color: '#10b981' },
          { label: 'Pending Orders', value: '18', icon: <Package size={20} />, color: '#3b82f6' },
          { label: 'In-Transit', value: '5', icon: <Truck size={20} />, color: '#f59e0b' },
          { label: 'Won Tenders', value: '142', icon: <BarChart3 size={20} />, color: '#6366f1' }
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <section className="premium-card" style={{ padding: '2rem', background: 'white' }}>
           <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '2rem', color: '#1e293b' }}>Active Procurement Tenders</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { id: 'T-102', item: 'Cat6 Network Cable', inst: 'University of Rwanda', date: 'Exp: 2026-05-10' },
                { id: 'T-105', item: 'Industrial Filter X', inst: 'KFH Center', date: 'Exp: 2026-05-12' }
              ].map((t, i) => (
                <div key={i} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>{t.item}</p>
                      <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.inst}</p>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#3b82f6', marginBottom: '0.25rem' }}>{t.date}</p>
                      <button className="btn" style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary-blue)' }}>Bid Now <ArrowRight size={14} /></button>
                   </div>
                </div>
              ))}
           </div>
        </section>

        <section className="premium-card" style={{ padding: '2rem', background: 'white' }}>
           <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '2rem', color: '#1e293b' }}>Order Logistics</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { order: '#ORD-9901', status: 'In Transit', progress: 75 },
                { order: '#ORD-9882', status: 'Processing', progress: 25 }
              ].map((o, i) => (
                <div key={i}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>{o.order}</span>
                      <span style={{ color: '#3b82f6', fontWeight: 800 }}>{o.status}</span>
                   </div>
                   <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px' }}>
                      <div style={{ width: `${o.progress}%`, height: '100%', background: '#3b82f6', borderRadius: '3px' }}></div>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default SupplierDashboard;
