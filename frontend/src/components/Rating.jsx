import React from 'react';
import { Rating as MuiRating, Box, Typography } from '@mui/material';

const Rating = ({ value, text }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <MuiRating value={value} precision={0.5} readOnly />
      {text && <Typography variant="body2" sx={{ ml: 1 }}>{text}</Typography>}
    </Box>
  );
};

export default Rating;
