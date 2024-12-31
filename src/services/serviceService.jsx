/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Replace with your backend URL

// Get all services
export const getServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/services`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get service by ID
export const getServiceById = async (serviceId) => {
  try {
    const response = await axios.get(`${API_URL}/services/${serviceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new service
export const addService = async (serviceDetails) => {
  try {
    const response = await axios.post(`${API_URL}/services`, serviceDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing service
export const updateService = async (serviceId, serviceDetails) => {
  try {
    const response = await axios.put(
      `${API_URL}/services/${serviceId}`,
      serviceDetails
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a service
export const deleteService = async (serviceId) => {
  try {
    const response = await axios.delete(`${API_URL}/services/${serviceId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get services by provider ID
export const getProviderServices = async (providerId) => {
  try {
    const response = await axios.get(`${API_URL}/services/provider/${providerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchServiceByName = async (serviceName) => {
  try {
    const response = await axios.get(`${API_URL}/services/search`, {
      params: { name: serviceName }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getServicesByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/services/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};