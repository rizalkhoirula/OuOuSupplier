import React from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import useFetch from "../hooks/useFetch";
import Product from "../components/Product";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery();
  const keyword = query.get("keyword") || "";
  const category = query.get("category") || "";

  const {
    data: products,
    loading,
    error,
  } = useFetch(`/products/search?keyword=${keyword}&category=${category}`);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Results for "{keyword}"
        </Typography>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" align="center" sx={{ my: 5 }}>
            {error}
          </Typography>
        )}
        {products && products.length === 0 && (
          <Typography variant="h6" align="center" sx={{ my: 5 }}>
            No products found for "{keyword}"
          </Typography>
        )}
        {products && products.length > 0 && (
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={6} sm={4} md={4} lg={3}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default SearchPage;