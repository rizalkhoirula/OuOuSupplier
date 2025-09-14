import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../api';
import { useAuth } from './AuthContext';

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchFavorites = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await api.get(`/favorites`);
      setFavoriteItems(data);
    } catch (error) {
      console.error('Failed to fetch favorites', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addToFavorites = async (product) => {
    if (!user) return;

    setFavoriteItems([...favoriteItems, product]);

    try {
      const { data } = await api.post(`/favorites`, {
        productId: product._id,
      });
      setFavoriteItems(data);
    } catch (error) {
      console.error('Failed to add to favorites', error);
      // Revert optimistic update on error
      fetchFavorites();
    }
  };

  const removeFromFavorites = async (productId) => {
    if (!user) return;

    setFavoriteItems(favoriteItems.filter((p) => p._id !== productId));

    try {
      const { data } = await api.delete(`/favorites/${productId}`);
      setFavoriteItems(data);
    } catch (error) {
      console.error('Failed to remove from favorites', error);
      // Revert optimistic update on error
      fetchFavorites();
    }
  };

  const isFavorite = (productId) => {
    return favoriteItems.some((item) => item._id === productId);
  };

  return (
    <FavoriteContext.Provider value={{ favoriteItems, addToFavorites, removeFromFavorites, isFavorite, loading }}>
      {children}
    </FavoriteContext.Provider>
  );
};
