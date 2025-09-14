import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Paper,
} from "@mui/material";
import Slider from "react-slick";
import useFetch from "../hooks/useFetch";
import CategoryRow from "../components/CategoryRow";
import { useTranslation } from "react-i18next";

// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  fade: true,
};

const sliderImages = (t) => [
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=80",
    alt: "Modern headphones on a clean background",
    title: t("experience_high_fidelity_sound"),
    subtitle: t("explore_latest_audio_devices"),
  },
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1920&q=80",
    alt: "Stylish smartwatch displaying time",
    title: t("smart_stylish_connected"),
    subtitle: t("stay_on_top_of_your_day"),
  },
  {
    src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1920&q=80",
    alt: "Vintage camera on a wooden surface",
    title: t("capture_every_moment"),
    subtitle: t("discover_cameras"),
  },
];

const HomePage = () => {
  const { t } = useTranslation();
  const { data: categories, loading, error } = useFetch("/categories");

  return (
    <>
      <Paper sx={{ mb: 4, overflow: "hidden" }}>
        <Slider {...sliderSettings}>
          {sliderImages(t).map((item, index) => (
            <Box key={index} sx={{ position: "relative", height: "60vh" }}>
              <Box
                component="img"
                src={item.src}
                alt={item.alt}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.6)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  textAlign: "center",
                  width: "80%",
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}
                >
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider>
      </Paper>

      <Container>
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {t('shop_by_category')}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 5 }}
          >
            {t('discover_products')}
          </Typography>
        </Box>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" align="center" sx={{ my: 5 }}>
            {t('error_fetching_data')}
          </Typography>
        )}

        <Box>
          {categories &&
            categories.map((category) => (
              <CategoryRow key={category._id} category={category} />
            ))}
        </Box>
      </Container>
    </>
  );
};

export default HomePage;