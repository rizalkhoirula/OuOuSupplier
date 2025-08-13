import React from 'react';
import { Container, Typography } from '@mui/material';

const OrderListPage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Orders
      </Typography>
      {/* Order list content goes here */}
    </Container>
  );
};

export default OrderListPage;
