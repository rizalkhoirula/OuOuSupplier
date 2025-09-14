import React from 'react';
import { useFavorites } from '../context/FavoriteContext';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Product from '../components/Product'; // Import the Product component
import { useTranslation } from 'react-i18next';

const FavoritesPage = () => {
  const { favoriteItems, loading } = useFavorites();
  const { t } = useTranslation();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        {t('my_wishlist')}
      </Typography>

      {favoriteItems.length === 0 ? (
        <Paper
          sx={{
            textAlign: 'center',
            p: { xs: 4, md: 8 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Box
            component="img"
            src="/images/empty-wishlist.svg" // Add an empty wishlist illustration
            alt="Empty Wishlist"
            sx={{ width: 240, mb: 3 }}
          />
          <Typography variant="h6">{t('your_wishlist_is_empty')}</Typography>
          <Typography color="text.secondary">
            {t('add_items_to_wishlist')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ mt: 2, borderRadius: '20px', px: 4 }}
          >
            {t('continue_shopping')}
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
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