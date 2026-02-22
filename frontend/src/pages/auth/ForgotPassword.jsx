import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, HelpCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword.mutate({ email }, {
      onSuccess: () => {
        setIsSent(true);
        toast.success('Reset link sent!');
      },
      onError: (err) => toast.error(err.response?.data?.message || 'Request failed'),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-2xl mb-6">
          <HelpCircle size={32} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
        <p className="text-sm text-gray-500 mb-8">No worries, we'll send you reset instructions.</p>

        {!isSent ? (
          <form className="space-y-6 text-left" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              icon={Mail}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="w-full py-4" isLoading={forgotPassword.isPending}>
              Send Reset Link →
            </Button>
          </form>
        ) : (
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="text-sm text-green-700 font-medium">
              If an account matches that email, we've sent a reset link!
            </p>
          </div>
        )}

        <div className="mt-8">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
