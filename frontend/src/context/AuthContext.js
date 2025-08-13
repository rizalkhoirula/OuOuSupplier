import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api'; // Use the centralized api instance

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        try {
          setUser(JSON.parse(storedUser));
          // The token is already set in the api instance by default
        } catch (error) {
          console.error("Failed to parse user from localStorage", error);
          setUser(null);
          localStorage.clear();
        }
      }
      setLoading(false);
    };

    loadUserFromStorage();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/users/login', { email, password });

      if (data.user && data.token) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return data.user;
      }
    } catch (error) {
      localStorage.clear();
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Optional: Inform the backend about logout
      await api.post('/users/logout');
    } catch (error) {
      console.error("Logout failed on backend, clearing session locally.", error);
    } finally {
      // Clear user state and local storage regardless of backend result
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // The token is removed from the api instance via interceptors
    }
  };

  const value = { user, setUser, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
