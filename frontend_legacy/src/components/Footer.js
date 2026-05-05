import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  Fade
} from '@mui/material';
import {
  WhatsApp,
  Email,
  LocationOn,
  Phone,
  Business,
  Engineering,
  Inventory,
  Support,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram
} from '@mui/icons-material';
import Logo from './Logo';

const Footer = () => {
  const theme = useTheme();

  const quickLinks = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'About Us', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Contact', href: '/contact' },
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' }
  ];

  const services = [
    { title: 'Institution Management', icon: <Business />, description: 'Healthcare facility management' },
    { title: 'Technician Services', icon: <Engineering />, description: 'Professional maintenance' },
    { title: 'Supplier Solutions', icon: <Inventory />, description: 'Equipment and spare parts' },
    { title: '24/7 Support', icon: <Support />, description: 'Round-the-clock assistance' }
  ];

  const socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram />, href: '#', label: 'Instagram' }
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/250793719131', '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:harindintwarietiennee@gmail.com', '_blank');
  };

  return (
    <Fade in>
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          background: theme.isDark 
            ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          borderTop: `1px solid ${theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          color: theme.isDark ? '#ffffff' : '#333333'
        }}
      >
        {/* Main Footer Content */}
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Logo size="medium" />
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                  SMART-2MCE
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Rwanda's premier maintenance ecosystem connecting healthcare institutions, technicians, and suppliers for seamless medical equipment management.
                </Typography>
                
                {/* Social Media Links */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                          bgcolor: 'rgba(25, 118, 210, 0.1)',
                          transform: 'translateY(-2px)',
                          transition: 'all 0.3s ease'
                        }
                      }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} md={2}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Quick Links
              </Typography>
              <Box component="nav">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    color="text.secondary"
                    underline="none"
                    sx={{
                      display: 'block',
                      py: 1,
                      fontSize: '0.875rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateX(4px)',
                        pl: 1
                      }
                    }}
                  >
                    {link.title}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Services */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Our Services
              </Typography>
              {services.map((service, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        color: 'primary.main',
                        mr: 1,
                        fontSize: '1.2rem'
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography variant="subtitle2" fontWeight="medium">
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 3 }}>
                    {service.description}
                  </Typography>
                </Box>
              ))}
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Contact Us
              </Typography>
              
              {/* WhatsApp Contact */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(37, 211, 102, 0.1)',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(37, 211, 102, 0.2)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                  }
                }}
                onClick={handleWhatsAppClick}
              >
                <WhatsApp sx={{ color: '#25D366', mr: 2, fontSize: '1.5rem' }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="medium">
                    WhatsApp
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    +250 793 719 131
                  </Typography>
                </Box>
              </Box>

              {/* Email Contact */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(234, 67, 53, 0.1)',
                  border: '1px solid rgba(234, 67, 53, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(234, 67, 53, 0.2)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(234, 67, 53, 0.3)'
                  }
                }}
                onClick={handleEmailClick}
              >
                <Email sx={{ color: '#EA4335', mr: 2, fontSize: '1.5rem' }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Email
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    harindintwarietiennee@gmail.com
                  </Typography>
                </Box>
              </Box>

              {/* Location */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ color: 'primary.main', mr: 2, fontSize: '1.5rem' }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Location
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Kigali, Rwanda
                  </Typography>
                </Box>
              </Box>

              {/* Phone */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ color: 'primary.main', mr: 2, fontSize: '1.5rem' }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Phone
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    +250 788 123 456
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Bottom Footer */}
        <Divider sx={{ borderColor: theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }} />
        
        <Container maxWidth="xl">
          <Box
            sx={{
              py: 3,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography variant="caption" color="text.secondary">
              © 2026 SMART-2MCE. All rights reserved. Rwanda's Premier Maintenance Ecosystem.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link
                href="#"
                color="text.secondary"
                underline="none"
                variant="caption"
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="none"
                variant="caption"
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="none"
                variant="caption"
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                Cookie Policy
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};

export default Footer;
