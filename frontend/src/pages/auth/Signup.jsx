import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag, Mail, Lock, CheckCircle2, Eye, EyeOff, Store, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import { registerSchema, validateWithZod } from '../../lib/validationSchemas';

// ─── Custom Logo Icon ─────────────────────────────────────────────────────────
const ShemsuLogo = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="currentColor">
        <path d="M12 2l2.5 7.5H22l-6.5 4.7 2.5 7.5L12 17.2l-6 4.5 2.5-7.5L3 9.5h7.5z" />
      </svg>
    </div>
    <span className="text-white font-bold text-lg tracking-wide">Shemsu</span>
  </div>
);

// ─── Feature Bullet ───────────────────────────────────────────────────────────
const Feature = ({ title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
      <CheckCircle2 size={14} className="text-white" />
    </div>
    <div>
      <p className="font-semibold text-white text-sm">{title}</p>
      <p className="text-blue-100 text-xs mt-0.5">{desc}</p>
    </div>
  </div>
);

// ─── Input Field ──────────────────────────────────────────────────────────────
const FormInput = ({ label, icon: Icon, rightIcon, type = 'text', error, ...props }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-gray-800">{label}</label>
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon size={16} />
      </div>
      <input
        type={type}
        className={cn(
          'w-full border rounded-lg py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all bg-white',
          error
            ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
    {error && (
      <p className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
        <AlertCircle size={12} />{error}
      </p>
    )}
  </div>
);

// ─── Signup Page ──────────────────────────────────────────────────────────────
const Signup = () => {
  const [role, setRole] = useState('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();

  const set = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { success, errors: validationErrors } = validateWithZod(registerSchema, formData);
    if (!success) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    register.mutate({ ...formData, email: formData.email.toLowerCase(), role }, {
      onSuccess: () => toast.success('Registration successful! Please check your email.'),
      onError: (err) => {
        const serverErrors = err.response?.data?.errors;
        if (serverErrors) {
          // Map Zod server errors back into form
          const mapped = {};
          serverErrors.forEach(({ field, message }) => { if (field) mapped[field] = message; });
          if (Object.keys(mapped).length > 0) { setErrors(mapped); return; }
        }
        toast.error(err.response?.data?.message || 'Registration failed');
      },
    });
  };

  return (
    <div className="flex min-h-screen">

      {/* ── Left: Branding Panel ─────────────────────────────────────────── */}
      <div className="hidden lg:flex w-[48%] relative flex-col justify-between p-10 overflow-hidden bg-blue-600">
        {/* Custom provided background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/signup_hero.png')" }}
        />
        {/* Content */}
        <div className="relative z-10">
          <ShemsuLogo />
        </div>

        <div className="relative z-10 space-y-8">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Start your journey in our verified marketplace.
          </h1>
          <div className="space-y-5">
            <Feature title="Verified Merchants" desc="Every seller is strictly vetted for quality and authenticity." />
            <Feature title="Secure Transactions" desc="Enterprise-grade encryption for every single purchase." />
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-[11px] font-medium text-blue-200">
          <span>© 2026 K.A.Y.E INC.</span>
          <span className="uppercase tracking-wider">Privacy</span>
          <span className="uppercase tracking-wider">Terms</span>
        </div>
      </div>

      {/* ── Right: Form Panel ────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-[380px]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
            <p className="text-sm text-gray-500 mt-1">Join the community and start trading today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Role Selection */}
            <div>
              <p className="text-sm font-medium text-gray-800 mb-3">I want to register as:</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'buyer', label: 'Buyer', desc: 'Discover products.', Icon: ShoppingBag },
                  { value: 'seller', label: 'Seller', desc: 'Sell my products.', Icon: Store },
                ].map(({ value, label, desc, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-1 py-4 px-3 rounded-lg border-2 transition-all text-center',
                      role === value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    )}
                  >
                    <Icon
                      size={22}
                      className={role === value ? 'text-blue-600' : 'text-gray-500'}
                    />
                    <p className={cn('font-bold text-sm', role === value ? 'text-gray-900' : 'text-gray-600')}>
                      {label}
                    </p>
                    <p className="text-[11px] text-gray-400">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <FormInput
              label="Full Name"
              icon={User}
              placeholder="John Doe"
              value={formData.fullName}
              error={errors.fullName}
              onChange={set('fullName')}
            />

            <FormInput
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              error={errors.email}
              onChange={set('email')}
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-800">Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={set('password')}
                  className={cn(
                    'w-full border rounded-lg py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all',
                    errors.password
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password ? (
                <p className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
                  <AlertCircle size={12} />{errors.password}
                </p>
              ) : (
                <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters with one number.</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={register.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {register.isPending ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Create Account →</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
