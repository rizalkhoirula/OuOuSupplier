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
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          py: 2,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {products &&
          products.map((product) => (
            <Box
              key={product._id}
              sx={{
                width: { xs: "150px", sm: "180px", md: "200px" },
                flex: "0 0 auto",
              }}
            >
              <Product product={product} />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default CategoryRow;
