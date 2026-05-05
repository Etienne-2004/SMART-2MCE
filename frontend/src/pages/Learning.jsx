import React from 'react';
import { INITIAL_DATA } from '../MockData';
import { BookOpen, PlayCircle, Clock } from 'lucide-react';

const Learning = () => {
  const { learning } = INITIAL_DATA;

  return (
    <>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Learning & Resource Center</h1>
        <p style={{ color: 'var(--text-muted)' }}>Professional development and equipment manuals for technicians and staff</p>
      </header>

      <div className="grid-auto">
        {learning.map((module, i) => (
          <div key={i} className="premium-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '160px', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
               <img src={`https://via.placeholder.com/400x200?text=${module.title}`} alt={module.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
               <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent-purple)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                  {module.duration}
               </div>
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
               <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{module.cat}</span>
               <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>{module.title}</h4>
               <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>{module.desc}</p>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                     <BookOpen size={14} /> Guide
                  </div>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
                     <PlayCircle size={14} /> Start Module
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Learning;
