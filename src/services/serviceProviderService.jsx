import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

// Get all bookings assigned to the service provider
export const getProviderBookings = async (providerId) => {
  try {
    const response = await axios.get(`${API_URL}/provider/bookings/${providerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get earnings of the service provider
export const getProviderEarnings = async (providerId) => {
  try {
    const response = await axios.get(`${API_URL}/provider/earnings/${providerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update booking status (accepted, in progress, completed)
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await axios.put(`${API_URL}/provider/bookings/${bookingId}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};
