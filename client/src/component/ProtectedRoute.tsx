import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute: React.FC<{children: ReactNode}> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  
  try {
    jwtDecode(token); // Verify token
  } catch {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
