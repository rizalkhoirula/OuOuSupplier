import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Product from './Product';
import useFetch from '../hooks/useFetch';
import { ChevronRight } from '@mui/icons-material';

const CategoryRow = ({ category }) => {
  const { data: products, loading, error } = useFetch('/products', {
    category: category.name,
  });

  if (loading || error || !products || products.length === 0) {
    return null; // Don't render the row if there are no products or an error
  }

  return (
    <Box sx={{ my: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
          {category.name}
        </Typography>
        <Button
          component={Link}
          to={`/category/${category.name.toLowerCase()}`}
          endIcon={<ChevronRight />}
          variant="text"
        >
          See All
        </Button>
      </Box>
      <Grid container spacing={3}>
        {products.slice(0, 4).map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryRow;
