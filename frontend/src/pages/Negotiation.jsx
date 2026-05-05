import React from 'react';
import { Send, FileText, CheckCircle, Clock } from 'lucide-react';

const Negotiation = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', height: 'calc(100vh - 250px)', display: 'flex', gap: '2rem' }}>
      <aside className="premium-card" style={{ width: '350px', padding: '2rem', background: '#1e293b', color: 'white' }}>
         <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
           <FileText size={20} color="#3b82f6" /> Task Details
         </h3>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
               <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>SERVICE ID</p>
               <p style={{ fontWeight: 700 }}>SR-2026-092</p>
            </div>
            <div>
               <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>INSTITUTION</p>
               <p style={{ fontWeight: 700 }}>King Faisal Hospital</p>
            </div>
            <div>
               <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>DEVICE</p>
               <p style={{ fontWeight: 700 }}>Core Switch Rack (Network)</p>
            </div>
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
               <p style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: 800, marginBottom: '0.5rem' }}>OFFER STATUS</p>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} />
                  <span style={{ fontWeight: 700 }}>Pending Review</span>
               </div>
            </div>
         </div>
      </aside>

      <section className="premium-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', background: 'white' }}>
         <header style={{ padding: '1.5rem 2.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>K</div>
               <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>King Faisal Hospital</h4>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>Verified Institution</p>
               </div>
            </div>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', background: '#3b82f6' }}>
               <CheckCircle size={18} /> Accept Bid
            </button>
         </header>

         <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ alignSelf: 'flex-start', maxWidth: '70%', padding: '1.25rem', background: '#f8fafc', borderRadius: '16px', fontSize: '0.9rem', border: '1px solid #e2e8f0' }}>
               We need the cooling unit repair finished by tomorrow 3 PM. Our budget is fixed at $150.
            </div>
            <div style={{ alignSelf: 'flex-end', maxWidth: '70%', padding: '1.25rem', background: '#3b82f6', color: 'white', borderRadius: '16px', fontSize: '0.9rem' }}>
               Understood. I can commit to that timeline if the spare fans are available on site.
            </div>
         </div>

         <footer style={{ padding: '2rem 2.5rem', background: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '1.5rem' }}>
            <input type="text" placeholder="Type your message..." style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }} />
            <button className="btn" style={{ background: '#3b82f6', color: 'white', padding: '1rem 1.5rem' }}><Send size={20} /></button>
         </footer>
      </section>
    </div>
  );
};

export default Negotiation;
