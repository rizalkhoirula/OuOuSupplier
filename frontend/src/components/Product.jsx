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

const Product = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  const placeholderImage = '/images/sample.jpg';
  const productImage = product.photos && product.photos.length > 0 ? product.photos[0] : placeholderImage;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    if (isFavorite(product._id)) {
      removeFromFavorites(product._id);
    } else {
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
    addToCart(product);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: 3,
      }}
      component={Link}
      to={`/product/${product._id}`}
    >
      <Box sx={{ position: 'relative', pt: '100%' }}>
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
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          gutterBottom
          variant="body1"
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
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <Typography variant="h6" color="text.primary" sx={{ mt: 1, fontWeight: 'bold' }}>
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 1, mt: 'auto' }}>
        <Tooltip title="Add to Cart" placement="top">
          <IconButton onClick={handleAddToCartClick} color="primary">
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={isFavorite(product._id) ? 'Remove from Favorites' : 'Add to Favorites'} placement="top">
          <IconButton onClick={handleFavoriteClick} color="primary">
            {isFavorite(product._id) ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Product;
