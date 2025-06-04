
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSuccess = () => {
    navigate('/home');
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-amber-100/80 flex items-center justify-center p-4">
      <AuthForm 
        mode={mode} 
        onToggleMode={toggleMode} 
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Login;
