import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardFooter from './DashboardFooter';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

const DashboardLayout = () => {
  // Create a separate i18n instance for the dashboard that always uses English
  const dashboardI18n = i18n.cloneInstance({
    lng: 'en',
    fallbackLng: 'en',
  });

  return (
    <I18nextProvider i18n={dashboardI18n}>
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
    </I18nextProvider>
  );
};

export default DashboardLayout;
