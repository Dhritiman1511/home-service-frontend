/* eslint-disable react/prop-types */
'use client'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ServiceProviderDashboard from './pages/ServiceProviderDashboard';
import ServiceList from './pages/ServiceList';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import ServiceDetails from './pages/ServiceDetails';
import BookingForm from './components/BookingForm';
import BookingDetails from './pages/BookingDetails';
import ServiceBookings from './pages/ServiceBookings';

// Custom Route component to handle role-based redirection
const RoleBasedRoute = ({ element, requiredRole, ...rest }) => {
  const { authData, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // Prevent redirect during loading state

    if (!authData) {
      // Redirect to login if not authenticated
      window.location.href = "/login";
    } else if (authData.role !== requiredRole) {
      // Redirect to correct dashboard if user role doesn't match
      window.location.href = `/${authData.role}/dashboard`;
    }
  }, [authData, loading, requiredRole]);

  return authData && authData.role === requiredRole ? element : null;
};

const App = () => (
  <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service/:serviceId" element={<ServiceDetails />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path='/booking-details' element={<BookingDetails />} />
        <Route path="/bookings/:serviceId" element={<ServiceBookings />} />
        {/* Role-Based Private Routes */}
        <Route path='/' element={<HomePage />} />
        <Route
          path="/user/dashboard"
          element={<RoleBasedRoute element={<UserDashboard />} requiredRole="user" />}
        />
        <Route
          path="/admin/dashboard"
          element={<RoleBasedRoute element={<AdminDashboard />} requiredRole="admin" />}
        />
        <Route
          path="/provider/dashboard"
          element={<RoleBasedRoute element={<ServiceProviderDashboard />} requiredRole="service_provider" />}
        />

        {/* Other public routes */}
        <Route path="/services" element={<ServiceList />} />
      </Routes>
  </AuthProvider>
);

export default App;
