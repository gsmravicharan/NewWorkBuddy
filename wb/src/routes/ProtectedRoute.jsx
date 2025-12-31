import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'; 

const getToken = () =>
  localStorage.getItem('token');

const getStoredRole = () =>
  localStorage.getItem('role');

const ProtectedRoute = ({
  role,
  redirectTo = '/login',
  unauthorizedRedirect = '/',
}) => {
  const token = getToken();

  const { isAuthenticated } = useAuth();

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  if (role) {
    const storedRole = getStoredRole();
    if (!storedRole || storedRole !== role) {
      return <Navigate to={unauthorizedRedirect} replace />;
    }
  }
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // ✅ THIS IS THE KEY FIX
  return <Outlet />;
};

export default ProtectedRoute;
