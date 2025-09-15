import React from "react";
import { useCart } from "../context/CartContext";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteOutline,
  Add,
  Remove,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import getImageUrl from "../utils/getImageUrl";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartQty } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { t } = useTranslation();

  const handleQuantityChange = (productId, qty) => {
    const newQty = Math.max(1, qty); // Ensure quantity is at least 1
    updateCartQty(productId, newQty);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.product.price,
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const OrderSummary = () => (
    <Paper
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        position: { lg: "sticky" },
        top: { lg: 80 },
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        {t("order_summary")}
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography color="text.secondary">
          {t("subtotal")} ({totalItems} {t("items")})
        </Typography>
        <Typography sx={{ fontWeight: "medium" }}>
          K {subtotal.toLocaleString('en-US')}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography color="text.secondary">{t("shipping")}</Typography>
        <Typography sx={{ fontWeight: "medium" }}>{t("free")}</Typography>
      </Box>
      <Divider />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 2, mb: 3 }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {t("total")}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          K {subtotal.toLocaleString('en-US')}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        startIcon={<ShoppingCartCheckout />}
        onClick={() => navigate("/checkout")}
        sx={{ borderRadius: "20px", py: 1.5 }}
      >
        {t("proceed_to_checkout")}
      </Button>
    </Paper>
  );

  const MobileCheckoutBar = () => (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1100,
      }}
    >
      <Box>
        <Typography color="text.secondary">{t("total")}</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          K {subtotal.toLocaleString('en-US')}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate("/checkout")}
        sx={{ borderRadius: "20px", px: 4 }}
      >
        {t("checkout")}
      </Button>
    </Paper>
  );

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Container sx={{ py: 5, pb: { xs: 15, lg: 5 } }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          {t("shopping_cart")}
        </Typography>

        {cartItems.length === 0 ? (
          <Paper
            sx={{
              textAlign: "center",
              p: { xs: 4, md: 8 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography variant="h6">{t("your_cart_is_empty")}</Typography>
            <Typography color="text.secondary">
              {t("looks_like_you_havent_added_anything")}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/"
              sx={{ mt: 2, borderRadius: "20px", px: 4 }}
            >
              {t("start_shopping")}
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              {cartItems.map((item) => (
                <Card
                  key={item.product._id}
                  sx={{ display: "flex", mb: 3, borderRadius: 4 }}
                >
                  <CardMedia
                    component="img"
                    image={getImageUrl(item.product.photos[0])}
                    alt={item.product.name}
                    sx={{ width: { xs: 100, sm: 150 }, objectFit: "cover" }}
                  />
                  <Grid container sx={{ flex: 1, p: { xs: 1, sm: 0 } }}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography
                          component={Link}
                          to={`/product/${item.product._id}`}
                          variant="subtitle1"
                          sx={{
                            textDecoration: "none",
                            color: "inherit",
                            fontWeight: 600,
                            "&:hover": { color: "primary.main" },
                          }}
                        >
                          {item.product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                          {t("in_stock")}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      sm={4}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: 'flex-start', sm: 'center' },
                        pl: { xs: 2, sm: 0 }
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(item.product._id, item.qty - 1)
                          }
                        >
                          <Remove />
                        </IconButton>
                        <Typography sx={{ px: { xs: 1, sm: 2 }, fontWeight: "bold" }}>
                          {item.qty}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(item.product._id, item.qty + 1)
                          }
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      sm={2}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        p: { xs: 1, sm: 2 },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", fontSize: { xs: '0.875rem', sm: '1rem' } }}
                      >
                        K {(item.product.price * item.qty).toLocaleString('en-US')}
                      </Typography>
                      <IconButton
                        aria-label="delete"
                        onClick={() => removeFromCart(item.product._id)}
                        color="error"
                        size="small"
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Grid>

            {!isMobile && (
              <Grid item lg={4}>
                <OrderSummary />
              </Grid>
            )}
          </Grid>
        )}
      </Container>
      {isMobile && cartItems.length > 0 && <MobileCheckoutBar />}
    </Box>
  );
};

export default CartPage;
