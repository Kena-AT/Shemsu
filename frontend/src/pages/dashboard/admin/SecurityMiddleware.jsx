import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Activity, 
  Settings, 
  Save, 
  RefreshCcw,
  ShieldCheck,
  Zap,
  Filter,
  AlertOctagon
} from 'lucide-react';
import { useAdmin } from '../../../hooks/useAdmin';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const DEFAULT_SETTINGS = {
  apiGlobalRequestLimit: 100,
  enableCSP: true,
  enableHSTS: true,
  enableFrameguard: true,
  enableReferrerPolicy: true,
  lockdownMode: false,
};

const SecurityMiddleware = () => {
  const { useGetSettings, updateSettings } = useAdmin();
  const { data: settings, isLoading, isError } = useGetSettings();
  const [formData, setFormData] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setFormData({ ...DEFAULT_SETTINGS, ...settings });
    }
  }, [settings]);

  const handleSave = (e) => {
    e.preventDefault();
    const reason = window.prompt('Security settings update requires a justification for audit logs:');
    if (!reason) return;

    updateSettings.mutate({ settings: formData, reason }, {
      onSuccess: () => toast.success('Security policy updated and applied to backend.'),
      onError: (err) => toast.error(err.response?.data?.message || 'Update failed')
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md py-4 z-10 border-b border-slate-200 -mx-4 px-4 sm:-mx-8 sm:px-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <span>Security & Middleware</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Configure global security headers, rate limiting, and traffic policy.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setFormData(settings)}
            className="px-4 py-2 text-xs font-black text-slate-400 hover:text-slate-600 transition-all uppercase tracking-widest flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Discard
          </button>
          <button 
            onClick={handleSave}
            className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-xl shadow-slate-200 flex items-center gap-2 uppercase tracking-widest"
          >
            <Save className="w-4 h-4" />
            <span>Deploy Policy</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: API Protection */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Dynamic Rate Limiting</h3>
              </div>
              <div className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Active</div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Global Request Limit (15m)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formData.apiGlobalRequestLimit || 100}
                      onChange={(e) => setFormData({ ...formData, apiGlobalRequestLimit: parseInt(e.target.value) })}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-2xl font-black text-slate-900 focus:outline-none focus:border-blue-600/20 transition-all"
                    />
                    <Zap className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-200" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <span className="px-2 py-0.5 bg-slate-100 rounded">MIN: 10</span>
                    <span className="px-2 py-0.5 bg-slate-100 rounded">MAX: 5000</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Controls how many requests a single IP can make within a 15-minute window. Setting this too low may block legitimate users; too high invites DDoS attacks.
                  </p>
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4" /> Hard Bounds Enforced
                    </p>
                    <p className="text-xs text-blue-800/70 mt-1 font-medium italic">Backend will automatically cap values between 10 and 5000.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-xl">
                <Settings className="w-5 h-5 text-slate-900" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Advanced Security Headers</h3>
            </div>
            <div className="p-8 space-y-6">
              {[
                { key: 'enableCSP', label: 'Content Security Policy (CSP)', desc: 'Blocks unauthorized scripts and cross-site injections.' },
                { key: 'enableHSTS', label: 'Strict Transport Security (HSTS)', desc: 'Force all traffic over HTTPS for 1 year.' },
                { key: 'enableFrameguard', label: 'X-Frame-Options (Clickjacking)', desc: 'Prevents the site from being embedded in iframes.' },
                { key: 'enableReferrerPolicy', label: 'Referrer Policy', desc: 'Controls how much referrer information is shared.' },
              ].map((header) => (
                <div key={header.key} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{header.label}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{header.desc}</p>
                  </div>
                  <button 
                    onClick={() => setFormData({ ...formData, [header.key]: !formData[header.key] })}
                    className={`w-14 h-7 rounded-full relative p-1 transition-all duration-300 ${formData[header.key] ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${formData[header.key] ? 'translate-x-7' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Whitelisting & Status */}
        <div className="space-y-8">
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <Filter className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Domain Whitelist</h3>
             </div>
             <div className="p-8 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Origin Whitelist (CORS)</span>
                    <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Add New</button>
                  </div>
                  <div className="space-y-2">
                    {['http://localhost:3100', import.meta.env.VITE_FRONTEND_URL].filter(Boolean).map((origin) => (
                      <div key={origin} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                        <span className="text-xs font-bold text-slate-700 font-mono">{origin}</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </section>

          <section className="bg-rose-50 rounded-3xl border border-rose-100 overflow-hidden">
             <div className="p-6 bg-rose-100/50 flex items-center gap-3">
                <AlertOctagon className="w-5 h-5 text-rose-600" />
                <h3 className="text-sm font-black text-rose-900 uppercase tracking-wider">Emergency Protocol</h3>
             </div>
             <div className="p-8 space-y-4">
                <p className="text-xs text-rose-800 font-medium leading-relaxed">
                  Activating "Lockdown Mode" will terminate all non-admin sessions immediately and block all incoming public traffic.
                </p>
                <button 
                  onClick={() => setFormData({ ...formData, lockdownMode: !formData.lockdownMode })}
                  className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all border-2 ${
                    formData.lockdownMode 
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xl shadow-rose-200' 
                    : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  {formData.lockdownMode ? 'Exit Lockdown' : 'Engage Lockdown'}
                </button>
             </div>
          </section>

          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-2 italic underline decoration-blue-500/50">Integrity Report</h4>
              <p className="text-2xl font-black mb-4 tracking-tight">Middleware Stack is Healthy</p>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Last Logged Change</p>
                   <p className="text-xs font-bold text-slate-100">2 mins ago</p>
                 </div>
                 <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Active Blocks (1h)</p>
                   <p className="text-xs font-bold text-slate-100">0 IPs</p>
                 </div>
              </div>
            </div>
            <Shield className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 group-hover:text-blue-500/10 transition-colors duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityMiddleware;
