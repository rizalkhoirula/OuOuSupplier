import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  IconButton,
  Alert,
} from "@mui/material";
import { Add, Remove, AddShoppingCart } from "@mui/icons-material";
import Rating from "../components/Rating";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import getImageUrl from "../utils/getImageUrl";
import axios from "axios";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError("Product not found.");
      }
    };

    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}/reviews`);
        setReviews(data);
      } catch (err) {
        // Non-critical error, so we don't set a main error message
        console.error("Could not fetch reviews.");
      }
    };

    const fetchAll = async () => {
      await Promise.all([fetchProduct(), fetchReviews()]);
      setLoading(false);
    };

    fetchAll();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/products/${id}/reviews`,
        { rating, comment },
        { withCredentials: true }
      );

      // Refetch reviews and product data to show the new review and updated rating
      const newReviews = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}/reviews`);
      const updatedProduct = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
      setReviews(newReviews.data);
      setProduct(updatedProduct.data);

      setSubmitSuccess(true);
      setRating(0);
      setComment("");
    } catch (err) {
      setSubmitError(err.response?.data?.message || "An error occurred.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!product) {
    return <Typography align="center">Product not found</Typography>;
  }

  return (
    <Box>
      <Button component={RouterLink} to="/" variant="outlined" sx={{ mb: 3 }}>
        Go Back
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: 500,
              height: 500,
              maxWidth: "100%",
              borderRadius: 2,
              mb: 2,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={getImageUrl(product.photos[selectedImage])}
              alt={`${product.name} - main`}
            />
          </Box>
          <Grid container spacing={1}>
            {product.photos.map((photo, index) => (
              <Grid item xs={3} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "100%",
                    overflow: "hidden",
                    borderRadius: 2,
                    cursor: "pointer",
                    border:
                      selectedImage === index
                        ? "2px solid"
                        : "2px solid transparent",
                    borderColor: "primary.main",
                    backgroundColor: "#f0f0f0",
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <Box
                    component="img"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={getImageUrl(photo)}
                    alt={`${product.name} - thumb ${index + 1}`}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" color="primary" sx={{ my: 2 }}>
                ${product.price}
              </Typography>
              <Typography
                variant="body1"
                color={product.stock > 0 ? "success.main" : "error.main"}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary" paragraph>
                {product.description}
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Category"
                    secondary={product.category.name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Specifications"
                    secondary={product.spec}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Color" secondary={product.color} />
                </ListItem>
              </List>
              <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                <IconButton
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={product.stock === 0}
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ mx: 2 }}>{qty}</Typography>
                <IconButton
                  onClick={() =>
                    setQty(Math.min(product.stock, qty + 1))
                  }
                  disabled={product.stock === 0}
                >
                  <Add />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={<AddShoppingCart />}
                disabled={product.stock === 0}
                onClick={handleAddToCart}
                sx={{ mt: 2 }}
              >
                Add To Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        {reviews.length === 0 && <Alert severity="info">No Reviews</Alert>}
        <List>
          {reviews.map((review) => (
            <ListItem key={review._id} alignItems="flex-start">
              <ListItemText
                primary={review.name}
                secondary={
                  <>
                    <Rating value={review.rating} />
                    <Typography
                      sx={{ display: "block" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {review.comment}
                    </Typography>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Write a Customer Review
          </Typography>
          {user ? (
            <form onSubmit={handleReviewSubmit}>
              {submitError && <Alert severity="error">{submitError}</Alert>}
              {submitSuccess && (
                <Alert severity="success">Review submitted successfully!</Alert>
              )}
              <Box sx={{ my: 2 }}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </Box>
              <TextField
                label="Comment"
                multiline
                rows={4}
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          ) : (
            <Alert severity="info">
              Please <RouterLink to="/login">sign in</RouterLink> to write a review.
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;