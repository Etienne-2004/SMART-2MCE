import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School, Wrench, Truck, Phone, Mail, MapPin, Globe, ShieldCheck, Zap, Activity, Users, Target } from 'lucide-react';
import Footer from '../components/Footer';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'url("/convention-bg.jpg") no-repeat center center fixed', backgroundSize: 'cover', display: 'flex', flexDirection: 'column' }}>
      {/* Official Header Area */}
      <section style={{ background: 'rgba(26, 28, 44, 0.8)', backdropFilter: 'blur(8px)', padding: '6rem 4rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, margin: 0, letterSpacing: '-2px' }}>SMART-2MCE</h1>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0.5rem 0 1.5rem', color: '#60a5fa' }}>
            Smart Multi-Maintenance & <br /> Multi-Connect Ecosystem
          </h2>
          <p style={{ maxWidth: '600px', fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Rwanda's National Platform connecting Institutions, Technicians and Suppliers for smarter maintenance and reliable infrastructure.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
             <button onClick={() => navigate('/register')} className="btn btn-blue" style={{ padding: '1.25rem 2.5rem', fontSize: '1rem' }}>Register Institution</button>
             <button onClick={() => navigate('/login')} className="btn btn-green" style={{ padding: '1.25rem 2.5rem', fontSize: '1rem' }}>Find Work (Technician)</button>
             <button onClick={() => navigate('/login')} className="btn btn-yellow" style={{ padding: '1.25rem 2.5rem', fontSize: '1rem' }}>Join as Supplier</button>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
           <div style={{ width: '450px', height: '450px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '350px', height: '350px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '15px solid var(--primary-blue)', boxShadow: '0 0 50px rgba(30, 104, 179, 0.3)' }}>
                 <img src="/logo.png" alt="Ecosystem" style={{ width: '260px', height: '260px', objectFit: 'contain' }} />
              </div>
           </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', color: 'white', padding: '4rem' }}>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center' }}>
            {[
              { label: 'Institutions Served', val: '1,200+', color: '#f9a825' },
              { label: 'Tasks Completed', val: '8,500+', color: '#f9a825' },
              { label: 'Technicians Registered', val: '3,200+', color: '#f9a825' },
              { label: 'Verified Suppliers', val: '420+', color: '#f9a825' }
            ].map((stat, i) => (
              <div key={i}>
                 <h3 style={{ fontSize: '3rem', fontWeight: 900, color: stat.color, marginBottom: '0.5rem' }}>{stat.val}</h3>
                 <p style={{ fontSize: '0.85rem', opacity: 0.6, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Role Sections */}
      <section style={{ padding: '6rem 4rem', background: 'rgba(248, 250, 252, 0.85)', backdropFilter: 'blur(8px)' }}>
         <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1a1c2c' }}>Ecosystem Participants</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '1rem' }}>Tailored solutions for every member of the maintenance network</p>
         </div>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
            {/* Institutions */}
            <div className="premium-card" style={{ overflow: 'hidden', border: 'none' }}>
               <div style={{ background: '#1e68b3', color: 'white', padding: '2rem', textAlign: 'center' }}>
                  <School size={40} style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>INSTITUTIONS</h3>
               </div>
               <div style={{ padding: '3rem', background: 'white', minHeight: '220px' }}>
                  <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem' }}>
                    Register your assets, track maintenance cycles, and hire verified experts to ensure 100% operational uptime.
                  </p>
               </div>
            </div>

            {/* Technicians */}
            <div className="premium-card" style={{ overflow: 'hidden', border: 'none' }}>
               <div style={{ background: '#388e3c', color: 'white', padding: '2rem', textAlign: 'center' }}>
                  <Wrench size={40} style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>TECHNICIANS</h3>
               </div>
               <div style={{ padding: '3rem', background: 'white', minHeight: '220px' }}>
                  <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem' }}>
                    Access high-value tasks, manage your schedule, and build a nationwide reputation for excellence.
                  </p>
               </div>
            </div>

            {/* Suppliers */}
            <div className="premium-card" style={{ overflow: 'hidden', border: 'none' }}>
               <div style={{ background: '#f9a825', color: 'white', padding: '2rem', textAlign: 'center' }}>
                  <Truck size={40} style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>SUPPLIERS</h3>
               </div>
               <div style={{ padding: '3rem', background: 'white', minHeight: '220px' }}>
                  <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem' }}>
                    Connect with procurement departments and fulfill spare parts orders with streamlined logistics.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* About Us Section */}
      <section id="about" style={{ padding: '8rem 4rem', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
               <span style={{ color: '#1e68b3', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Our Mission</span>
               <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#1a1c2c', margin: '1.5rem 0' }}>Why SMART-2MCE?</h2>
               <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.8, marginBottom: '2rem' }}>
                 SMART-2MCE is Rwanda's answer to modern infrastructure management. We believe that professional maintenance is the backbone of national development. Our platform bridges the gap between those who need expert care for their assets and the professionals who provide it.
               </p>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                     <ShieldCheck color="#1e68b3" /> <span style={{ fontWeight: 700 }}>Verified Experts</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                     <Zap color="#1e68b3" /> <span style={{ fontWeight: 700 }}>Fast Response</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                     <Activity color="#1e68b3" /> <span style={{ fontWeight: 700 }}>Real-time Tracking</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                     <Users color="#1e68b3" /> <span style={{ fontWeight: 700 }}>National Network</span>
                  </div>
               </div>
            </div>
            <div style={{ position: 'relative' }}>
               <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" alt="About" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.25)' }} />
               <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', background: '#1e68b3', padding: '2rem', borderRadius: '15px', color: 'white', textAlign: 'center', boxShadow: '0 20px 40px rgba(30,104,179,0.4)' }}>
                  <p style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>10+</p>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Years of Excellence</p>
               </div>
            </div>
         </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" style={{ padding: '8rem 4rem', background: 'rgba(241, 245, 249, 0.85)', backdropFilter: 'blur(8px)' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
               <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#1a1c2c' }}>Get In Touch</h2>
               <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '1rem' }}>Have questions? Our support hub is here for you 24/7</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }}>
               <div className="premium-card" style={{ padding: '4rem', border: 'none' }}>
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                           <label style={{ fontWeight: 800, fontSize: '0.85rem' }}>Full Name</label>
                           <input type="text" placeholder="Etienne Harindintwari" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                           <label style={{ fontWeight: 800, fontSize: '0.85rem' }}>Email Address</label>
                           <input type="email" placeholder="example@domain.rw" />
                        </div>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ fontWeight: 800, fontSize: '0.85rem' }}>Subject</label>
                        <input type="text" placeholder="Technical Support Request" />
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ fontWeight: 800, fontSize: '0.85rem' }}>Your Message</label>
                        <textarea rows="6" placeholder="How can we help your institution today?"></textarea>
                     </div>
                     <button type="button" className="btn btn-blue" style={{ padding: '1.25rem', justifyContent: 'center', fontSize: '1rem' }}>Send Message Now</button>
                  </form>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {[
                    { icon: <Phone color="#1e68b3" size={32} />, title: 'Call Our Hub', val: '+250 793 719 131' },
                    { icon: <Mail color="#1e68b3" size={32} />, title: 'Email Support', val: 'harindintwarietienne@gmail.com' },
                    { icon: <MapPin color="#1e68b3" size={32} />, title: 'Visit Office', val: 'Kigali, Rwanda • Innovation Center' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                       <div style={{ width: '70px', height: '70px', background: 'white', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                          {item.icon}
                       </div>
                       <div>
                          <h4 style={{ fontWeight: 800, fontSize: '1.1rem', margin: '0 0 0.25rem 0' }}>{item.title}</h4>
                          <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>{item.val}</p>
                       </div>
                    </div>
                  ))}
                  <div style={{ marginTop: '2rem', padding: '2.5rem', background: '#1e68b3', borderRadius: '20px', color: 'white' }}>
                     <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Emergency Hub</h4>
                     <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                        For critical infrastructure failures requiring immediate attention, call our 24/7 hotline.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Professional Multi-Column Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
