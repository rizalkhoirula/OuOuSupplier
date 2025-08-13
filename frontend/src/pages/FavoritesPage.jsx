import React from 'react';
import { useFavorites } from '../context/FavoriteContext';
import { Container, Grid, Typography } from '@mui/material';
import Product from '../components/Product';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favoriteItems } = useFavorites();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Favorites</Typography>
      {favoriteItems.length === 0 ? (
        <Typography variant="subtitle1">
          You have no favorites yet. <Link to="/">Go Shopping</Link>
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {favoriteItems.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesPage;
