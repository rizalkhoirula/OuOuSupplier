import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import getImageUrl from '../utils/getImageUrl';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const MyOrdersPage = () => {
  const { user } = useAuth();
  const { data: orders, loading, error } = useFetch(`/orders/myorders`);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBuyAgain = async (orderItems) => {
    try {
      const productPromises = orderItems.map(item =>
        axios.get(`${process.env.REACT_APP_API_URL}/products/${item.product}`)
      );
      const productResponses = await Promise.all(productPromises);
      const products = productResponses.map(res => res.data);

      products.forEach((product, index) => {
        const orderItem = orderItems[index];
        if (product.stock > 0) {
          addToCart(product, orderItem.qty);
        }
      });

      navigate('/cart');
    } catch (err) {
      console.error("Failed to buy again", err);
      // You might want to show an error to the user
    }
  };

  const getOrderStatus = (order) => {
    const statusStyles = {
      mt: 1,
      fontSize: { xs: '0.75rem', sm: '0.875rem' }
    };

    if (order.isDelivered) {
      return (
        <Typography variant="body2" color="success.main" sx={statusStyles}>
          {t('delivered_on')} {new Date(order.deliveredAt).toLocaleDateString()}
        </Typography>
      );
    }
    if (order.isPaid) {
      return (
        <Typography variant="body2" color="primary.main" sx={statusStyles}>
          {t('processing')}
        </Typography>
      );
    }
    return (
      <Typography variant="body2" color="error.main" sx={statusStyles}>
        {t('awaiting_payment')}
      </Typography>
    );
  };

  return (
    <Box sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2, md: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '2rem' } }}>
        {t('my_orders')}
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : !orders || orders.length === 0 ? (
        <Alert severity="info">{t('you_have_no_orders_yet')}</Alert>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
          {orders.map((order) => (
            <Card key={order._id} sx={{ display: 'flex', width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  p: { xs: 1, sm: 2 },
                  gap: { xs: 1, sm: 2 },
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: 80, sm: 120 },
                    height: { xs: 80, sm: 120 },
                    objectFit: 'cover',
                    borderRadius: 1,
                    flexShrink: 0,
                  }}
                  image={getImageUrl(order.orderItems[0].image)}
                  alt={order.orderItems[0].name}
                />
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1.1rem' }, 
                      fontWeight: 'bold',
                      whiteSpace: 'normal',
                    }}
                  >
                    {order.orderItems[0].name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, mt: 0.5 }}>
                    {t('ordered_on')} {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                  {order.orderItems.length > 1 && (
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                      {t('more_items', { count: order.orderItems.length - 1 })}
                    </Typography>
                  )}
                  {getOrderStatus(order)}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: { xs: '100px', sm: '150px' },
                    gap: 2,
                  }}
                >
                  <Typography variant="h6" component="div" sx={{ fontSize: { xs: '0.875rem', sm: '1.25rem' } }}>
                    ${order.totalPrice.toFixed(2)}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                    <Button
                      component={RouterLink}
                      to={`/order/${order._id}`}
                      variant="contained"
                      size="small"
                    >
                      {t('details')}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleBuyAgain(order.orderItems)}
                    >
                      {t('buy_again')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MyOrdersPage;