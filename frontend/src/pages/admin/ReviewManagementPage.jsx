import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ReviewManagementPage = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Review Management
      </Typography>
      <Typography variant="body1">
        Here you can moderate and manage customer reviews. This feature is under construction.
      </Typography>
    </Paper>
  );
};

export default ReviewManagementPage;
