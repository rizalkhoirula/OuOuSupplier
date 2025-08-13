import React from 'react';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import useFetch from '../hooks/useFetch';
import CategoryRow from '../components/CategoryRow';

const HomePage = () => {
  const { data: categories, loading, error } = useFetch('/categories');

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to OuOu
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 5 }}>
          Discover our curated collection of premium products.
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center" sx={{ my: 5 }}>
          {error}
        </Typography>
      )}

      <Box>
        {categories &&
          categories.map((category) => (
            <CategoryRow key={category._id} category={category} />
          ))}
      </Box>
    </Container>
  );
};

export default HomePage;
