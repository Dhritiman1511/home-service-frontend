import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

// Get all services
export const getServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/services`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all bookings
export const getBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
