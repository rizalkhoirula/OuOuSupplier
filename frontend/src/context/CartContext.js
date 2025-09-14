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

    const existItem = cartItems.find((x) => x.product._id === product._id);

    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x.product._id === product._id ? { ...x, qty: x.qty + qty } : x
        )
      );
    } else {
      setCartItems([...cartItems, { product, qty }]);
    }

    try {
      const { data } = await api.post(`/cart`, {
        productId: product._id,
        qty,
      });
      setCartItems(data);
    } catch (error) {
      console.error('Failed to add to cart', error);
      // Revert optimistic update on error
      fetchCart();
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    
    setCartItems(cartItems.filter((x) => x.product._id !== productId));

    try {
      const { data } = await api.delete(`/cart/${productId}`);
      setCartItems(data);
    } catch (error) {
      console.error('Failed to remove from cart', error);
      // Revert optimistic update on error
      fetchCart();
    }
  };

  const updateCartQty = async (productId, qty) => {
    if (!user) return;

    setCartItems(
      cartItems.map((x) =>
        x.product._id === productId ? { ...x, qty } : x
      )
    );

    try {
      const { data } = await api.post(`/cart`, {
        productId,
        qty,
      });
      setCartItems(data);
    } catch (error) {
      console.error('Failed to update cart quantity', error);
      // Revert optimistic update on error
      fetchCart();
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateCartQty, loading }}>
      {children}
    </CartContext.Provider>
  );
};
