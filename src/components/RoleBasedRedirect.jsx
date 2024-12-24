import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const RoleBasedRedirect = ({ children, role }) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/" />;

  return children;
};

export default RoleBasedRedirect;
