import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Replace with your actual API URL

// Fetch reviews for a service
export const getReviewsForService = async (serviceId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/${serviceId}`);  // Updated endpoint
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching reviews' };
  }
};

// Post a new review for a service
export const postReview = async (serviceId, reviewData) => {
  try {
    const response = await axios.post(`${API_URL}/reviews/`, { serviceId, ...reviewData });  // Updated endpoint
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error posting review' };
  }
};

// Update a review
export const updateReview = async (reviewId, updatedReviewData) => {
  try {
    const response = await axios.put(`${API_URL}/reviews/${reviewId}`, updatedReviewData);  // Updated endpoint
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating review' };
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${API_URL}/reviews/${reviewId}`);  // Updated endpoint
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting review' };
  }
};