import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography, Divider, Avatar } from '@mui/material';
import {
  Dashboard, ShoppingBag, People, ShoppingCart, Category, RateReview, BarChart, Settings, Store
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 280;

const navItems = {
  'Analytics': [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Analytics', icon: <BarChart />, path: '/dashboard/reports' },
  ],
  'Management': [
    { text: 'Products', icon: <ShoppingBag />, path: '/dashboard/products' },
    { text: 'Orders', icon: <ShoppingCart />, path: '/dashboard/orders' },
    { text: 'Users', icon: <People />, path: '/dashboard/users' },
    { text: 'Categories', icon: <Category />, path: '/dashboard/categories' },
    { text: 'Reviews', icon: <RateReview />, path: '/dashboard/reviews' },
  ],
};

const NavList = ({ items }) => (
  <List sx={{ p: 0 }}>
    {items.map((item) => (
      <ListItemButton
        key={item.text}
        component={NavLink}
        to={item.path}
        end={item.path === '/dashboard'}
        sx={{
          color: '#344054', // Dark text for contrast
          py: 1.25,
          mx: 2,
          my: 0.5,
          borderRadius: '8px',
          transition: 'background-color 0.2s, color 0.2s',
          '&:hover': {
            backgroundColor: 'rgba(0, 123, 255, 0.05)',
          },
          '&.active': {
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            color: '#007BFF',
            '& .MuiListItemIcon-root': {
              color: '#007BFF',
            },
          },
        }}
      >
        <ListItemIcon sx={{ color: '#667085', minWidth: 40 }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
      </ListItemButton>
    ))}
  </List>
);

const DashboardSidebar = () => {
  const { user } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f0f7ff', // A beautiful, soft baby blue
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Toolbar sx={{ p: '24px !important', display: 'flex', alignItems: 'center' }}>
        <Store sx={{ fontSize: 32, mr: 1.5, color: '#007BFF' }} />
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: '#101828' }}>
          OuOuSupplier
        </Typography>
      </Toolbar>
      <Box sx={{ overflowY: 'auto', flexGrow: 1, pt: 2 }}>
        {Object.entries(navItems).map(([group, items]) => (
          <Box key={group} sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ px: 3, color: '#667085', textTransform: 'uppercase', fontWeight: 'bold' }}>
              {group}
            </Typography>
            <NavList items={items} />
          </Box>
        ))}
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <ListItemButton
            component={NavLink}
            to="/dashboard/settings"
            sx={{
                color: '#344054',
                py: 1.25,
                borderRadius: '8px',
                '&.active': {
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    color: '#007BFF',
                    '& .MuiListItemIcon-root': {
                      color: '#007BFF',
                    },
                  },
            }}
        >
            <ListItemIcon sx={{ color: '#667085', minWidth: 40 }}>
                <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" primaryTypographyProps={{ fontWeight: 500 }} />
        </ListItemButton>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mt: 1, backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
            <Avatar alt={user?.name} src={user?.avatar} sx={{ mr: 1.5 }} />
            <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#101828' }}>{user?.name || 'Admin'}</Typography>
            <Typography variant="body2" sx={{ color: '#667085' }}>{user?.email || 'admin@example.com'}</Typography>
            </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DashboardSidebar;
