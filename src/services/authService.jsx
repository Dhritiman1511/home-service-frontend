import axios from 'axios';
import Cookies from 'js-cookie';


const API_URL = 'http://localhost:5000/api'; // Replace with your backend API URL

export const loginService = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token} = response.data;
    
    // Store token in a cookie with secure options
    Cookies.set('token', token); // Optional: expires in 7 days, make it HttpOnly on server if needed

    // Set default Authorization header for all future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    return {
      token: response.data.token,
      response: response
    };
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};
// authService.js
export const registerService = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const logoutService = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};