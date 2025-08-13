import React, { useState } from 'react';
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
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Search as SearchIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
  FavoriteBorderOutlined as FavoriteIcon,
  AccountCircleOutlined as AccountCircleIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const Header = () => {
  const { user, logout } = useAuth();
  const { data: categories } = useFetch('/categories');
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: `1px solid #e0e0e0` }}>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
          >
            OuOu
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search for products…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <IconButton component={Link} to="/cart" size="large" color="inherit">
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton component={Link} to="/favorites" size="large" color="inherit">
              <FavoriteIcon />
            </IconButton>
            {user ? (
              <>
                <IconButton size="large" onClick={handleMenu} color="inherit">
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      overflow: 'visible',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                >
                  <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>Profile</MenuItem>
                  <MenuItem onClick={() => { handleClose(); navigate('/myorders'); }}>My Orders</MenuItem>
                  {user.role === 'admin' && (
                    <MenuItem onClick={() => { handleClose(); navigate('/dashboard'); }}>Dashboard</MenuItem>
                  )}
                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button component={Link} to="/login" variant="outlined" sx={{ ml: 1 }}>
                Login
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          sx={{
            justifyContent: 'center',
            borderTop: '1px solid #e0e0e0',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {categories &&
            categories.map((category) => (
              <Button
                key={category.name}
                component={Link}
                to={`/category/${category.name.toLowerCase()}`}
                sx={{ color: 'text.primary', mx: 2, fontWeight: 400 }}
              >
                {category.name}
              </Button>
            ))}
        </Toolbar>
      </Container>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        open={Boolean(mobileMoreAnchorEl)}
        onClose={handleMobileMenuClose}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {categories &&
          categories.map((category) => (
            <MenuItem
              key={category.name}
              onClick={() => {
                handleMobileMenuClose();
                navigate(`/category/${category.name.toLowerCase()}`);
              }}
            >
              {category.name}
            </MenuItem>
          ))}
      </Menu>
    </AppBar>
  );
};

export default Header;
