import React from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import Product from '../components/Product';
import useFetch from '../hooks/useFetch';

const ProductPage = () => {
  const { data: products, loading, error } = useFetch('/products');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductPage;
