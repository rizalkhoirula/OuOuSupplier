import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const UserManagementPage = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Add User
        </Button>
      </Box>
      <Typography variant="body1">
        Here you can view, edit, and manage user roles and permissions. This feature is under construction.
      </Typography>
    </Paper>
  );
};

export default UserManagementPage;