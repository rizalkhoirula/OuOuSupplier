import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Avatar, IconButton, Menu, MenuItem, Badge, InputBase, Tooltip, alpha, ListItemIcon, Divider
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

// Custom Search component for a modern look
const Search = () => (
  <Box sx={{
    position: 'relative',
    borderRadius: '12px',
    backgroundColor: (theme) => alpha(theme.palette.grey[500], 0.08),
    '&:hover': {
      backgroundColor: (theme) => alpha(theme.palette.grey[500], 0.12),
    },
    width: '100%',
    maxWidth: '350px',
  }}>
    <Box sx={{
      padding: (theme) => theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'grey.600'
    }}>
      <SearchIcon />
    </Box>
    <InputBase
      placeholder="Search…"
      sx={{
        color: 'text.primary',
        fontWeight: 500,
        width: '100%',
        '& .MuiInputBase-input': {
          padding: (theme) => theme.spacing(1.2, 1.2, 1.2, 0),
          paddingLeft: (theme) => `calc(1em + ${theme.spacing(4)})`,
          transition: (theme) => theme.transitions.create('width'),
        },
      }}
    />
  </Box>
);

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Glassmorphism effect
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ py: 1.5, px: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <Search />
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Account settings">
            <IconButton onClick={handleMenu} sx={{ p: 0 }}>
              <Avatar alt={user?.name} src={user?.avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                mt: 1.5,
                borderRadius: '12px',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose} sx={{ my: 0.5, mx: 1, borderRadius: '8px' }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ my: 0.5, mx: 1, borderRadius: '8px', color: 'error.main' }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
