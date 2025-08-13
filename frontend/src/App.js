import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoriteProvider } from './context/FavoriteContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoriteProvider>
          <Router>
            <AppRoutes />
          </Router>
        </FavoriteProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
