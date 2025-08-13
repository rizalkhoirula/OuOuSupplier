import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardFooter from './DashboardFooter';

const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DashboardHeader />
      <DashboardSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <DashboardFooter />
      </Box>
    </Box>
  );
};

export default DashboardLayout;