import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const CategoryManagementPage = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Category Management
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Add Category
        </Button>
      </Box>
      <Typography variant="body1">
        Here you can add, edit, and delete product categories. This feature is under construction.
      </Typography>
    </Paper>
  );
};

export default CategoryManagementPage;
