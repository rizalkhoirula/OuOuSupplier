import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Chip,
  Alert,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  Grid,
  Divider,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../api";
import getImageUrl from "../utils/getImageUrl";

const OrderRow = ({ order }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order._id}
        </TableCell>
        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
        <TableCell align="right">${order.totalPrice.toFixed(2)}</TableCell>
        <TableCell align="center">
          <Chip
            label={order.isPaid ? "Paid" : "Not Paid"}
            color={order.isPaid ? "success" : "error"}
            size="small"
          />
        </TableCell>
        <TableCell align="center">
          <Chip
            label={order.isDelivered ? "Delivered" : "Processing"}
            color={order.isDelivered ? "success" : "info"}
            size="small"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, p: 2, backgroundColor: "#fafafa", borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Shipping Address</Typography>
                  <Typography>{order.shippingAddress.fullName}</Typography>
                  <Typography>{order.shippingAddress.address}</Typography>
                  <Typography>
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </Typography>
                  <Typography>{order.shippingAddress.country}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Payment Method</Typography>
                  <Typography>{order.paymentMethod}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Items</Typography>
              <List>
                {order.orderItems.map((item) => (
                  <ListItem key={item.product}>
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={getImageUrl(item.image)}
                        alt={item.name}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Link to={`/product/${item.product}`}>{item.name}</Link>}
                      secondary={`Qty: ${item.qty}`}
                    />
                    <Typography>
                      ${(item.qty * item.price).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/myorders");
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        My Orders
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : orders.length === 0 ? (
        <Alert severity="info">
          You have no orders yet. <Link to="/">Start Shopping!</Link>
        </Alert>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>Total</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Paid</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Delivered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <OrderRow key={order._id} order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default MyOrdersPage;