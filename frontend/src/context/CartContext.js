import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await api.get(`/cart`);
      setCartItems(data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product, qty = 1) => {
    if (!user) return;
    try {
      const { data } = await api.post(`/cart`, {
        productId: product._id,
        qty,
      });
      setCartItems(data);
    } catch (error) {
      console.error('Failed to add to cart', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      setCartItems(data);
    } catch (error) {
      console.error('Failed to remove from cart', error);
    }
  };

  const clearCart = () => {
    // This would need a backend implementation if you want to clear the entire cart
    // For now, it just clears the local state
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};
