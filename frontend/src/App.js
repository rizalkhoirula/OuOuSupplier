import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoriteProvider } from './context/FavoriteContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './AppRoutes';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoriteProvider>
          <Router>
            <ScrollToTop />
            <AppRoutes />
          </Router>
        </FavoriteProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
