import React from 'react';
import { Rating as MuiRating, Box, Typography } from '@mui/material';

const Rating = ({ value, text }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <MuiRating
        value={value}
        precision={0.5}
        readOnly
        sx={{
          fontSize: { xs: "1rem", sm: "1.25rem" },
        }}
      />
      {text && (
        <Typography
          variant="body2"
          sx={{
            ml: 0.5,
            display: { xs: "none", sm: "block" },
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default Rating;
