import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';

const PaymentStatusPage = () => {
  // In a real application, you would get the payment status from the URL query parameters
  // For example: /payment-status?status=success
  const status = 'success'; // Placeholder

  return (
    <Container sx={{ py: 5 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        {status === 'success' ? (
          <CheckCircleOutline sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
        ) : (
          <ErrorOutline sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
        )}
        <Typography variant="h4" gutterBottom>
          {status === 'success' ? 'Payment Successful!' : 'Payment Failed'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {status === 'success'
            ? 'Thank you for your purchase. Your order is being processed.'
            : 'Unfortunately, your payment could not be processed. Please try again.'}
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentStatusPage;
