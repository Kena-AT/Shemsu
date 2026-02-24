import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Camera, 
  Edit3,
  Bell,
  Search,
  ChevronRight,
  Shield,
  LayoutDashboard,
  Users,
  CheckCircle,
  Package,
  CreditCard,
  BarChart3,
  FileText,
  Settings,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../../state/useAuthStore';
import { toast } from 'react-hot-toast';

const AdminProfile = () => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('security');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    toast.success('System session terminated.');
    navigate('/admin/login');
  };

  if (!user) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans text-slate-900">
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_50%)]"></div>
          <button className="absolute bottom-6 right-8 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md transition-all flex items-center gap-2 border border-white/10">
            <Camera className="w-4 h-4" />
            <span>Modify Environment</span>
          </button>
        </div>
        
        <div className="px-10 pb-10">
          <div className="relative -mt-16 flex flex-col md:flex-row items-end justify-between mb-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 shadow-2xl relative z-10">
                <div className="w-full h-full rounded-[2.2rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl font-black text-blue-600 italic">
                  {user.fullName?.charAt(0).toUpperCase() || 'A'}
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-2xl shadow-xl border-4 border-white hover:scale-110 transition-all z-20 active:scale-95">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 mt-6 md:mt-0">
               <button className="px-8 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm">
                 Security Audit
               </button>
               <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-200">
                 Edit Identity
               </button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">{user.fullName}</h2>
            <div className="flex items-center gap-3">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.15em]">System Administrator • {user.role?.toUpperCase()}</p>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
            <div className="flex items-center gap-4 text-slate-600">
              <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <Mail className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-xs font-black tracking-tight lowercase">{user.email}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-600">
              <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest">Global Ops verified</span>
            </div>
            <div className="flex items-center gap-4 text-slate-600">
              <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <MapPin className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest">Main Console Access</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Security Deep-Dive */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-blue-600 opacity-20"></div>
            <div className="flex items-center gap-3 mb-10">
              <Lock className="w-5 h-5 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Cryptographic Protocols</h3>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between p-6 bg-slate-900 text-white rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-700"></div>
                <div className="flex items-center gap-5 relative z-10">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                    <ShieldCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">Multi-Factor Authentication</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Status: Locked & Hardened</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest relative z-10">
                   Active
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Administrative Credential</label>
                  <input 
                    type="password" 
                    defaultValue="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all italic"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">New System Hash</label>
                  <input 
                    type="password" 
                    placeholder="GENERATE NEW HASH"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all italic placeholder:text-slate-300"
                  />
                </div>
              </div>

              <button className="w-full py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-[0.98]">
                Deploy Updated Protocols
              </button>
            </div>
          </section>

          {/* Telemetry Log */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Personal Access Telemetry</h3>
            </div>
            <div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
              {[
                { action: 'Session Initialized: Main Console', time: '02 hours ago', location: 'Addis Ababa Gateway • CID: 11.23.XX.XX' },
                { action: 'Platform Configuration Adjusted', time: 'Alpha Cycle • Oct 23', location: 'System Runtime Management' },
                { action: 'Global Merchant Batch Approval', time: 'Beta Cycle • Oct 21', location: 'Verification Engine' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 relative z-10 group">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-md shrink-0 mt-1 transition-transform group-hover:scale-125 duration-300"></div>
                  <div className="flex flex-col text-left">
                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{item.action}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest italic">{item.time} • {item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-10">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"></div>
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-8">Metadata Summary</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Designation</span>
                <span className="text-xs font-black text-blue-600 uppercase italic">SENIOR MODERATOR</span>
              </div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Hash</span>
                <span className="text-xs font-black text-slate-900 italic font-mono uppercase tracking-tighter">#ADM-8821-X</span>
              </div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-50 font-sans">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entitlement</span>
                <span className="text-xs font-black text-emerald-600 italic uppercase">Global Override</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enlisted Since</span>
                <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Oct 2023</span>
              </div>
            </div>
          </section>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-4 py-6 bg-rose-50 text-rose-600 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-rose-100 transition-all border border-rose-100 shadow-xl shadow-rose-100 active:scale-95 italic"
          >
            <LogOut className="w-5 h-5" />
            <span>Kill Session</span>
          </button>
          
          <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 opacity-20"></div>
             <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-blue-400" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400">Behavioral Notice</h4>
             </div>
             <p className="text-[10px] text-slate-400 leading-relaxed font-medium italic">
                Unauthorized access to this console is monitored by automated behavioral sub-routines. Please ensure session closure after operation.
             </p>
          </div>
        </div>
      </div>
      
      <footer className="p-10 text-center">
         <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.4em] italic opacity-50">
            Internal Administrative Console • Grade A+ Environment
         </p>
      </footer>
    </div>
  );
};

export default AdminProfile;
