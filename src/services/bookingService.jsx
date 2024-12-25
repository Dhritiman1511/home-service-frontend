/* eslint-disable no-useless-catch */
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

// Get all bookings by id (with optional pagination and status filter)
export const getBookings = async (userId, page = 1, limit = 10, status = '') => {
  try {
    const params = { page, limit, status };
    const response = await axios.get(`${API_URL}/bookings/${userId}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new booking
export const createBooking = async (bookingDetails) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, bookingDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update booking details
export const updateBooking = async (bookingId, updates) => {
  try {
    const response = await axios.put(`${API_URL}/bookings/${bookingId}`, updates);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
  try {
    const response = await axios.delete(`${API_URL}/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await axios.patch(`${API_URL}/bookings/${bookingId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch bookings for admin (includes all bookings)
export const fetchAllBookingsForAdmin = async () => {
  try {
    const response = await axios.get(`${API_URL}/bookings/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};