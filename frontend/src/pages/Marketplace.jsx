import React from 'react';
import { ShoppingCart, Package, Search, Filter, Star, Truck, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const Marketplace = () => {
  const products = [
    { id: 1, name: 'Medical Grade IPA 99.9%', price: '$45.00', category: 'Cleaning', stock: '24 Units', rating: 4.8 },
    { id: 2, name: 'Cat6 Shielded Network Cable', price: '$120.00', category: 'Networking', stock: '12 Units', rating: 4.5 },
    { id: 3, name: '12V 7Ah UPS Battery', price: '$35.00', category: 'Power', stock: '85 Units', rating: 4.9 },
    { id: 4, name: 'Thermal Imaging Camera', price: '$850.00', category: 'Diagnostics', stock: '2 Units', rating: 5.0 },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Ecosystem Marketplace</h1>
          <p style={{ color: 'var(--text-muted)' }}>Verified spare parts and tools for professional maintenance</p>
        </div>
        <div style={{ position: 'relative', width: '350px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search for parts..." style={{ width: '100%', paddingLeft: '2.75rem', background: '#e2e8f0', border: '1px solid #cbd5e1', borderRadius: '12px' }} />
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {products.map((p, i) => (
          <div key={i} className="premium-card" style={{ padding: '0', overflow: 'hidden', background: 'white' }}>
            <div style={{ height: '180px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Package size={48} color="#94a3b8" />
            </div>
            <div style={{ padding: '1.5rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase' }}>{p.category}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f59e0b' }}>★ {p.rating}</span>
               </div>
               <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b' }}>{p.name}</h3>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1e293b' }}>{p.price}</span>
                  <button className="btn" style={{ background: 'var(--primary-blue)', color: 'white', padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Add to Cart</button>
               </div>
               <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9', fontSize: '0.75rem', color: '#64748b', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Truck size={14} /> Ready for delivery in Kigali
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
