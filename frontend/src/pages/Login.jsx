import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('institution');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Password@2026') {
      setAuth(true);
      if (role === 'technician') navigate('/tech-dashboard');
      else if (role === 'supplier') navigate('/supplier');
      else navigate('/dashboard');
    } else {
      setError('Invalid security password. Please use Password@2026');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(rgba(26, 28, 44, 0.85), rgba(26, 28, 44, 0.85)), url("/convention-bg.jpg") no-repeat center center fixed',
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(30,104,179,0.15) 0%, transparent 70%)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(56,142,60,0.15) 0%, transparent 70%)', zIndex: 0 }}></div>

      {/* Official Header Style */}
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '3rem 4rem', zIndex: 1 }}>
        <img src="/logo.png" alt="SMART-2MCE" style={{ width: '60px', height: '60px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }} />
        <div>
           <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 900, margin: 0, letterSpacing: '1px' }}>SMART-2MCE</h1>
           <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: '0.25rem 0 0', fontWeight: 600 }}>National Maintenance & Connectivity Ecosystem</p>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ 
            width: '100%', 
            maxWidth: '520px', 
            background: 'white', 
            borderRadius: '16px', 
            padding: '4rem 3.5rem',
            boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
             <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#1e68b3' }}>
                <UserCheck size={40} />
             </div>
             <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#1a1c2c' }}>Portal Access</h2>
             <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.5rem' }}>Secure authentication for ecosystem members</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1a1c2c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Access Role</label>
               <select 
                 value={role} 
                 onChange={(e) => setRole(e.target.value)}
                 style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, color: '#1a1c2c' }}
               >
                 <option value="institution">I am an Institution</option>
                 <option value="technician">I am a Technician</option>
                 <option value="supplier">I am a Supplier</option>
               </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1a1c2c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Official Email</label>
               <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="email" 
                    required 
                    placeholder="example@institution.rw" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '1rem 1rem 1rem 3rem' }}
                  />
               </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1a1c2c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Security Password</label>
               <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '1rem 1rem 1rem 3rem' }}
                  />
               </div>
               {error && <p style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: 700 }}>{error}</p>}
            </div>

            <button 
              type="submit"
              className="btn btn-blue"
              style={{ width: '100%', padding: '1.25rem', justifyContent: 'center', fontSize: '1.1rem', marginTop: '1.5rem', borderRadius: '10px' }}
            >
              Sign In to Portal <ArrowRight size={20} />
            </button>
          </form>

          {/* All Three Demo Credentials */}
          <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid #f1f5f9' }}>
             <div style={{ background: '#fff8e1', padding: '1.5rem', borderRadius: '12px', textAlign: 'left', border: '1px solid #ffecb3' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 900, color: '#f9a825', marginBottom: '1rem', textTransform: 'uppercase' }}>Demo Credentials Assistant</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#1a1c2c' }}>
                   <p style={{ margin: 0 }}><b>Institution:</b> inst@gmail.com</p>
                   <p style={{ margin: 0 }}><b>Technician:</b> tech@gmail.com</p>
                   <p style={{ margin: 0 }}><b>Supplier:</b> supp@gmail.com</p>
                   <p style={{ margin: '0.4rem 0 0', color: '#1e68b3', fontWeight: 800 }}>Password: Password@2026</p>
                </div>
             </div>
             <p style={{ marginTop: '2rem', fontSize: '0.95rem', color: '#64748b', textAlign: 'center' }}>
               New to the hub? <span onClick={() => navigate('/register')} style={{ color: '#1e68b3', fontWeight: 800, cursor: 'pointer' }}>Register Account</span>
             </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
