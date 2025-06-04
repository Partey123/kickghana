
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/home');
    } else {
      // Redirect to login page with signup mode
      navigate('/login');
    }
  }, [user, navigate]);

  return null;
};

export default Signup;
