import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="loading">Checking authentication...</div>;
  }

  if (!currentUser) {
    // User logged in નથી → redirect to login/signup + optional message
    return <Navigate to={redirectTo} replace state={{ from: window.location.pathname }} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;