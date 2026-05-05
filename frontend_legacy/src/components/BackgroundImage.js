import React from 'react';
import { Box } from '@mui/material';

const BackgroundImage = ({ children, opacity = 0.03 }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: `
          radial-gradient(circle at 20% 50%, rgba(25, 118, 210, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(56, 142, 60, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, rgba(245, 124, 0, 0.03) 0%, transparent 50%),
          linear-gradient(135deg, rgba(25, 118, 210, 0.02) 0%, rgba(56, 142, 60, 0.02) 100%)
        `,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255, 255, 255, 0.01) 35px,
              rgba(255, 255, 255, 0.01) 70px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 35px,
              rgba(0, 0, 0, 0.01) 35px,
              rgba(0, 0, 0, 0.01) 70px
            )
          `,
          opacity: opacity,
        }
      }}
    />
  );
};

export default BackgroundImage;
