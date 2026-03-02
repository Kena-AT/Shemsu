import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import { useAuthStore } from '../state/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  // Register
  const registerMutation = useMutation({
    mutationFn: (data) => api.post('/auth/register', data),
    onSuccess: (response, variables) => {
      // Navigate to verification page, passing email from form data
      navigate('/verify-email', { state: { email: variables.email } });
    },
  });

  // Login
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      setUser(data.user);
      // Route to the correct destination based on role
      if (data.user.role === 'seller') {
        navigate('/seller');
      } else {
        navigate('/app');
      }
    },
  });

  // Verify Email
  const verifyEmailMutation = useMutation({
    mutationFn: (data) => api.post('/auth/verify-email', data),
    onSuccess: () => {
      navigate('/login', { state: { message: 'Email verified! Please login.' } });
    },
  });

  // Resend Verification
  const resendVerificationMutation = useMutation({
    mutationFn: (data) => api.post('/auth/resend-verification', data),
  });

  // Forgot Password
  const forgotPasswordMutation = useMutation({
    mutationFn: (data) => api.post('/auth/forgot-password', data),
  });

  // Reset Password
  const resetPasswordMutation = useMutation({
    mutationFn: (data) => api.post('/auth/reset-password', data),
    onSuccess: () => {
      navigate('/login', { state: { message: 'Password reset successful!' } });
    },
  });

  // Admin Login
  const adminLoginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await api.post('/admin/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      setUser(data.user);
      navigate('/admin');
    },
  });

  return {
    register: registerMutation,
    login: loginMutation,
    adminLogin: adminLoginMutation,
    verifyEmail: verifyEmailMutation,
    resendVerification: resendVerificationMutation,
    forgotPassword: forgotPasswordMutation,
    resetPassword: resetPasswordMutation,
  };
};
