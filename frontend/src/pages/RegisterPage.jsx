import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import axios from "axios";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError(t("passwords_do_not_match"));
      return;
    }

    try {
      await axios.post("/api/users/register", { name, email, password });
      setSuccess(t("registration_successful"));
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || t("failed_to_register"));
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
              <PersonAddOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              {t("create_account")}
            </Typography>
            <Typography color="text.secondary">
              {t("join_ouou_today")}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{success}</Alert>}
              <TextField
                margin="normal"
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label={t("full_name")}
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("email_address")}
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label={t("confirm_password")}
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
              >
                {t("sign_up")}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    {t("already_have_account")}
                  </Link>
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }}>{t("or")}</Divider>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton aria-label="signup with google" sx={{ color: '#db4437' }}>
                  <GoogleIcon />
                </IconButton>
                <IconButton aria-label="signup with facebook" sx={{ color: '#3b5998' }}>
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

export default RegisterPage;