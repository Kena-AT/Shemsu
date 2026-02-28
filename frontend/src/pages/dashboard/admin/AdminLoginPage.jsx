import React, { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-hot-toast';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { adminLogin } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    adminLogin.mutate({ ...formData, email: formData.email.toLowerCase() }, {
      onSuccess: () => toast.success('Access Granted. Welcome, Administrator.'),
      onError: (err) => {
        toast.error(err.response?.data?.message || 'Authentication failed. Access denied.');
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden text-slate-900">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

      <div className="w-full max-w-[440px] z-10">
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-slate-900 leading-none">Shemsu</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Admin Console</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em]">Secure Administrative Gateway</p>
        </div>

        {/* Sign In Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-10"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Admin Access</h1>
            <p className="text-slate-500 text-sm mt-1">Authorized personnel only.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 ml-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <button type="button" className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wider">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={adminLogin.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {adminLogin.isPending ? 'Authenticating...' : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
              <span className="font-bold">Restriction Policy:</span> Access to this area is restricted to authorized Shemsu administrators only. All activity is logged and monitored for security compliance.
            </p>
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="mt-8 flex items-center justify-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600">Security Standards</a>
          <a href="#" className="hover:text-slate-600">Contact Support</a>
        </div>
        
        <p className="mt-12 text-center text-[10px] text-slate-400 font-medium uppercase tracking-[0.3em]">
          © 2024 SHEMSU MARKETPLACE • VERSION 4.2.0-STABLE
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
