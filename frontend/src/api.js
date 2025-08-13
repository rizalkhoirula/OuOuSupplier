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
    // The component or context that made the call should handle the error.
    // For example, by catching the error and redirecting the user.
    return Promise.reject(error);
  }
);

export default api;
