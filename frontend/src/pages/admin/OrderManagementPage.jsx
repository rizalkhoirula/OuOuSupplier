import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const OrderManagementPage = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>
      <Typography variant="body1">
        Here you can view and manage all customer orders. This feature is under construction.
      </Typography>
    </Paper>
  );
};

export default OrderManagementPage;
