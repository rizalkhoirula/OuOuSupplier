import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, CircularProgress } from '@mui/material';
import Product from '../components/Product';
import useFetch from '../hooks/useFetch';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { data: products, loading, error } = useFetch('/products', {
    category: categoryName,
  });

  return (
    <Container>
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 3 }}>
        Go Back
      </Button>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textTransform: 'capitalize' }}>
        {categoryName}
      </Typography>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error" align="center">{error}</Typography>}
      {products && products.length > 0 ? (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        !loading && <Typography>No products found in this category.</Typography>
      )}
    </Container>
  );
};

export default CategoryPage;
