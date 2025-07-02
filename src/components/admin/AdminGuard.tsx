
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-amber-100/80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // For now, we'll check if user email contains 'admin' - in production, use proper role checking
  if (!user || !user.email?.includes('admin')) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
