import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can show a loading spinner here while checking auth state
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-red"></div>
        </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
