import React from 'react';
import {Navigate} from 'react-router-dom';

interface ProtectedRouteProps {
  user: any;
  loading: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, loading, children }) => {
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
};

export default ProtectedRoute;


