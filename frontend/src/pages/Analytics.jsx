import React from 'react';
import { Send, BarChart3, TrendingUp, Zap, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Analytics & AI Assistant</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time performance insights powered by SMART-AI</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '2rem' }}>
        {/* AI Assistant Panel */}
        <section className="premium-card" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 350px)', overflow: 'hidden', background: '#1e293b', padding: 0 }}>
          <header style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: '#334155', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 800 }}>SMART-AI Assistant</span>
            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Online</span>
          </header>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <div style={{ alignSelf: 'flex-start', maxWidth: '85%', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
                Hello! I am your SMART-AI. How can I help you with your ecosystem maintenance today?
             </div>
             <div style={{ alignSelf: 'flex-end', maxWidth: '85%', padding: '1rem', background: '#3b82f6', borderRadius: '12px', fontSize: '0.875rem', color: 'white' }}>
                Show me the predicted failure rate for UR-SRV-01.
             </div>
             <div style={{ alignSelf: 'flex-start', maxWidth: '85%', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
                Analyzing patterns... UR-SRV-01 has a 12% probability of fan failure within the next 72 hours based on recent thermal telemetry.
             </div>
          </div>

          <footer style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '0.5rem' }}>
            <input type="text" placeholder="Ask AI anything..." style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
            <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px' }}><Send size={18} /></button>
          </footer>
        </section>

        {/* Performance Data */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="premium-card" style={{ padding: '2rem', background: '#334155', color: 'white', textAlign: 'center' }}>
                 <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>SLA COMPLIANCE (MTD)</p>
                 <h3 style={{ fontSize: '2.5rem', fontWeight: 900 }}>98.2%</h3>
                 <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '1.5rem' }}>
                    <div style={{ width: '98%', height: '100%', background: '#10b981', borderRadius: '4px' }}></div>
                 </div>
              </div>
              <div className="premium-card" style={{ padding: '2rem', background: '#334155', color: 'white', textAlign: 'center' }}>
                 <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>AVG REPAIR VELOCITY</p>
                 <h3 style={{ fontSize: '2.5rem', fontWeight: 900 }}>4.2h</h3>
                 <p style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '1rem' }}>↓ 15% from last month</p>
              </div>
           </div>

           <div className="premium-card" style={{ padding: 0, background: '#1e293b', color: 'white', overflow: 'hidden' }}>
              <header style={{ padding: '1.5rem 2rem', background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                 <h4 style={{ fontWeight: 800, fontSize: '0.875rem' }}>Top Technician Performance</h4>
              </header>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                   <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                      <th style={{ padding: '1rem 2rem' }}>NAME</th>
                      <th style={{ padding: '1rem 2rem' }}>TASKS</th>
                      <th style={{ padding: '1rem 2rem' }}>SLA %</th>
                      <th style={{ padding: '1rem 2rem' }}>RATING</th>
                   </tr>
                </thead>
                <tbody>
                   {[
                     { name: 'Emmanuel R.', tasks: 142, sla: '99.2%', rating: '4.9/5' },
                     { name: 'Grace U.', tasks: 108, sla: '97.8%', rating: '4.8/5' },
                     { name: 'Jean Paul M.', tasks: 94, sla: '96.5%', rating: '4.7/5' }
                   ].map((t, i) => (
                     <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.875rem' }}>
                        <td style={{ padding: '1.25rem 2rem', fontWeight: 700 }}>{t.name}</td>
                        <td style={{ padding: '1.25rem 2rem' }}>{t.tasks}</td>
                        <td style={{ padding: '1.25rem 2rem', color: '#10b981', fontWeight: 700 }}>{t.sla}</td>
                        <td style={{ padding: '1.25rem 2rem', color: '#FFCD00', fontWeight: 800 }}>★ {t.rating}</td>
                     </tr>
                   ))}
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
