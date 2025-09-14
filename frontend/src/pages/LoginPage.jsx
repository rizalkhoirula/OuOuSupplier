import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Grid,
  Alert,
  Divider,
  IconButton,
} from "@mui/material";
import { Google as GoogleIcon, Facebook as FacebookIcon } from "@mui/icons-material";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || t("failed_to_login"));
    }
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '80vh', py: 8 }}>
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              p: 6,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
              <StorefrontOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              {t("welcome_back")}
            </Typography>
            <Typography color="text.secondary">
              {t("sign_in_to_continue")}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("email_address")}
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("password")}
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
              >
                {t("sign_in")}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" variant="body2">
                    {t("forgot_password")}
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {t("dont_have_account")}
                  </Link>
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }}>{t("or")}</Divider>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton aria-label="login with google" sx={{ color: '#db4437' }}>
                  <GoogleIcon />
                </IconButton>
                <IconButton aria-label="login with facebook" sx={{ color: '#3b5998' }}>
                  <FacebookIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
