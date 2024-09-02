// ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredDesignation: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredDesignation,
}) => {
  const token = localStorage.getItem('token');
  const designation = localStorage.getItem('designation');
  const location = useLocation();

  const isAuthenticated = !!token;
  const hasCorrectDesignation = designation === requiredDesignation;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!hasCorrectDesignation) {
    // Redirect to login if the designation is incorrect
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
