import React from 'react';
import { NavLink } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
      <footer style={{ background: 'rgba(26, 28, 44, 0.95)', backdropFilter: 'blur(10px)', color: 'white', padding: '6rem 4rem 2rem', zIndex: 10, position: 'relative' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '4rem', marginBottom: '5rem' }}>
            <div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <img src="/logo.png" alt="SMART-2MCE" style={{ width: '50px', height: '50px' }} />
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>SMART-2MCE</h4>
               </div>
               <p style={{ opacity: 0.6, lineHeight: 1.8, fontSize: '0.95rem', maxWidth: '350px' }}>
                  Rwanda's leading multi-maintenance ecosystem. Empowering institutions with smart tech connectivity and professional elite services.
               </p>
            </div>
            <div>
               <h5 style={{ fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase', fontSize: '0.85rem', color: '#60a5fa' }}>Navigation</h5>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem' }}>
                  <li><a href="/#top" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</a></li>
                  <li><a href="/#about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>About Us</a></li>
                  <li><a href="/#contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Contact Hub</a></li>
                  <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Privacy Policy</a></li>
               </ul>
            </div>
            <div>
               <h5 style={{ fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase', fontSize: '0.85rem', color: '#60a5fa' }}>Ecosystem</h5>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem' }}>
                  <li><NavLink to="/dashboard" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Institution Portal</NavLink></li>
                  <li><NavLink to="/tech-dashboard" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Technician Hub</NavLink></li>
                  <li><NavLink to="/supplier" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Supplier Portal</NavLink></li>
                  <li><NavLink to="/learning" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Learning Center</NavLink></li>
               </ul>
            </div>
            <div>
               <h5 style={{ fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase', fontSize: '0.85rem', color: '#60a5fa' }}>Official Connect</h5>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.9rem' }}>
                  {/* WhatsApp Link */}
                  <a href="https://wa.me/250793719131" target="_blank" rel="noreferrer" style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                     <Phone size={18} /> <span>+250 793 719 131</span>
                  </a>
                  {/* Email Link */}
                  <a href="mailto:harindintwarietienne@gmail.com" style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                     <Mail size={18} /> <span>harindintwarietienne@gmail.com</span>
                  </a>
                  <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.8)' }}>
                     <MapPin size={18} /> <span>Kigali, Rwanda Hub</span>
                  </div>
               </div>
            </div>
         </div>
         <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem', textAlign: 'center' }}>
            <p style={{ opacity: 0.4, fontSize: '0.8rem', letterSpacing: '1px', margin: 0 }}>
               SMART-2MCE © 2026 ALL RIGHTS RESERVED • BUILT BY ETIENNE HARINDINTWARI • RELIABILITY | QUALITY | SPEED
            </p>
         </div>
      </footer>
  );
};

export default Footer;
