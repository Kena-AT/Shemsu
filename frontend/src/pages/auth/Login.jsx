import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { loginSchema, validateWithZod } from '../../lib/validationSchemas';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { success, errors: validationErrors } = validateWithZod(loginSchema, formData);
    if (!success) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    login.mutate({ ...formData, email: formData.email.toLowerCase() }, {
      onSuccess: () => toast.success('Welcome back!'),
      onError: (err) => toast.error(err.response?.data?.message || 'Login failed'),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-2xl mb-4">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-500">Secure access for verified buyers and sellers.</p>
      </div>

      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            placeholder="name@example.com"
            icon={Mail}
            type="email"
            value={formData.email}
            error={errors.email}
            onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors(p => ({...p, email: null})); }}
          />

          <div className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
                Forgot Password?
              </Link>
            </div>
            <Input
              placeholder="••••••••"
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              error={errors?.password}
              onChange={(e) => { 
                setFormData({ ...formData, password: e.target.value }); 
                if (errors?.password) setErrors(p => { const n = {...p}; delete n.password; return n; });
              }}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>

          <Button className="w-full py-4 text-base" isLoading={login.isPending}>
            Login to Account →
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
