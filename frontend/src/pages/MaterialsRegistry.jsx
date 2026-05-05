import React from 'react';
import { Package, Plus, Search, Filter, Trash2, Edit3 } from 'lucide-react';

const MaterialsRegistry = () => {
  const materials = [
    { id: 'MAT-001', name: 'Thermal Paste (High Conductivity)', category: 'Consumables', stock: '42 Units', supplier: 'Kigali IT Solutions' },
    { id: 'MAT-005', name: 'Cat6 Shielded Cable (305m)', category: 'Networking', stock: '12 Units', supplier: 'Rwanda Cabling Ltd' },
    { id: 'MAT-012', name: '12V 7Ah UPS Battery', category: 'Power', stock: '85 Units', supplier: 'Eco-Power Systems' }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Materials & Spares Hub</h1>
          <p style={{ color: 'var(--text-muted)' }}>Inventory management for all maintenance consumables</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>+ Add New Material</button>
      </header>

      <div className="premium-card" style={{ padding: 0, overflow: 'hidden', background: 'white' }}>
         <div style={{ padding: '1.25rem 2rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', width: '300px' }}>
               <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
               <input type="text" placeholder="Search materials..." style={{ width: '100%', paddingLeft: '2.5rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.875rem' }} />
            </div>
         </div>
         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
               <tr style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem 2rem' }}>Material Details</th>
                  <th style={{ padding: '1rem 2rem' }}>Category</th>
                  <th style={{ padding: '1rem 2rem' }}>Available Stock</th>
                  <th style={{ padding: '1rem 2rem', textAlign: 'right' }}>Actions</th>
               </tr>
            </thead>
            <tbody>
               {materials.map((m, i) => (
                 <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1.25rem 2rem' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ padding: '0.5rem', background: '#f0f9ff', color: '#0369a1', borderRadius: '8px' }}><Package size={18} /></div>
                          <div>
                             <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1e293b' }}>{m.name}</p>
                             <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.id} | {m.supplier}</p>
                          </div>
                       </div>
                    </td>
                    <td style={{ padding: '1.25rem 2rem', fontSize: '0.875rem', color: '#475569' }}>{m.category}</td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                       <span style={{ fontWeight: 800, color: parseInt(m.stock) < 20 ? '#ef4444' : '#1e293b' }}>{m.stock}</span>
                    </td>
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

export default MaterialsRegistry;
