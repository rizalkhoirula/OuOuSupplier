import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Stack,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SecurityIcon from "@mui/icons-material/Security";
import { useCart } from "../context/CartContext";
import api from "../api";
import getImageUrl from "../utils/getImageUrl";
import { useTranslation } from "react-i18next";

// Local data for Myanmar
const myanmarData = {
  "Ayeyarwady Region": ["Pathein", "Hinthada", "Kyaunggon"],
  "Bago Region": ["Bago", "Taungoo", "Thanatpin", "Pyay"],
  "Chin State": ["Hakha"],
  "Kachin State": ["Myitkyina", "Mogaung"],
  "Kayah State": ["Loikaw"],
  "Kayin State": ["Hpa-An", "Htison"],
  "Magway Region": ["Magway", "Pakokku", "Taungdwingyi"],
  "Mandalay Region": [
    "Mandalay",
    "Kyaukse",
    "Natogyi",
    "Amarapura",
    "Mahlaing",
    "Mogok",
  ],
  "Mon State": ["Mawlamyine", "Mudon", "Thaton"],
  "Naypyidaw Union Territory": ["Nay Pyi Taw", "Pyinmana"],
  "Rakhine State": [
    "Sittwe",
    "Maungdaw",
    "Minbya",
    "Myebon",
    "Thandwe",
    "Ponnagyun",
    "An",
  ],
  "Sagaing Region": ["Monywa", "Sagaing", "Shwebo", "Katha"],
  "Shan State": ["Taunggyi", "Lashio"],
  "Tanintharyi Region": ["Dawei"],
  "Yangon Region": ["Yangon", "Thingangyun"],
};

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "Yangon",
    postalCode: "",
    country: "Myanmar", // Country is locked
    state: "Yangon Region",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("Yangon Region");

  // Populate states from local data on component mount
  useEffect(() => {
    setStates(Object.keys(myanmarData));
  }, []);

  // Update cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      setCities(myanmarData[selectedState] || []);
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.product.price,
    0
  );

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));

    if (name === "state") {
      setSelectedState(value);
      // Reset city when state changes
      setShippingAddress((prev) => ({ ...prev, state: value, city: "" }));
    }
  };

  const placeOrderHandler = async () => {
    // Enhanced validation
    const { fullName, phoneNumber, address, state, city, postalCode } =
      shippingAddress;
    if (
      !fullName ||
      !phoneNumber ||
      !address ||
      !state ||
      !city ||
      !postalCode
    ) {
      alert(t("fill_shipping_fields"));
      return;
    }

    try {
      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        qty: item.qty,
        price: item.product.price,
        image: item.product.photos[0],
      }));

      const order = {
        orderItems,
        shippingAddress,
        itemsPrice: subtotal,
        totalPrice: subtotal,
      };

      const { data } = await api.post("/orders", order);
      clearCart();
      navigate(`/payment/${data._id}`, { state: { order: data } });
    } catch (error) {
      console.error("Failed to place order:", error);
      alert(t("failed_to_place_order"));
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f8f9fa",
        minHeight: "100vh",
        py: 4,
        "& .MuiGrid-container": {
          display: { xs: "block", md: "flex !important" },
          flexWrap: "nowrap !important",
        },
        "& .MuiGrid-item": {
          display: "block !important",
        },
        "& .MuiTextField-root": {
          width: "100% !important",
          display: "block !important",
        },
        "& .MuiOutlinedInput-root": {
          width: "100% !important",
          display: "flex !important",
          minHeight: "56px !important",
        },
        "& .MuiFormControl-root": {
          width: "100% !important",
          display: "block !important",
        },
        "& .MuiSelect-root": {
          width: "100% !important",
          display: "flex !important",
        },
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#1a1a1a",
              mb: 1,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            {t("checkout")}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <SecurityIcon sx={{ color: "success.main" }} />
            {t("secure_transaction")}
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          sx={{
            maxWidth: "1400px",
            mx: "auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
            minHeight: { md: "80vh" },
          }}
        >
          {/* Left Column - Shipping & Payment in Single Container */}
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "58.333333%" },
              maxWidth: { xs: "100%", md: "58.333333%" },
              flex: { md: "0 0 58.333333%" },
              gap: 3,
            }}
          >
            {/* Shipping Address Card */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #e0e0e0",
                bgcolor: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                width: "100%",
              }}
            >
              {/* Shipping Address Section */}
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: "primary.main",
                      mr: 2,
                    }}
                  >
                    <LocalShippingIcon sx={{ color: "white", fontSize: 20 }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "#1a1a1a" }}
                  >
                    {t("shipping_information")}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    "& > *": {
                      width: "100% !important",
                      minWidth: "100% !important",
                      maxWidth: "100% !important",
                    },
                  }}
                >
                  {/* Row 1: Name + Phone */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      flexDirection: { xs: "column", sm: "row" },
                      width: "100%",
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <TextField
                        variant="outlined"
                        label={t("full_name")}
                        name="fullName"
                        fullWidth
                        required
                        onChange={handleShippingChange}
                        value={shippingAddress.fullName}
                        InputProps={{
                          style: {
                            height: "56px",
                            width: "100%",
                            fontSize: "16px",
                            borderRadius: "8px",
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: "16px" },
                        }}
                        sx={{
                          width: "100% !important",
                          minWidth: "100% !important",
                          "& .MuiOutlinedInput-root": {
                            height: "56px !important",
                            width: "100% !important",
                            minWidth: "100% !important",
                            borderRadius: "8px !important",
                            "&:hover fieldset": {
                              borderColor: "primary.main",
                            },
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <TextField
                        variant="outlined"
                        label={t("phone_number")}
                        name="phoneNumber"
                        fullWidth
                        required
                        onChange={handleShippingChange}
                        value={shippingAddress.phoneNumber}
                        InputProps={{
                          style: {
                            height: "56px",
                            width: "100%",
                            fontSize: "16px",
                            borderRadius: "8px",
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: "16px" },
                        }}
                        sx={{
                          width: "100% !important",
                          minWidth: "100% !important",
                          "& .MuiOutlinedInput-root": {
                            height: "56px !important",
                            width: "100% !important",
                            minWidth: "100% !important",
                            borderRadius: "8px !important",
                            "&:hover fieldset": {
                              borderColor: "primary.main",
                            },
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Row 2: Street Address */}
                  <Box sx={{ width: "100%" }}>
                    <TextField
                      variant="outlined"
                      label={t("street_address")}
                      name="address"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      onChange={handleShippingChange}
                      value={shippingAddress.address}
                      InputProps={{
                        style: {
                          width: "100%",
                          fontSize: "16px",
                          borderRadius: "8px",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: "16px" },
                      }}
                      sx={{
                        width: "100% !important",
                        minWidth: "100% !important",
                        "& .MuiOutlinedInput-root": {
                          width: "100% !important",
                          minWidth: "100% !important",
                          borderRadius: "8px !important",
                          "&:hover fieldset": {
                            borderColor: "primary.main",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Row 3: Country + State + City */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      flexDirection: { xs: "column", sm: "row" },
                      width: "100%",
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <TextField
                        variant="outlined"
                        label={t("country")}
                        name="country"
                        fullWidth
                        value="Myanmar"
                        disabled
                        InputProps={{
                          style: {
                            height: "56px",
                            width: "100%",
                            fontSize: "16px",
                            borderRadius: "8px",
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: "16px" },
                        }}
                        sx={{
                          width: "100% !important",
                          minWidth: "100% !important",
                          "& .MuiOutlinedInput-root": {
                            height: "56px !important",
                            width: "100% !important",
                            minWidth: "100% !important",
                            borderRadius: "8px !important",
                            backgroundColor: "#f5f5f5 !important",
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ width: "100% !important" }}
                      >
                        <InputLabel sx={{ fontSize: "16px" }}>
                          {t("state_province")}
                        </InputLabel>
                        <Select
                          name="state"
                          value={selectedState}
                          onChange={handleShippingChange}
                          label={t("state_province")}
                          sx={{
                            height: "56px !important",
                            width: "100% !important",
                            minWidth: "100% !important",
                            borderRadius: "8px !important",
                            fontSize: "16px",
                            "& .MuiSelect-select": {
                              height: "56px !important",
                              display: "flex !important",
                              alignItems: "center !important",
                              fontSize: "16px",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "primary.main",
                            },
                          }}
                        >
                          {states.map((state) => (
                            <MenuItem
                              key={state}
                              value={state}
                              sx={{ fontSize: "16px" }}
                            >
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ width: "100% !important" }}
                      >
                        <InputLabel sx={{ fontSize: "16px" }}>{t("city")}</InputLabel>
                        <Select
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleShippingChange}
                          label={t("city")}
                          disabled={!selectedState}
                          sx={{
                            height: "56px !important",
                            width: "100% !important",
                            minWidth: "100% !important",
                            borderRadius: "8px !important",
                            fontSize: "16px",
                            "& .MuiSelect-select": {
                              height: "56px !important",
                              display: "flex !important",
                              alignItems: "center !important",
                              fontSize: "16px",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "primary.main",
                            },
                          }}
                        >
                          {cities.length > 0 ? (
                            cities.map((city) => (
                              <MenuItem
                                key={city}
                                value={city}
                                sx={{ fontSize: "16px" }}
                              >
                                {city}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled sx={{ fontSize: "16px" }}>
                              {t("select_a_state_first")}
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  {/* Row 4: Postal Code */}
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ width: { xs: "100%", sm: "50%" }, minWidth: 0 }}>
                      <TextField
                        variant="outlined"
                        label={t("postal_code")}
                        name="postalCode"
                        fullWidth
                        required
                        onChange={handleShippingChange}
                        value={shippingAddress.postalCode}
                        InputProps={{
                          style: {
                            height: "56px",
                            width: "100%",
                            fontSize: "16px",
                            borderRadius: "8px",
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: "16px" },
                        }}
                        sx={{
                          width: "100% !important",
                          minWidth: "100% !important",
                          "& .MuiOutlinedInput-root": {
                            height: "56px !important",
                            width: "100% !important",
                            minWidth: "100% !important",
                            borderRadius: "8px !important",
                            "&:hover fieldset": {
                              borderColor: "primary.main",
                            },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Payment Method Card */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #e0e0e0",
                bgcolor: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                width: "100%",
              }}
            >
              {/* Payment Method Section */}
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: "success.main",
                      mr: 2,
                    }}
                  >
                    <CreditCardIcon sx={{ color: "white", fontSize: 20 }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "#1a1a1a" }}
                  >
                    {t("payment_method")}
                  </Typography>
                </Box>

                <RadioGroup defaultValue="bank-transfer">
                  <Box
                    sx={{
                      border: "2px solid #e3f2fd",
                      borderRadius: 3,
                      p: 4,
                      bgcolor: "#f8f9ff",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: "#f0f4ff",
                      },
                    }}
                  >
                    <FormControlLabel
                      value="bank-transfer"
                      control={<Radio sx={{ color: "primary.main" }} />}
                      label={
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 1, fontSize: "18px" }}
                          >
                            {t("bank_transfer")}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ lineHeight: 1.6, fontSize: "14px" }}
                          >
                            {t("bank_transfer_description")}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </RadioGroup>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "41.666667%" },
              maxWidth: { xs: "100%", md: "41.666667%" },
              flex: { md: "0 0 41.666667%" },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid #e0e0e0",
                bgcolor: "white",
                position: { md: "sticky" },
                top: { md: 20 },
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                height: { md: "fit-content" },
                width: "100%",
              }}
            >
              {/* Header */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: "warning.main",
                    mr: 2,
                  }}
                >
                  <ShoppingCartIcon sx={{ color: "white", fontSize: 20 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#1a1a1a" }}
                >
                  {t("order_summary")}
                </Typography>
              </Box>

              {/* Cart Items */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    textTransform: "uppercase",
                    fontWeight: 600,
                    letterSpacing: 1,
                  }}
                >
                  {cartItems.length} {cartItems.length === 1 ? t("item") : t("items")}
                </Typography>

                <Box sx={{ maxHeight: 320, overflowY: "auto", pr: 1 }}>
                  {cartItems.map((item, index) => (
                    <React.Fragment key={item.product._id}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", py: 2 }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid #e0e0e0",
                            mr: 3,
                          }}
                        >
                          <img
                            src={getImageUrl(item.product.photos[0])}
                            alt={item.product.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.product.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {t("quantity")}: {item.qty}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "primary.main" }}
                          >
                            ${(item.qty * item.product.price).toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                      {index < cartItems.length - 1 && (
                        <Divider sx={{ my: 1 }} />
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Order Totals */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {t("subtotal")}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {t("shipping")}
                  </Typography>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: "success.main" }}
                    >
                      {t("free").toUpperCase()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t("standard_delivery")}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {t("total")}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              {/* Place Order Button */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={placeOrderHandler}
                sx={{
                  py: 2,
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  borderRadius: 3,
                  textTransform: "none",
                  boxShadow: "0 4px 16px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {t("complete_order")}
              </Button>

              {/* Security Badge */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 3,
                  gap: 1,
                }}
              >
                <SecurityIcon sx={{ fontSize: 16, color: "success.main" }} />
                <Typography variant="caption" color="text.secondary">
                  {t("secure_checkout")}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
