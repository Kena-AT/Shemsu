import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Requirement = ({ label, met }) => (
  <div className={`flex items-center gap-2 text-xs ${met ? 'text-green-600' : 'text-gray-400'}`}>
    <CheckCircle2 size={14} className={met ? 'text-green-500' : 'text-gray-200'} />
    {label}
  </div>
);

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword } = useAuth();

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error('Passwords do not match');
    resetPassword.mutate({ email, token, newPassword: password }, {
      onSuccess: () => toast.success('Password reset successful!'),
      onError: (err) => toast.error(err.response?.data?.message || 'Reset failed'),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-2xl mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Set New Password</h2>
          <p className="text-sm text-gray-500">Choose a strong password to secure your account.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="New Password"
            placeholder="Enter your new password"
            icon={Lock}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm New Password"
            placeholder="Repeat your new password"
            icon={Lock}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="bg-gray-50 p-4 rounded-xl space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Password Requirements</p>
            <Requirement label="At least 8 characters" met={hasMinLength} />
            <Requirement label="At least one number (0-9)" met={hasNumber} />
            <Requirement label="At least one special character" met={hasSpecial} />
          </div>

          <Button className="w-full py-4" isLoading={resetPassword.isPending}>
            Reset Password →
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Having trouble?{' '}
          <a href="mailto:support@shemsu.com" className="text-blue-600 hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
