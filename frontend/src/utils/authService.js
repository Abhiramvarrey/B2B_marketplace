import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const authService = {
  // Register user
  async register(userData) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Login user
  async login(formData) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        return response;
      }
    } catch (error) {
      throw error.response.data;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'))
  },

  // Get current user from token
  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        return {
          id: decoded.userId,
          email: decoded.email,
          // Add other user details as needed
        };
      } catch (error) {
        return null;
      }
    }
    return null;
  },

  // Check if token is valid
  isTokenExpired() {
    const token = localStorage.getItem('token');
    if (!token) return true;

    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  },

  // Add Authorization header to axios
  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
};