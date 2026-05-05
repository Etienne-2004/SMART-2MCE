import React from 'react';
import { ClipboardList, AlertTriangle, Upload, ChevronRight, Save, Send, ShoppingCart } from 'lucide-react';

const CreateRequest = () => {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1c2c' }}>Create New Service Request</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Report a device or material issue — all fields required</p>
      </header>

      <div className="premium-card" style={{ padding: '3rem', maxWidth: '1000px' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1c2c' }}>Request Title</label>
                <input type="text" placeholder="Projector not displaying — Lecture Hall A" />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1c2c' }}>Linked Device / Material</label>
                <select>
                   <option>UR/CS/002 — Epson Projector</option>
                   <option>UR/NET/001 — Network Switch</option>
                </select>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1c2c' }}>Priority Level</label>
                <select>
                   <option>HIGH</option>
                   <option>CRITICAL</option>
                   <option>LOW</option>
                </select>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1c2c' }}>Expected Duration</label>
                <select>
                   <option>2 Days</option>
                   <option>1 Week</option>
                </select>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1c2c' }}>Required Skills</label>
                <input type="text" placeholder="AV Equipment / Electrical Engineering" />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1c2c' }}>Budget Range (RWF)</label>
                <input type="text" placeholder="50,000 — 150,000" />
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1c2c' }}>Deadline Date</label>
                <input type="text" placeholder="30 April 2026" />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1c2c' }}>Marketplace File</label>
                <div style={{ position: 'relative' }}>
                   <input type="text" value="announcement_sr_001.pdf" readOnly style={{ background: '#f1f5f9', color: '#64748b' }} />
                   <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#388e3c' }}>✓</span>
                </div>
             </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
             <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1c2c' }}>Problem Description</label>
             <textarea rows="5" placeholder="Display fails after 5 minutes of use. Power indicator light blinks red 3 times..."></textarea>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
             <button type="button" className="btn btn-grey" style={{ flex: 1, justifyContent: 'center' }}>Save Draft</button>
             <button type="button" className="btn btn-green" style={{ flex: 1.5, justifyContent: 'center' }}>✓ Submit Request</button>
             <button type="button" className="btn btn-blue" style={{ flex: 2, justifyContent: 'center' }}>→ Publish to Marketplace</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
