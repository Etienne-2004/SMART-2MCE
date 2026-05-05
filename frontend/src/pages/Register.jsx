import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, User, Mail, Lock, Building, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const steps = [
    { n: 1, label: 'Identity', icon: <User size={16} /> },
    { n: 2, label: 'Role Selection', icon: <Briefcase size={16} /> },
    { n: 3, label: 'Verification', icon: <Building size={16} /> },
    { n: 4, label: 'Finalize', icon: <ChevronRight size={16} /> }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      {/* Background with Overlay */}
      <div style={{ 
        position: 'absolute', 
        top: 0, left: 0, right: 0, bottom: 0, 
        backgroundImage: 'url("/eco-bg.png")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        opacity: 0.25,
        zIndex: 0 
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navbar */}
        <header className="navbar" style={{ background: 'rgba(2, 6, 23, 0.6)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--primary-blue)' }} />
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'white' }}>SMART-2MCE</h2>
              <p style={{ fontSize: '0.65rem', color: '#94a3b8' }}>JOIN THE ECOSYSTEM</p>
            </div>
          </div>
          <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Login Instead</button>
        </header>

        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card" 
            style={{ width: '100%', maxWidth: '800px', padding: '4rem', background: 'rgba(2, 6, 23, 0.4)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {/* Stepper Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '22px', left: '0', right: '0', height: '2px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }}></div>
               {steps.map((s, i) => (
                 <div key={i} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                   <div style={{ 
                     width: '44px', height: '44px', borderRadius: '50%', 
                     background: s.n === step ? 'var(--primary-blue)' : s.n < step ? 'var(--primary-green)' : 'rgba(255,255,255,0.05)',
                     color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                     boxShadow: s.n === step ? '0 0 20px rgba(0, 97, 193, 0.4)' : 'none',
                     border: s.n === step ? '2px solid white' : 'none'
                   }}>
                     {s.icon}
                   </div>
                   <span style={{ fontSize: '0.7rem', fontWeight: 800, color: s.n === step ? 'white' : '#64748b', textTransform: 'uppercase' }}>{s.label}</span>
                 </div>
               ))}
            </div>

            {/* Form Step 1: Identity */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Create Professional Identity</h1>
              <p style={{ color: '#94a3b8' }}>Secure your place in Rwanda's premium maintenance network</p>
            </div>

            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase' }}>FULL LEGAL NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input type="text" placeholder="John Doe" style={{ width: '100%', paddingLeft: '2.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase' }}>BUSINESS EMAIL</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input type="email" placeholder="john@smart-2mce.com" style={{ width: '100%', paddingLeft: '2.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase' }}>CREATE PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input type="password" placeholder="••••••••" style={{ width: '100%', paddingLeft: '2.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase' }}>CONFIRM PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input type="password" placeholder="••••••••" style={{ width: '100%', paddingLeft: '2.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>
              </div>
            </form>

            <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ padding: '1.25rem 4rem', fontSize: '1rem', borderRadius: '12px' }}>
                Next Phase <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </main>

        <footer style={{ padding: '2rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748b', background: 'rgba(0,0,0,0.2)' }}>
          © 2026 SMART-2MCE Ecosystem. All data is encrypted and handled according to Rwandan Privacy Regulations.
        </footer>
      </div>
    </div>
  );
};

export default Register;
