import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Container, Box, CircularProgress } from '@mui/material';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import DashboardLayout from './pages/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import ProductManagementPage from './pages/admin/ProductManagementPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import OrderManagementPage from './pages/admin/OrderManagementPage';
import CategoryManagementPage from './pages/admin/CategoryManagementPage';
import ReviewManagementPage from './pages/admin/ReviewManagementPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';
import CheckoutPage from './pages/CheckoutPage';
import MyOrdersPage from './pages/MyOrdersPage';
import ReceiptPage from './pages/ReceiptPage';
import PaymentStatusPage from './pages/PaymentStatusPage';

// Main layout for public-facing pages
const MainLayout = ({ children }) => (
  <>
    <Header />
    <main>
      <Container sx={{ py: 3 }}>
        {children}
      </Container>
    </main>
    <Footer />
  </>
);

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/products" element={<MainLayout><ProductPage /></MainLayout>} />
      <Route path="/product/:id" element={<MainLayout><ProductDetailsPage /></MainLayout>} />
      <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
      <Route path="/category/:categoryName" element={<MainLayout><CategoryPage /></MainLayout>} />
      <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
      <Route path="/favorites" element={<MainLayout><FavoritesPage /></MainLayout>} />

      {/* Protected User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><CheckoutPage /></MainLayout>} />
        <Route path="/myorders" element={<MainLayout><MyOrdersPage /></MainLayout>} />
        <Route path="/order/:orderId/receipt" element={<MainLayout><ReceiptPage /></MainLayout>} />
        <Route path="/payment-status" element={<MainLayout><PaymentStatusPage /></MainLayout>} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductManagementPage />} />
          <Route path="orders" element={<OrderManagementPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="categories" element={<CategoryManagementPage />} />
          <Route path="reviews" element={<ReviewManagementPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
