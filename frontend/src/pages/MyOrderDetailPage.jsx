import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Alert,
  CircularProgress,
  Grid,
  Divider,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import api from "../api";
import getImageUrl from "../utils/getImageUrl";
import {
  LocalShipping,
  CreditCard,
  Receipt,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const InfoCard = ({ title, icon, children, sx }) => (
  <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, width: "100%", ...sx }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
      {icon}
      <Typography variant="h6" component="h3" sx={{ ml: 1.5, fontWeight: "600" }}>
        {title}
      </Typography>
    </Box>
    <Divider />
    <Box sx={{ pt: 2 }}>{children}</Box>
  </Paper>
);

const MyOrderDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        setError(t('failed_to_fetch_order_details'));
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, t]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", py: { xs: 2, sm: 4 } }}>
      <Container maxWidth="xl">
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 3 }}>
          {t('order_details')}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Card 1: Items Ordered */}
          <InfoCard title={t('items_ordered')} icon={<Receipt color="primary" />}>
            <List sx={{ p: 0 }}>
              {order.orderItems.map((item, index) => (
                <React.Fragment key={item.product}>
                  <ListItem sx={{ p: 0, py: 1.5 }}>
                    <CardMedia
                      component="img"
                      image={getImageUrl(item.image)}
                      alt={item.name}
                      sx={{
                        width: { xs: 80, sm: 100 },
                        height: { xs: 80, sm: 100 },
                        borderRadius: 2,
                        mr: 2,
                      }}
                    />
                    <ListItemText
                      primary={
                        <Typography
                          component={RouterLink}
                          to={`/product/${item.product}`}
                          fontWeight="600"
                          sx={{ textDecoration: "none", color: "inherit" }}
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={`${t('quantity')}: ${item.qty}`}
                    />
                    <Typography variant="body1" fontWeight="600">
                      ${(item.qty * item.price).toFixed(2)}
                    </Typography>
                  </ListItem>
                  {index < order.orderItems.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </InfoCard>

          {/* Card 2: Shipping Address */}
          <InfoCard title={t('shipping_address')} icon={<LocalShipping color="primary" />}>
            <Typography variant="body1">
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </Typography>
            <Chip
              label={order.isDelivered ? `${t('delivered_on')} ${new Date(order.deliveredAt).toLocaleDateString()}` : t('in_transit')}
              color={order.isDelivered ? "success" : "info"}
              size="small"
              sx={{ mt: 1.5 }}
            />
          </InfoCard>

          {/* Card 3: Payment Information */}
          <InfoCard title={t('payment_information')} icon={<CreditCard color="primary" />}>
            <Typography variant="body1">
              <strong>{t('payment_method')}:</strong> {order.paymentMethod}
            </Typography>
            <Chip
              label={order.isPaid ? `${t('paid_on')} ${new Date(order.paidAt).toLocaleDateString()}` : t('not_paid')}
              color={order.isPaid ? "success" : "error"}
              size="small"
              sx={{ mt: 1.5 }}
            />
          </InfoCard>

          {/* Card 4: Order Summary */}
          <InfoCard title={t('order_summary')} icon={<Receipt color="primary" />}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>{t('order_id')}</Typography>
              <Typography>{order._id}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>{t('subtotal')}</Typography>
              <Typography>${order.itemsPrice.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>{t('shipping_fee')}</Typography>
              <Typography>${order.shippingPrice.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography>{t('tax')}</Typography>
              <Typography>${order.taxPrice.toFixed(2)}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                {t('total')}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                ${order.totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </InfoCard>
        </Box>
      </Container>
    </Box>
  );
};

export default MyOrderDetailPage;