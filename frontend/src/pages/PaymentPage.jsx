import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Alert,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CloudUpload as CloudUploadIcon,
  AccountBalance as BankIcon,
  Receipt as ReceiptIcon,
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  ContentCopy as CopyIcon,
} from "@mui/icons-material";
import api from "../api";
import getImageUrl from "../utils/getImageUrl";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  overflow: "hidden",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  border: "1px solid #e3f2fd",
  backgroundColor: "#fafcff",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "0 4px 20px rgba(25, 118, 210, 0.15)",
  },
}));

const UploadBox = styled(Box)(({ theme }) => ({
  border: "2px dashed #e0e0e0",
  borderRadius: 12,
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: "#fafafa",
  "&:hover": {
    borderColor: "#1976d2",
    backgroundColor: "#f5f8ff",
  },
  "&.dragover": {
    borderColor: "#1976d2",
    backgroundColor: "#e3f2fd",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: "#fafafa",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
    },
  },
}));

const ProgressButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: "14px 28px",
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
  boxShadow: "0 4px 16px rgba(25, 118, 210, 0.3)",
  "&:hover": {
    background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
  },
  "&:disabled": {
    background: "#e0e0e0",
  },
}));

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [order, setOrder] = useState(state?.order || null);
  const [paymentDetails, setPaymentDetails] = useState({
    customerName: "",
    bankName: "",
    bankAccount: "",
    transactionId: "",
    proof: null,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!order) {
      const fetchOrder = async () => {
        try {
          const { data } = await api.get(`/orders/${orderId}`);
          setOrder(data);
        } catch (error) {
          console.error("Failed to fetch order details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    } else {
      setLoading(false);
    }
  }, [orderId, order]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentDetails((prev) => ({ ...prev, proof: file }));

      // Create image preview if it's an image file
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setPaymentDetails((prev) => ({ ...prev, proof: file }));

      // Create image preview if it's an image file
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("customerName", paymentDetails.customerName);
    formData.append("bankName", paymentDetails.bankName);
    formData.append("bankAccount", paymentDetails.bankAccount);
    formData.append("transactionId", paymentDetails.transactionId);
    formData.append("amount", order.totalPrice);
    formData.append("proof", paymentDetails.proof);

    try {
      const { data: updatedOrder } = await api.put(
        `/orders/${orderId}/pay`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log('Order data being sent to receipt page:', updatedOrder);

      navigate(`/order/${orderId}/receipt`, {
        state: { order: updatedOrder, paymentDetails },
      });
    } catch (error) {
      console.error("Failed to submit payment details:", error);
      alert("Failed to submit payment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={48} />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          Order not found. Please check your order ID and try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "#1a1a1a", mb: 2 }}
        >
          Complete Your Payment
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Please transfer the amount to our bank account and upload proof of
          payment to confirm your order.
        </Typography>
      </Box>

      {/* Order Summary at Top */}
      <StyledPaper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: "secondary.main", mr: 2, mb: { xs: 1, sm: 0 } }}>
            <ReceiptIcon />
          </Avatar>
          <Typography variant="h5" fontWeight={600}>
            Order Summary
          </Typography>
          <Box sx={{ ml: { sm: "auto" }, mt: { xs: 2, sm: 0 } }}>
            <Chip
              label={`Order #${order._id}`}
              variant="outlined"
              sx={{ 
                fontFamily: "monospace",
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                height: 'auto',
                '& .MuiChip-label': {
                  display: 'block',
                  whiteSpace: 'normal',
                  wordBreak: 'break-all',
                },
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {order.orderItems.map((item, index) => (
          <Box key={item.product} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {/* Product Image */}
              <Box
                component="img"
                src={getImageUrl(item.image) || "/api/placeholder/80/80"}
                alt={item.name}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  objectFit: "cover",
                  border: "1px solid #e0e0e0",
                }}
              />

              {/* Product Details */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight={500} gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.qty} × ${item.price.toFixed(2)}
                </Typography>
              </Box>

              {/* Price */}
              <Typography variant="h6" fontWeight={600}>
                ${(item.qty * item.price).toFixed(2)}
              </Typography>
            </Box>
            {index < order.orderItems.length - 1 && <Divider sx={{ mt: 3 }} />}
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Total Amount
          </Typography>
          <Typography variant="h4" fontWeight={700} color="primary.main">
            ${order.totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </StyledPaper>

      {/* Payment Form */}
      <StyledPaper sx={{ p: 4 }}>
        {/* Security Badge */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <SecurityIcon sx={{ color: "success.main", mr: 1 }} />
          <Typography variant="body2" color="success.main" fontWeight={600}>
            Secure Payment Process
          </Typography>
        </Box>

        {/* Bank Details Card */}
        <StyledCard sx={{ mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                <BankIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={600}>
                Transfer to Our Bank Account
              </Typography>
            </Box>

            <List dense>
              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary="Bank Name"
                  secondary="KBZ Bank"
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                  secondaryTypographyProps={{
                    variant: "body1",
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                />
                <Tooltip title="Copy bank name">
                  <IconButton
                    size="small"
                    onClick={() => copyToClipboard("KBZ Bank")}
                  >
                    <CopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>

              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary="Account Name"
                  secondary="OuOu Mobile"
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                  secondaryTypographyProps={{
                    variant: "body1",
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                />
                <Tooltip title="Copy account name">
                  <IconButton
                    size="small"
                    onClick={() => copyToClipboard("OuOu Mobile")}
                  >
                    <CopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>

              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary="Account Number"
                  secondary="123-456-7890"
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                  secondaryTypographyProps={{
                    variant: "body1",
                    fontWeight: 600,
                    color: "text.primary",
                    fontFamily: "monospace",
                  }}
                />
                <Tooltip title="Copy account number">
                  <IconButton
                    size="small"
                    onClick={() => copyToClipboard("123-456-7890")}
                  >
                    <CopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>

              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary="Amount to Transfer"
                  secondary={`${order.totalPrice.toFixed(2)}`}
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                  secondaryTypographyProps={{
                    variant: "h6",
                    fontWeight: 700,
                    color: "primary.main",
                    fontFamily: "monospace",
                  }}
                />
                <Tooltip title="Copy amount">
                  <IconButton
                    size="small"
                    onClick={() => copyToClipboard(order.totalPrice.toFixed(2))}
                  >
                    <CopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            </List>
          </CardContent>
        </StyledCard>

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
        <Box sx={{ maxWidth: 700, mx: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Payment Confirmation Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Your Full Name"
                name="customerName"
                value={paymentDetails.customerName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name as per bank account"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Your Bank Name"
                name="bankName"
                value={paymentDetails.bankName}
                onChange={handleInputChange}
                required
                placeholder="e.g., KBZ Bank, CB Bank"
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Your Bank Account Number"
                name="bankAccount"
                value={paymentDetails.bankAccount}
                onChange={handleInputChange}
                required
                placeholder="Enter your bank account number"
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Transaction ID"
                name="transactionId"
                value={paymentDetails.transactionId}
                onChange={handleInputChange}
                required
                placeholder="Enter the transaction ID from your receipt"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Upload Proof of Transfer *
              </Typography>

              <UploadBox
                className={dragOver ? "dragover" : ""}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById("file-upload").click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />

                {paymentDetails.proof ? (
                  <Box>
                    {imagePreview ? (
                      <Box sx={{ mb: 3 }}>
                        <Box
                          component="img"
                          src={imagePreview}
                          alt="Payment proof preview"
                          sx={{
                            width: "100%",
                            maxWidth: 400,
                            height: "auto",
                            maxHeight: 300,
                            borderRadius: 2,
                            border: "2px solid #4caf50",
                            objectFit: "contain",
                            mx: "auto",
                            display: "block",
                          }}
                        />
                      </Box>
                    ) : (
                      <Box sx={{ mb: 3 }}>
                        <Avatar
                          sx={{
                            bgcolor: "success.main",
                            width: 64,
                            height: 64,
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          <CheckIcon sx={{ fontSize: 32 }} />
                        </Avatar>
                      </Box>
                    )}

                    <Typography
                      variant="h6"
                      color="success.main"
                      fontWeight={600}
                      gutterBottom
                    >
                      File Selected Successfully
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {paymentDetails.proof.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      Size:{" "}
                      {(paymentDetails.proof.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>

                    <Box
                      sx={{ display: "flex", gap: 2, justifyContent: "center" }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPaymentDetails((prev) => ({
                            ...prev,
                            proof: null,
                          }));
                          setImagePreview(null);
                        }}
                      >
                        Remove File
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Change File
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <CloudUploadIcon
                      sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                    />
                    <Typography variant="h6" gutterBottom>
                      Drop your file here or click to browse
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Supports: JPG, PNG, PDF (Max 10MB)
                    </Typography>
                  </Box>
                )}
              </UploadBox>

              <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <InfoIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Please upload a clear screenshot or photo of your transfer
                    receipt showing the transaction details.
                  </Typography>
                </Box>
              </Alert>
            </Grid>
          </Grid>
          {/* Confirm Button at Bottom */}
          <Box sx={{ mt: 4 }}>
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              <Typography variant="body2" fontWeight={500}>
                Your order will be processed within 24 hours after payment
                confirmation.
              </Typography>
            </Alert>

            <ProgressButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={submitting}
              size="large"
            >
              {submitting ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Processing...
                </Box>
              ) : (
                "Confirm Payment & Continue"
              )}
            </ProgressButton>
          </Box>
          </Box>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default PaymentPage;
