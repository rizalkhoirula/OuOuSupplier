import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoriteContext';
import { useAuth } from '../context/AuthContext';
import {
  Favorite,
  FavoriteBorder,
  AddShoppingCartOutlined as AddShoppingCartIcon,
} from '@mui/icons-material';
import getImageUrl from '../utils/getImageUrl';
import { useAnimation } from '../context/AnimationContext';
import { useTranslation } from 'react-i18next';

const Product = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart, cartItems } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { startAnimation } = useAnimation();
  const placeholderImage = '/images/sample.jpg';
  const productImage = product.photos && product.photos.length > 0 ? product.photos[0] : placeholderImage;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    const cardElement = e.currentTarget.closest('.MuiCard-root');
    if (isFavorite(product._id)) {
      removeFromFavorites(product._id);
    } else {
      startAnimation(cardElement, 'favorite-icon', getImageUrl(productImage));
      addToFavorites(product);
    }
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    const cardElement = e.currentTarget.closest('.MuiCard-root');
    startAnimation(cardElement, 'cart-icon', getImageUrl(productImage));
    addToCart(product);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: 3,
        height: '100%', // Ensure card fills the box
      }}
      component={Link}
      to={`/product/${product._id}`}
      className="product-card"
    >
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
        <CardMedia
          component="img"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
          image={getImageUrl(productImage)}
          alt={product.name}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.name}
        </Typography>
        <Rating value={product.rating} text={`${product.numReviews} ${t('reviews')}`} />
        <Typography variant="h6" color="text.primary" sx={{ mt: 1, fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          K {product.price.toLocaleString('en-US')}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: { xs: 0, sm: 1 }, mt: 'auto' }}>
        <Tooltip title={t('add_to_cart')} placement="top">
          <IconButton onClick={handleAddToCartClick} color="primary" sx={{ p: { xs: 1 } }}>
            <AddShoppingCartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={isFavorite(product._id) ? t('remove_from_favorites') : t('add_to_favorites')} placement="top">
          <IconButton onClick={handleFavoriteClick} color="primary" sx={{ p: { xs: 1 } }}>
            {isFavorite(product._id) ? <Favorite sx={{ color: 'red' }} fontSize="small" /> : <FavoriteBorder fontSize="small" />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Product;