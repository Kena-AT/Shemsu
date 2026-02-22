import React, { useState } from 'react';
import { Mail, Lock, ShieldAlert, ChevronLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { adminLogin } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    adminLogin.mutate(formData, {
      onSuccess: () => toast.success('Access Granted. Welcome, Administrator.'),
      onError: (err) => {
        // Generic error message for security
        toast.error(err.response?.data?.message || 'Authentication failed. Access denied.');
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full -z-10" />

      <div className="max-w-md w-full mb-10">
        <Link 
          to="/app" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors mb-8 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Marketplace</span>
        </Link>

        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl mb-6 border border-indigo-500/20 shadow-xl shadow-indigo-500/5">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Admin Portal</h2>
          <p className="mt-3 text-sm text-slate-400 font-medium">Terminal access restricted to authorized personnel only.</p>
        </div>
      </div>

      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-slate-800 shadow-indigo-500/5">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Admin Identity</label>
              <Input
                placeholder="admin@shemsu.com"
                icon={Mail}
                type="email"
                required
                className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500/50 h-14"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Access Key</label>
              <Input
                placeholder="••••••••"
                icon={Lock}
                type="password"
                required
                className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500/50 h-14"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <Button 
            className="w-full py-5 text-sm font-black uppercase tracking-[0.15em] bg-indigo-600 hover:bg-indigo-500 border-none shadow-lg shadow-indigo-600/20" 
            isLoading={adminLogin.isPending}
          >
            Authenticate Session
          </Button>
        </form>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="h-[1px] w-20 bg-slate-800" />
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest text-center px-8">
            All access attempts are logged with IP & timestamps for security auditing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
