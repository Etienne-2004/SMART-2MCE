import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Logo = ({ variant = 'default', size = 'medium', showText = true }) => {
  const theme = useTheme();
  
  const getLogoSize = () => {
    switch (size) {
      case 'small':
        return { width: 32, height: 32, fontSize: '1rem' };
      case 'large':
        return { width: 64, height: 64, fontSize: '1.75rem' };
      default:
        return { width: 48, height: 48, fontSize: '1.5rem' };
    }
  };

  const getLogoColors = () => {
    switch (variant) {
      case 'white':
        return { primary: '#ffffff', secondary: '#f0f0f0' };
      case 'dark':
        return { primary: '#1a237e', secondary: '#3949ab' };
      default:
        return { primary: theme.palette.primary.main, secondary: theme.palette.primary.light };
    }
  };

  const { width, height, fontSize } = getLogoSize();
  const { primary, secondary } = getLogoColors();

  // Professional SVG logo design for SMART-2MCE
  const logoSvg = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill={primary} />
      
      {/* Medical cross symbol */}
      <rect x="40" y="20" width="20" height="60" fill="#ffffff" rx="2" />
      <rect x="20" y="40" width="60" height="20" fill="#ffffff" rx="2" />
      
      {/* Gear teeth around the cross */}
      <g fill={secondary}>
        <rect x="15" y="15" width="8" height="8" rx="1" />
        <rect x="77" y="15" width="8" height="8" rx="1" />
        <rect x="15" y="77" width="8" height="8" rx="1" />
        <rect x="77" y="77" width="8" height="8" rx="1" />
        <rect x="15" y="46" width="8" height="8" rx="1" />
        <rect x="77" y="46" width="8" height="8" rx="1" />
        <rect x="46" y="15" width="8" height="8" rx="1" />
        <rect x="46" y="77" width="8" height="8" rx="1" />
      </g>
      
      {/* Central circle */}
      <circle cx="50" cy="50" r="8" fill="#ffffff" />
      <circle cx="50" cy="50" r="5" fill={primary} />
    </svg>
  );

  if (variant === 'icon-only') {
    return logoSvg;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        '&:hover': {
          opacity: 0.8,
          transition: 'opacity 0.2s ease-in-out'
        }
      }}
    >
      {logoSvg}
      {showText && (
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize,
            fontWeight: 'bold',
            color: variant === 'white' ? '#ffffff' : 
                   variant === 'dark' ? '#1a237e' : 'inherit',
            letterSpacing: 0.5,
            fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif'
          }}
        >
          SMART-2MCE
        </Typography>
      )}
    </Box>
  );
};

export default Logo;
