import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const getToken = () => {
  const token =
    localStorage.getItem('token') ||
    localStorage.getItem('jwt') ||
    localStorage.getItem('authToken');

  if (!token || token === 'undefined' || token === 'null') {
    return null;
  }

  return token;
};

const getStoredRole = () =>
  localStorage.getItem('role') || localStorage.getItem('userRole');

const PublicRoute = () => {
  const token = getToken();
  const role = getStoredRole();

  console.log('PublicRoute → token:', token, 'role:', role);

  // ✅ NOT logged in → allow access
  if (!token) {
    return <Outlet />;
  }

  // ✅ Logged in → redirect
  if (role === 'worker') {
    return <Navigate to="/worker-dashboard" replace />;
  }

  if (role === 'customer') {
    return <Navigate to="/customer-dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default PublicRoute;
