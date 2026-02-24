import React from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  CheckCircle, 
  Package, 
  CreditCard, 
  BarChart3, 
  FileText, 
  Settings, 
  Search, 
  Bell, 
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Lock,
  LogOut,
  Camera,
  Edit3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const AdminProfilePage = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-slate-100">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">Shemsu</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Admin Console</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <Users className="w-4 h-4" />
            <span>User Management</span>
          </Link>
          <Link to="/admin/verification" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <CheckCircle className="w-4 h-4" />
            <span>Seller Verification</span>
          </Link>
          <Link to="/admin/moderation" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <Package className="w-4 h-4" />
            <span>Product Moderation</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <CreditCard className="w-4 h-4" />
            <span>Global Orders</span>
          </Link>
          <Link to="/admin/analytics" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <BarChart3 className="w-4 h-4" />
            <span>Reports/Analytics</span>
          </Link>
          <Link to="/admin/logs" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <FileText className="w-4 h-4" />
            <span>Audit Logs</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <Link to="/admin/docs" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <FileText className="w-4 h-4" />
            <span>Documentation</span>
          </Link>
          
          <Link to="/admin/profile" className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 px-2 bg-blue-50 rounded-xl transition-all">
            <div className="w-10 h-10 rounded-full bg-white border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs shadow-sm">AK</div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-slate-900 truncate">Abebe Kebede</span>
              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Senior Moderator</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wider">My Profile</h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-1">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-600 uppercase tracking-widest">Account Settings</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search settings..." 
                className="bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">AK</div>
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
              <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-md transition-all flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>Change Cover</span>
              </button>
            </div>
            <div className="px-8 pb-8">
              <div className="relative -mt-12 flex items-end justify-between mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl font-bold text-slate-400">
                      AK
                    </div>
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-4 border-white hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-6 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    View Public Profile
                  </button>
                  <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">Abebe Kebede</h2>
                <p className="text-slate-500 text-sm font-medium">Senior Platform Moderator • Shemsu Marketplace</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-xs font-bold">abebe.k@shemsu.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <Phone className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-xs font-bold">+251 911 223344</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-xs font-bold">Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Security & Access */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Security & Access</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm">
                        <Lock className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Two-Factor Authentication</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Enhanced account security</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-wider rounded-full border border-emerald-100">Enabled</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Current Password</label>
                      <input 
                        type="password" 
                        defaultValue="••••••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">New Password</label>
                      <input 
                        type="password" 
                        placeholder="Enter new password"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                    Update Security Settings
                  </button>
                </div>
              </section>

              <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Activity</h3>
                </div>
                <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
                  {[
                    { action: 'Logged in from new device', time: '2 hours ago', location: 'Addis Ababa • Chrome / MacOS' },
                    { action: 'Updated platform settings', time: 'Yesterday at 4:30 PM', location: 'System Configuration' },
                    { action: 'Approved 12 seller applications', time: '2 days ago', location: 'Verification Queue' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 relative z-10">
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-sm shrink-0 mt-1"></div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{item.action}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5 uppercase tracking-widest">{item.time} • {item.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Account Info Sidebar */}
            <div className="space-y-8">
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Account Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Role</span>
                    <span className="text-xs font-bold text-blue-600">Senior Moderator</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID Number</span>
                    <span className="text-xs font-bold text-slate-900">#ADM-8821-X</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</span>
                    <span className="text-xs font-bold text-emerald-600">Verified</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Joined</span>
                    <span className="text-xs font-bold text-slate-900">Oct 2023</span>
                  </div>
                </div>
              </section>

              <button className="w-full flex items-center justify-center gap-3 py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold text-sm hover:bg-rose-100 transition-all border border-rose-100">
                <LogOut className="w-5 h-5" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProfilePage;
