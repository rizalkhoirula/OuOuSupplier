import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api";
import getImageUrl from "../utils/getImageUrl";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
  InputAdornment,
} from "@mui/material";
import {
  LocalShipping,
  Payment,
  Person,
  Home,
  LocationCity,
  Public,
  MarkunreadMailbox,
} from "@mui/icons-material";

const CardContainer = ({ icon, title, children }) => (
  <Paper
    sx={{
      p: 4,
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      mb: 4,
    }}
  >
    <Typography
      variant="h6"
      gutterBottom
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
        mb: 3,
      }}
    >
      {icon}
      {title}
    </Typography>
    {children}
  </Paper>
);

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * (item.product?.price || 0),
    0
  );
  const shippingPrice = subtotal > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = taxRate * subtotal;
  const totalPrice = subtotal + shippingPrice + taxPrice;

  const handleShippingChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderItems = cartItems.map((item) => ({
        name: item.product.name,
        qty: item.qty,
        image: item.product.photos[0],
        price: item.product.price,
        product: item.product._id,
      }));

      const { data: createdOrder } = await api.post("/orders", {
        orderItems,
        shippingAddress,
        paymentMethod: "Octaverse",
        itemsPrice: subtotal.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
      });

      const { data: paymentData } = await api.post("/payment/initiate", {
        orderId: createdOrder._id,
      });

      // Redirect to Octoverse payment page with itoken param
      window.location.href = `${paymentData.paymentGatewayUrl}?itoken=${paymentData.token}`;

      clearCart();
    } catch (error) {
      console.error("Failed to create order or initiate payment:", error);
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 5,
          textAlign: "center",
          letterSpacing: 0.5,
        }}
      >
        Secure Checkout
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={8}>
            <CardContainer
              icon={<LocalShipping sx={{ mr: 1, color: "primary.main" }} />}
              title="Shipping Information"
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="fullName"
                    label="Full Name"
                    value={shippingAddress.fullName}
                    onChange={handleShippingChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="address"
                    label="Address Line"
                    value={shippingAddress.address}
                    onChange={handleShippingChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Home />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    name="city"
                    label="City"
                    value={shippingAddress.city}
                    onChange={handleShippingChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCity />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    name="postalCode"
                    label="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={handleShippingChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MarkunreadMailbox />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="country"
                    label="Country"
                    value={shippingAddress.country}
                    onChange={handleShippingChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Public />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContainer>

            <CardContainer
              icon={<Payment sx={{ mr: 1, color: "primary.main" }} />}
              title="Payment Method"
            >
              <Typography>
                You will be redirected to Octoverse to complete your payment.
              </Typography>
            </CardContainer>

            <CardContainer title="Order Summary">
              <List disablePadding>
                {cartItems.map((item) => (
                  <ListItem
                    key={item.product._id}
                    sx={{
                      py: 1,
                      px: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={getImageUrl(item.product.photos[0])}
                        alt={item.product.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.product.name}
                      secondary={`Qty: ${item.qty}`}
                    />
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      ${(item.qty * item.product.price).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary">Shipping</Typography>
                <Typography>${shippingPrice.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography color="text.secondary">Tax (15%)</Typography>
                <Typography>${taxPrice.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  mt: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                disabled={cartItems.length === 0}
              >
                Proceed to Payment
              </Button>
            </CardContainer>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CheckoutPage;
