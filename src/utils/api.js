import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use .env variable
});

// Example: Fetch services
export const fetchServices = async () => {
  const { data } = await API.get('/services');
  return data;
};

// Example: Book a service
export const bookService = async (bookingDetails) => {
  const { data } = await API.post('/bookings', bookingDetails);
  return data;
};

// Example: Login
export const loginUser = async (credentials) => {
  const { data } = await API.post('/auth/login', credentials);
  return data;
};
