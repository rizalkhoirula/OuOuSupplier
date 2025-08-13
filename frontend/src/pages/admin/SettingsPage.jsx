import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SettingsPage = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1">
        Here you can configure site-wide settings. This feature is under construction.
      </Typography>
    </Paper>
  );
};

export default SettingsPage;
