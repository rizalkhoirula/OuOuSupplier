import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: 'background.paper',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              OuOu
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your one-stop shop for the latest and greatest tech products.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="text.secondary" display="block" sx={{ mb: 1 }}>Home</Link>
            <Link component={RouterLink} to="/products" color="text.secondary" display="block" sx={{ mb: 1 }}>Products</Link>
            <Link component={RouterLink} to="/cart" color="text.secondary" display="block" sx={{ mb: 1 }}>Cart</Link>
            <Link component={RouterLink} to="/login" color="text.secondary" display="block">Login</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton component="a" href="https://facebook.com" target="_blank" color="inherit"><Facebook /></IconButton>
              <IconButton component="a" href="https://twitter.com" target="_blank" color="inherit"><Twitter /></IconButton>
              <IconButton component="a" href="https://instagram.com" target="_blank" color="inherit"><Instagram /></IconButton>
              <IconButton component="a" href="https://linkedin.com" target="_blank" color="inherit"><LinkedIn /></IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} pt={3} sx={{ borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            OuOuSupplier {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
