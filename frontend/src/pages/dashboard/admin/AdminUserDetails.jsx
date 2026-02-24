import React, { useState } from 'react';
import { 
  Users, 
  ChevronRight, 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Edit3, 
  RotateCcw, 
  Ban, 
  Trash2, 
  ShieldCheck, 
  CheckCircle, 
  Package, 
  AlertCircle,
  Clock,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../../../hooks/useAdmin';
import { motion, AnimatePresence } from 'framer-motion';

const AdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Associated Products');
  const { useGetUserById, updateStatus } = useAdmin();
  const { data: user, isLoading } = useGetUserById(id);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400">
        <AlertCircle size={48} className="mb-4 opacity-20" />
        <h2 className="text-xl font-bold uppercase tracking-widest">User Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 font-bold hover:underline">Return to User Management</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      {/* Breadcrumbs & Header */}
      <div className="flex items-center justify-between">
         <button 
           onClick={() => navigate(-1)}
           className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all font-bold text-xs uppercase tracking-widest"
         >
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
           <span>Return to Directory</span>
         </button>
         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-slate-200">
           <span>Directory</span>
           <ChevronRight className="w-3 h-3" />
           <span className="text-blue-600">User Profile</span>
         </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-1 shadow-xl shadow-blue-200">
              <div className="w-full h-full rounded-[1.8rem] bg-white flex items-center justify-center text-4xl font-black text-blue-600 italic">
                {user.fullName?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.fullName}</h1>
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${user.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                  {user.status}
                </span>
                <span className="px-4 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.15em] rounded-full border border-blue-100">
                  {user.role}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-4 text-slate-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{user.email}</span>
                </div>
                {user.phoneNumber && (
                   <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{user.phoneNumber}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Subscribed Since {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <MessageSquare className="w-4 h-4" />
              <span>Direct Comms</span>
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-200">
              <Edit3 className="w-4 h-4" />
              <span>Manage Record</span>
            </button>
          </div>
        </div>

        {/* Dynamic Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-12 pt-12 border-t border-slate-100 font-sans">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Transactions</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">142</h3>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Platform Spend</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Br 12,450.00</h3>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+5.4%</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Identity Trust Score</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">98.2%</h3>
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-widest">Elite</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Last Auth Session</p>
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-900 uppercase italic leading-none">2 hours ago</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5 line-clamp-1">CID: 192.168.1.45 • MacOS • Chrome</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 font-sans">
        {/* Left Column: Activity & Detailed History */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex bg-slate-50/50 border-b border-slate-100 px-6">
              {['Associated Assets', 'Transaction Vault', 'Telemetry Logs'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-6 text-[10px] font-black uppercase tracking-[0.25em] transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="userTab" className="absolute bottom-0 left-0 w-full h-1 bg-blue-600" />
                  )}
                </button>
              ))}
            </div>
            <div className="p-10 min-h-[400px]">
              {activeTab === 'Associated Assets' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      Asset Distribution
                    </h4>
                    <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Full Catalog Access</button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Elite Performance Runners', category: 'Footwear', price: 'Br 4,200', stock: 45, status: 'IN STOCK', color: 'text-emerald-600 bg-emerald-50' },
                      { name: 'Minimalist Quartz Watch', category: 'Accessories', price: 'Br 2,850', stock: 12, status: 'LOW STOCK', color: 'text-amber-600 bg-amber-50' },
                      { name: 'Pro Audio ANC Headphones', category: 'Electronics', price: 'Br 12,400', stock: 0, status: 'SOLD OUT', color: 'text-rose-600 bg-rose-50' },
                    ].map((product, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 transition-all group shadow-sm hover:shadow-md">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                            <Package className="w-7 h-7" />
                          </div>
                          <div className="flex flex-col text-left">
                            <h5 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{product.name}</h5>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-1">{product.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="text-right">
                            <p className="text-sm font-black text-slate-900 italic leading-none">{product.price}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{product.stock} units available</p>
                          </div>
                          <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-transparent shadow-sm ${product.color}`}>
                            {product.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Audit Ledger */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600 opacity-20"></div>
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Administrative Audit Ledger</h3>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">Live Stream</span>
             </div>
             <div className="space-y-10 relative before:absolute before:left-[21px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
               {[
                 { action: 'Identity Verification: APPROVED', time: 'Oct 24, 2023 • 02:34 PM', detail: 'Manual review of Government ID completed by Admin: Sarah C.', icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                 { action: 'Security Overload: Account Temporary Lock', time: 'Oct 14, 2023 • 10:15 AM', detail: 'Unusual login pattern detected from new geographic coordinate.', icon: AlertCircle, color: 'bg-rose-50 text-rose-600 border-rose-100' },
                 { action: 'Role Escalation: SELLER STATUS', time: 'Oct 13, 2023 • 11:20 AM', detail: 'Marketplace merchant onboarding process finalized successfully.', icon: UserIcon, color: 'bg-blue-50 text-blue-600 border-blue-100' },
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 relative z-10 group">
                   <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border-2 ${item.color} transition-transform group-hover:scale-110 duration-300`}>
                     <item.icon className="w-5 h-5" />
                   </div>
                   <div className="flex-1 text-left">
                     <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">{item.action}</p>
                     <p className="text-xs text-slate-500 font-medium leading-relaxed mb-1">{item.detail}</p>
                     <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">{item.time}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Right Column: Dynamic Overrides & Safety Actions */}
        <div className="space-y-10">
          {/* Standing & Compliance */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative group overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700"></div>
             <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.25em] mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                Account Standing
             </h3>
             <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance Grade</span>
                  <span className="text-xs font-black text-emerald-600 uppercase italic">EXCELLENT (AAA+)</span>
                </div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">KYC Status</span>
                   <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase italic">
                      <CheckCircle className="w-4 h-4" />
                      <span>Certified</span>
                   </div>
                </div>
                <div className="pt-2">
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 ml-1">Override Entitlements</label>
                   <div className="relative">
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-xs font-black text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none uppercase tracking-widest italic cursor-pointer">
                        <option>Verified Seller Elite</option>
                        <option>Standard Buyer Tier 1</option>
                        <option>System Moderator Candidate</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                   </div>
                </div>
             </div>
          </div>

          {/* Secure Administrative Overrides */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-rose-600 opacity-20"></div>
             <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.25em] mb-8">Secure Master Controls</h3>
             <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-3 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-600 hover:bg-slate-100 uppercase tracking-[0.15em] transition-all">
                  <RotateCcw className="w-4 h-4" />
                  <span>Enforce Pass-Reset</span>
                </button>
                <button className="w-full flex items-center justify-center gap-3 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-600 hover:bg-slate-100 uppercase tracking-[0.15em] transition-all">
                  <LogOut className="w-4 h-4" />
                  <span>Terminate All Sessions</span>
                </button>
                <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
                   <button className="w-full flex items-center justify-center gap-3 py-4 bg-rose-50 text-rose-600 rounded-2xl text-[10px] font-black hover:bg-rose-100 uppercase tracking-[0.15em] transition-all border border-rose-100/50">
                      <Ban className="w-4 h-4" />
                      <span>Suspend Credentials</span>
                   </button>
                   <button className="w-full flex items-center justify-center gap-3 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black hover:bg-rose-700 uppercase tracking-[0.15em] transition-all shadow-xl shadow-rose-200">
                      <Trash2 className="w-4 h-4" />
                      <span>Immediate Obliteration</span>
                   </button>
                </div>
             </div>
          </div>

          {/* Persistent Admin Ledger */}
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6">Persistent Admin Note</h3>
             <textarea 
               rows={4}
               className="w-full bg-white bg-opacity-[0.03] border border-white border-opacity-[0.05] rounded-3xl p-6 text-xs font-medium text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all resize-none mb-6 placeholder:text-slate-600 placeholder:italic"
               placeholder="Add a high-security note regarding this subject..."
             ></textarea>
             <button className="w-full bg-white text-slate-900 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl active:scale-95">
               Archive Observations
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetails;
