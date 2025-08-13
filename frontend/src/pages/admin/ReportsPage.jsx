import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ReportsPage = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Typography variant="body1">
        Here you can view sales reports, user analytics, and other data. This feature is under construction.
      </Typography>
    </Paper>
  );
};

export default ReportsPage;