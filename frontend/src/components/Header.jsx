import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Badge,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
  Container,
  Divider,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Select,
  Avatar,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  Search as SearchIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
  FavoriteBorderOutlined as FavoriteIcon,
  AccountCircleOutlined as AccountCircleIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  ShoppingBag as ShoppingBagIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  Translate as TranslateIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoriteContext";
import useFetch from "../hooks/useFetch";
import getImageUrl from "../utils/getImageUrl";
import { useTranslation } from "react-i18next";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(2),
    width: "100%",
  },
}));

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { favoriteItems } = useFavorites();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: categories } = useFetch("/categories");

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleUserMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);
  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleMobileSearchToggle = () => setMobileSearchOpen(!mobileSearchOpen);

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      let searchUrl = `/search?keyword=${keyword.trim()}`;
      if (category !== "all") {
        searchUrl += `&category=${category}`;
      }
      navigate(searchUrl);
      if (isMobile) {
        setMobileSearchOpen(false);
      }
    }
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const renderUserMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleUserMenuClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={() => {
          handleUserMenuClose();
          navigate("/profile");
        }}
      >
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        {t('profile')}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleUserMenuClose();
          navigate("/myorders");
        }}
      >
        <ListItemIcon>
          <ShoppingBagIcon fontSize="small" />
        </ListItemIcon>
        {t('my_orders')}
      </MenuItem>
      {user?.role === "admin" && (
        <MenuItem
          onClick={() => {
            handleUserMenuClose();
            navigate("/dashboard");
          }}
        >
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          {t('dashboard')}
        </MenuItem>
      )}
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        {t('logout')}
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
    >
      <Box
        sx={{ width: 250, role: "presentation" }}
        onClick={handleMobileMenuToggle}
        onKeyDown={handleMobileMenuToggle}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
          }}
        >
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={() => changeLanguage(i18n.language === 'en' ? 'my' : 'en')}>
            <ListItemIcon>
              <TranslateIcon />
            </ListItemIcon>
            <ListItemText primary={i18n.language === 'en' ? 'မြန်မာ' : 'English'} />
          </ListItem>
          <ListItem button component={Link} to="/cart">
            <ListItemIcon>
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={t('cart')} />
          </ListItem>
          <ListItem button component={Link} to="/favorites">
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary={t('favorites')} />
          </ListItem>
          <Divider sx={{ my: 1 }} />
          <List>
            <ListItem>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={t('categories')} />
            </ListItem>
            {categories &&
              categories.map((category) => (
                <ListItem
                  button
                  key={category.name}
                  component={Link}
                  to={`/category/${category.name.toLowerCase()}`}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
          </List>
          <Divider sx={{ my: 1 }} />
          {user ? (
            <>
              <ListItem button component={Link} to="/profile">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={t('profile')} />
              </ListItem>
              <ListItem button component={Link} to="/myorders">
                <ListItemIcon>
                  <ShoppingBagIcon />
                </ListItemIcon>
                <ListItemText primary={t('my_orders')} />
              </ListItem>
              {user.role === "admin" && (
                <ListItem button component={Link} to="/dashboard">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('dashboard')} />
                </ListItem>
              )}
              <ListItem button onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={t('logout')} />
              </ListItem>
            </>
          ) : (
            <ListItem button component={Link} to="/login">
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={t('login')} />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );

  const desktopSearch = (
    <Paper
      component="form"
      onSubmit={handleSearchSubmit}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 600,
        borderRadius: "20px",
        border: "1px solid #e0e0e0",
        boxShadow: "none",
      }}
    >
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        variant="standard"
        disableUnderline
        sx={{
          m: "2px",
          "& .MuiSelect-select": {
            p: "8px 24px 8px 12px",
            color: "text.secondary",
          },
        }}
      >
        <MenuItem value="all">{t('all')}</MenuItem>
        {categories?.map((cat) => (
          <MenuItem key={cat._id} value={cat.name}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <StyledInputBase
        placeholder={t('search_products')}
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setKeyword(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );

  const mobileSearch = (
    <Container sx={{ py: 1 }}>
      <Paper
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "20px",
          border: "1px solid #e0e0e0",
          boxShadow: "none",
        }}
      >
        <StyledInputBase
          placeholder={t('search_products')}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Container>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ bgcolor: "background.paper", borderBottom: "1px solid #e0e0e0" }}
      >
        <Container>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
              }}
            >
              OuOu
            </Typography>

            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                {desktopSearch}
              </Box>
            )}

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isMobile && (
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleMobileSearchToggle}
                >
                  <SearchIcon />
                </IconButton>
              )}
              <Button
                id="language-icon"
                color="inherit"
                onClick={() => changeLanguage(i18n.language === 'en' ? 'my' : 'en')}
                startIcon={<TranslateIcon />}
              >
                {i18n.language === 'en' ? 'မြန်မာ' : 'English'}
              </Button>
              <IconButton
                id="cart-icon"
                component={Link}
                to="/cart"
                size="large"
                color="inherit"
              >
                <Badge badgeContent={cartItemCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                id="favorite-icon"
                component={Link}
                to="/favorites"
                size="large"
                color="inherit"
                sx={{ display: { xs: "none", md: "inline-flex" } }}
              >
                <Badge badgeContent={favoriteItems.length} color="primary">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
              {user ? (
                <IconButton
                  size="large"
                  edge="end"
                  onClick={handleUserMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    src={getImageUrl(user.avatar)}
                    alt={user.name}
                    sx={{ width: 32, height: 32 }}
                  >
                    {!user.avatar && <AccountCircleIcon />}
                  </Avatar>
                </IconButton>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="small"
                  sx={{ ml: 1, borderRadius: "20px", display: { xs: "none", md: "inline-flex" } }}
                >
                  {t('login')}
                </Button>
              )}
              {isMobile && (
                <IconButton
                  size="large"
                  edge="end"
  
                  color="inherit"
                  onClick={handleMobileMenuToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
        {mobileSearchOpen && isMobile && mobileSearch}
        {renderUserMenu}
        {renderMobileMenu}
        {!isMobile && (
          <Toolbar
            component="nav"
            variant="dense"
            sx={{
              justifyContent: "center",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            {categories &&
              categories.map((category) => (
                <Button
                  key={category.name}
                  component={Link}
                  to={`/category/${category.name.toLowerCase()}`}
                  sx={{ color: "text.primary", mx: 2, fontWeight: 400 }}
                >
                  {category.name}
                </Button>
              ))}
          </Toolbar>
        )}
      </AppBar>
    </>
  );
};

export default Header;