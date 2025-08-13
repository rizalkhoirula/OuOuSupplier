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
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Alert,
  Icon,
} from "@mui/material";
import { Download, CheckCircleOutline, ShoppingBag } from "@mui/icons-material";
import getImageUrl from "../utils/getImageUrl";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReceiptPage = () => {
  const { state } = useLocation();
  const { orderId } = useParams();
  const { order } = state || {};
  const receiptRef = useRef(null);

  const handleDownloadPdf = () => {
    const input = receiptRef.current;
    if (!input) {
      console.error("Receipt component not found.");
      return;
    }

    // Use html2canvas to capture the receipt component
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      
      // Create a PDF document
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      
      let imgWidth = pdfWidth - 20; // with some margin
      let imgHeight = imgWidth / ratio;

      // if the image is too high, scale it down to fit the page
      if (imgHeight > pdfHeight - 20) {
        imgHeight = pdfHeight - 20;
        imgWidth = imgHeight * ratio;
      }

      const x = (pdfWidth - imgWidth) / 2;
      const y = 10; // top margin

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(`Receipt-Order-${orderId}.pdf`);
    });
  };

  if (!order) {
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Order not found. Please check your order history.
        </Alert>
        <Button component={Link} to="/myorders" variant="contained">
          Go to My Orders
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          mb: 4,
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Icon sx={{ fontSize: 60, color: "success.main" }}>
          <CheckCircleOutline fontSize="inherit" />
        </Icon>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mt: 2 }}>
          Thank You for Your Order!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your order has been placed successfully. You can download your receipt
          below.
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleDownloadPdf}
          startIcon={<Download />}
          sx={{ fontWeight: "bold" }}
        >
          Download PDF
        </Button>
      </Box>

      {/* The Receipt Component to be captured */}
      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <div ref={receiptRef} style={{ padding: "2rem", background: "white" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
              Receipt
            </Typography>
            <ShoppingBag sx={{ fontSize: 40, color: "primary.main" }} />
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Grid container justifyContent="space-between" mb={3}>
            <Grid item>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Order ID
              </Typography>
              <Typography>#{orderId}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Date
              </Typography>
              <Typography>
                {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" mb={4}>
            <Grid item>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Billed To
              </Typography>
              <Typography>{order.shippingAddress.fullName}</Typography>
              <Typography>{order.shippingAddress.address}</Typography>
              <Typography>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </Typography>
              <Typography>{order.shippingAddress.country}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Items Ordered
          </Typography>
          <List disablePadding>
            {order.orderItems.map((item) => (
              <ListItem key={item.product} disableGutters>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.qty}`}
                />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  ${(item.qty * item.price).toFixed(2)}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ width: "100%", maxWidth: 300 }}>
              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>${order.itemsPrice}</Typography>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography>Shipping</Typography>
                <Typography>${order.shippingPrice}</Typography>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography>Tax</Typography>
                <Typography>${order.taxPrice}</Typography>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container justifyContent="space-between">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ${order.totalPrice}
                </Typography>
              </Grid>
            </Box>
          </Box>
        </div>
      </Paper>
    </Container>
  );
};

export default ReceiptPage;
