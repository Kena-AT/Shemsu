import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../state/useAuthStore';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Verifying credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    const isAdminPath = window.location.pathname.startsWith('/admin');
    return <Navigate to={isAdminPath ? "/admin/login" : "/login"} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Seller Verification Lock
  if (user?.role === 'seller' && user?.verificationStatus !== 'approved') {
    // If they are trying to access anything other than verification page, redirect
    const isOnVerifyPage = window.location.pathname === '/seller/verify';
    if (!isOnVerifyPage) {
      return <Navigate to="/seller/verify" replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
