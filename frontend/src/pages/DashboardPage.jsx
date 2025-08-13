import React from 'react';
import {
  Box, Typography, Container, Grid, Paper, Link, Avatar, List, ListItem, ListItemAvatar, ListItemText, Button, Divider
} from '@mui/material';
import {
  LineChart
} from '@mui/x-charts/LineChart';
import {
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  Add as AddIcon,
  Category as CategoryIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';

const StatCard = ({
  title,
  value,
  icon,
  change
}) => (
  <Paper sx={{
    p: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
  }}>
    <Box>
      <Typography variant="subtitle1" color="text.secondary">{title}</Typography>
      <Typography variant="h4" component="p" sx={{
        fontWeight: 'bold'
      }}>{value}</Typography>
      <Typography variant="body2" color={change.startsWith('+') ? 'success.main' : 'error.main'}>{change}</Typography>
    </Box>
    <Avatar sx={{
      bgcolor: 'primary.main',
      width: 56,
      height: 56
    }}>
      {icon}
    </Avatar>
  </Paper>
);

const QuickActionButton = ({
  icon,
  children
}) => (
  <Button variant="outlined" startIcon={icon} sx={{
    width: '100%',
    justifyContent: 'flex-start',
    p: 1.5,
    borderRadius: 2
  }}>
    {children}
  </Button>
);

const recentOrders = [{
  id: '#1121',
  customer: 'John Doe',
  date: '2024-08-10',
  total: '$150.00',
  status: 'Delivered'
}, {
  id: '#1122',
  customer: 'Jane Smith',
  date: '2024-08-10',
  total: '$75.50',
  status: 'Pending'
}, {
  id: '#1123',
  customer: 'Peter Jones',
  date: '2024-08-09',
  total: '$250.00',
  status: 'Shipped'
}, ];

const DashboardPage = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant="h4" sx={{
        fontWeight: 'bold'
      }}>
            Good morning, Admin!
          </Typography>
          <Typography color="text.secondary">
            Here's what's happening with your store today.
          </Typography>
        </Grid>

        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Total Revenue" value="$24,800" icon={<AttachMoneyIcon />} change="+12% this month" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Total Orders" value="1,250" icon={<ShoppingCartIcon />} change="+5% this month" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="New Customers" value="82" icon={<PeopleIcon />} change="+20% this month" />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{
        p: 2,
        borderRadius: 4,
        height: 400,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
            <Typography variant="h6" gutterBottom>Sales Overview</Typography>
            <LineChart xAxis={[{
        scaleType: 'point',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }]} series={[{
        data: [2200, 3100, 2500, 4200, 3800, 4500, 5100],
        area: true,
        showMark: false,
        color: '#007BFF'
      }]} height={320} margin={{
        left: 60,
        right: 20,
        top: 20,
        bottom: 40
      }} />
          </Paper>
        </Grid>

        {/* Quick Actions & Recent Activity */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{
        p: 2,
        borderRadius: 4,
        height: 400,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column'
      }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Grid container spacing={1} sx={{
        mb: 2
      }}>
              <Grid item xs={6}><QuickActionButton icon={<AddIcon />}>Add Product</QuickActionButton></Grid>
              <Grid item xs={6}><QuickActionButton icon={<CategoryIcon />}>Add Category</QuickActionButton></Grid>
              <Grid item xs={6}><QuickActionButton icon={<BarChartIcon />}>View Reports</QuickActionButton></Grid>
              <Grid item xs={6}><QuickActionButton icon={<PeopleIcon />}>Manage Users</QuickActionButton></Grid>
            </Grid>
            <Divider sx={{
        my: 1
      }} />
            <Typography variant="h6" gutterBottom sx={{
        mt: 1
      }}>Recent Orders</Typography>
            <List dense>
              {recentOrders.map(order => (
              <ListItem key={order.id} disablePadding>
                <ListItemText primary={order.id} secondary={`by ${order.customer}`} />
                <Typography variant="body2">{order.total}</Typography>
              </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;