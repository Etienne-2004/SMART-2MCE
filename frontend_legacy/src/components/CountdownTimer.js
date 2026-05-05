import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, CircularProgress } from '@mui/material';
import { Schedule, Warning, CheckCircle } from '@mui/icons-material';

const CountdownTimer = ({ 
  targetTime, 
  title = "Deadline", 
  showProgress = true,
  size = 'medium'
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
    percentage: 0
  });
  const [isExpired, setIsExpired] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (!targetTime) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetTime).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Calculate percentage (assuming 7 days as total period for percentage calculation)
        const totalPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        const elapsed = totalPeriod - difference;
        const percentage = Math.max(0, Math.min(100, (elapsed / totalPeriod) * 100));

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          total: difference,
          percentage
        });

        setIsUrgent(difference < 24 * 60 * 60 * 1000); // Less than 24 hours
        setIsExpired(false);
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 0,
          percentage: 100
        });
        setIsExpired(true);
        setIsUrgent(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { typography: 'caption', iconSize: 16, chipSize: 'small' };
      case 'large':
        return { typography: 'h6', iconSize: 24, chipSize: 'medium' };
      default:
        return { typography: 'body2', iconSize: 20, chipSize: 'small' };
    }
  };

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const getTimerColor = () => {
    if (isExpired) return 'error';
    if (isUrgent) return 'warning';
    return 'success';
  };

  const getTimerIcon = () => {
    if (isExpired) return <Warning />;
    if (isUrgent) return <Schedule />;
    return <CheckCircle />;
  };

  if (!targetTime) {
    return (
      <Chip
        label="No deadline set"
        variant="outlined"
        size={getSizeStyles().chipSize}
        color="default"
      />
    );
  }

  const sizeStyles = getSizeStyles();

  if (size === 'small') {
    return (
      <Chip
        icon={getTimerIcon()}
        label={isExpired ? 'Expired' : `${formatTime(timeLeft.days)}d ${formatTime(timeLeft.hours)}h`}
        color={getTimerColor()}
        variant={isExpired ? 'filled' : 'outlined'}
        size={sizeStyles.chipSize}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {showProgress && (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={timeLeft.percentage}
            size={size === 'large' ? 60 : 40}
            color={getTimerColor()}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getTimerIcon()}
          </Box>
        </Box>
      )}
      
      <Box>
        <Typography variant={sizeStyles.typography} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        
        {isExpired ? (
          <Typography variant={sizeStyles.typography} color="error" fontWeight="bold">
            Expired
          </Typography>
        ) : (
          <Box>
            <Typography variant={sizeStyles.typography} color={getTimerColor()} fontWeight="bold">
              {timeLeft.days > 0 && `${timeLeft.days}d `}
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </Typography>
            {timeLeft.days > 0 && (
              <Typography variant="caption" color="text.secondary">
                {timeLeft.days} day{timeLeft.days !== 1 ? 's' : ''} remaining
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CountdownTimer;
