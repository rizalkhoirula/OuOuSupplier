import React from "react";
import { useCart } from "../context/CartContext";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Delete as DeleteIcon } from "@mui/icons-material";
import getImageUrl from "../utils/getImageUrl";

const CartPage = () => {
  // defensive default if useCart ever returns undefined
  const { cartItems = [], removeFromCart } = useCart() || {};

  // safe aggregations with fallbacks
  const totalQty = (cartItems || []).reduce(
    (acc, item) => acc + (item.qty ?? item.quantity ?? 1),
    0
  );

  const subtotal = (cartItems || []).reduce((acc, item) => {
    const qty = item.qty ?? item.quantity ?? 1;
    const price = Number(item.product?.price) || 0;
    return acc + qty * price;
  }, 0);

  // helper to build initials fallback
  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {!cartItems || cartItems.length === 0 ? (
        <Typography variant="subtitle1">
          Your cart is empty. <Link to="/">Go Shopping</Link>
        </Typography>
      ) : (
        <Box>
          <List>
            {cartItems.map((item) => {
              if (!item.product) return null; // Add a guard clause
              const id = item.product._id || item.product.id; // support either id field
              // only call getImageUrl when there's at least one photo
              const imageSrc =
                Array.isArray(item.product.photos) && item.product.photos.length > 0
                  ? getImageUrl(item.product.photos[0])
                  : undefined;

              const qty = item.qty ?? item.quantity ?? 1;
              const price = Number(item.product.price) || 0;

              return (
                <ListItem key={id || Math.random()} divider>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <ListItemAvatar>
                        <Avatar
                          src={imageSrc}
                          alt={item.product.name}
                          variant="rounded"
                          sx={{ width: 80, height: 80 }}
                        >
                          {/* show initials when no image */}
                          {!imageSrc && getInitials(item.product.name)}
                        </Avatar>
                      </ListItemAvatar>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <ListItemText
                        primary={
                          <Link
                            to={`/product/${id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {item.product.name}
                          </Link>
                        }
                        secondary={item.product.category?.name ?? ""}
                      />
                    </Grid>

                    <Grid item xs={6} sm={2}>
                      <Typography>${price.toFixed(2)}</Typography>
                    </Grid>

                    <Grid item xs={6} sm={2}>
                      <Typography>Qty: {qty}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeFromCart?.(id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>

          <Box sx={{ mt: 4, textAlign: "right" }}>
            <Typography variant="h5">
              Subtotal ({totalQty}) items: ${subtotal.toFixed(2)}
            </Typography>
            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Proceed to Checkout
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;
