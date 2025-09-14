import axios from 'axios';

// Create an axios instance with the base URL from the .env file
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // This is often needed for cookies/session-based auth
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Ensure the header is set for every request if the token exists
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor for handling global errors, like 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If we get a 401, the token is invalid.
      // Clear local storage and redirect to login.
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Use window.location to redirect outside of React Router context
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
