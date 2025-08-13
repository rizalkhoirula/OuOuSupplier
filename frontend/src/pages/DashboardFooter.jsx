import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const DashboardFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        mt: 'auto',
        textAlign: 'center'
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} OuOuSupplier Admin. All Rights Reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <Link color="inherit" href="#">
          Privacy Policy
        </Link>
        {' | '}
        <Link color="inherit" href="#">
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
};

export default DashboardFooter;