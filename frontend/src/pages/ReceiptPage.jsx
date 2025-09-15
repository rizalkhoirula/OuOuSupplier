import React, { useRef } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
  Button,
  List,
  Chip,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Alert,
  Icon,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  Download,
  CheckCircleOutline,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import getImageUrl from "../utils/getImageUrl";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";

const ReceiptPage = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { orderId } = useParams();
  const { order, paymentDetails } = state || {};
  const receiptRef = useRef(null);

  const handleDownloadPdf = () => {
    const input = receiptRef.current;
    if (!input) {
      console.error("Receipt component not found.");
      return;
    }

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const imgWidth = pdfWidth;
      const imgHeight = imgWidth / ratio;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`OuOu-Receipt-Order-${orderId}.pdf`);
    });
  };

  if (!order) {
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <Alert severity="error" sx={{ mb: 3, justifyContent: "center" }}>
          {t('order_details_not_found')}
        </Alert>
        <Button component={Link} to="/myorders" variant="contained">
          {t('go_to_my_orders')}
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5, fontFamily: "'Roboto', sans-serif" }}>
      <Paper
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          mb: 4,
          textAlign: "center",
          backgroundColor: "primary.main",
          color: "#fff",
        }}
      >
        <CheckCircleOutline sx={{ fontSize: 60, mb: 1 }} />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          {t('payment_submitted_successfully')}
        </Typography>
        <Typography variant="body1">
          {t('order_processing_message')}
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleDownloadPdf}
          startIcon={<Download />}
          sx={{ fontWeight: "bold", borderRadius: 2 }}
        >
          {t('download_receipt')}
        </Button>
      </Box>

      {/* The Receipt Component to be captured */}
      <Paper
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #eee",
        }}
      >
        <div ref={receiptRef} style={{ padding: "2.5rem", background: "white" }}>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={4}
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                OuOu Supplier
              </Typography>
              <Typography color="text.secondary">
                123 Yangon City, Yangon Province, Myanmar
              </Typography>
              <Typography color="text.secondary">
                contact@ouousupplier.com
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "text.secondary" }}
            >
              {t('receipt')}
            </Typography>
          </Box>

          {/* Order Info */}
          <Grid container justifyContent="space-between" mb={4}>
            <Grid item xs={12} sm={5}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                {t('billed_to')}
              </Typography>
              <Typography>{order.shippingAddress.fullName}</Typography>
              <Typography>{order.shippingAddress.address}</Typography>
              <Typography>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </Typography>
              <Typography>{order.shippingAddress.country}</Typography>
            </Grid>
            <Grid item xs={12} sm={5} sx={{ textAlign: { sm: "right" } }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                {t('order_details')}
              </Typography>
              <Typography>
                <strong>{t('order_id')}:</strong> #{orderId}
              </Typography>
              <Typography>
                <strong>{t('date')}:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
              <Box display="flex" justifyContent={{ sm: "flex-end" }} mt={0.5}>
                <Chip
                  label={t(order.paymentStatus) || t('pending')}
                  color={
                    order.paymentStatus === "paid"
                      ? "success"
                      : order.paymentStatus === "processing"
                      ? "info"
                      : "warning"
                  }
                  size="small"
                />
              </Box>
            </Grid>
          </Grid>

          {/* Items Table */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            {t('order_summary')}
          </Typography>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ borderRadius: 2, mb: 4 }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#f9f9f9" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>{t('item')}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {t('qty')}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    {t('price')}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    {t('total')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.orderItems.map((item) => (
                  <TableRow key={item.product}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="center">{item.qty}</TableCell>
                    <TableCell align="right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ${(item.qty * item.price).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Totals */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ width: "100%", maxWidth: 280 }}>
              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography color="text.secondary">{t('subtotal')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  ${order.itemsPrice.toFixed(2)}
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography color="text.secondary">{t('shipping')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  ${order.shippingPrice.toFixed(2)}
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography color="text.secondary">{t('tax')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  ${order.taxPrice.toFixed(2)}
                </Typography>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container justifyContent="space-between">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {t('grand_total')}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ${order.totalPrice.toFixed(2)}
                </Typography>
              </Grid>
            </Box>
          </Box>

          {/* Footer */}
          <Box sx={{ textAlign: "center", mt: 5, pt: 3, borderTop: "1px solid #eee" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {t('thank_you_for_your_purchase')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              OuOu Supplier | www.ouousupplier.com
            </Typography>
          </Box>
        </div>
      </Paper>
    </Container>
  );
};

export default ReceiptPage;