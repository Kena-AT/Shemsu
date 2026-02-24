import React, { useState } from 'react';
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
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Edit3,
  TrendingUp,
  MoreVertical,
  RotateCcw,
  Ban,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Clock,
  LogOut
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AdminUserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Associated Products');

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
          <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm transition-all">
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
          
          <Link to="/admin/profile" className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 px-2 hover:bg-slate-50 rounded-xl transition-all">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">AK</div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-slate-900 truncate">Abebe Kebede</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Senior Moderator</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wider">User Details</h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-1">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span>Users</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-600 uppercase tracking-widest">Details</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Profile Header */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 shadow-inner">
                  AR
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-slate-900">Alex Rivera</h1>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-100">Active</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-100">Verified Seller</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>alex.rivera@example.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>New York, USA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Joined Oct 12, 2023</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  <MessageSquare className="w-4 h-4" />
                  <span>Message</span>
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-blue-200">
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t border-slate-100">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Orders</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-900">142</h3>
                  <span className="text-xs font-bold text-emerald-600">+12%</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-900">$12,450.00</h3>
                  <span className="text-xs font-bold text-emerald-600">+5.4%</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Trust Score</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-900">98.2%</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stable</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Login</p>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">2h ago</span>
                  <span className="text-[10px] text-slate-400 font-medium">192.168.1.45 • Chrome • MacOS Ventura</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Activity Tabs */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-100">
                  {['Associated Products', 'Order History', 'Transaction Logs'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-5 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {tab}
                      {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>}
                    </button>
                  ))}
                </div>
                <div className="p-8">
                  {activeTab === 'Associated Products' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Product List</h4>
                        <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">View All 24 Products</button>
                      </div>
                      <div className="space-y-4">
                        {[
                          { name: 'ProX Wireless Mouse', category: 'Electronics', price: '$89.00', stock: 45, status: 'IN STOCK', color: 'text-emerald-600 bg-emerald-50' },
                          { name: 'Mechanical Keyboard TKL', category: 'Electronics', price: '$159.99', stock: 12, status: 'LOW STOCK', color: 'text-amber-600 bg-amber-50' },
                          { name: 'Noise Cancel Headphones', category: 'Audio', price: '$299.00', stock: 0, status: 'SOLD OUT', color: 'text-rose-600 bg-rose-50' },
                        ].map((product, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all group cursor-pointer">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-300">
                                <Package className="w-6 h-6" />
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{product.name}</h5>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{product.category}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-12">
                              <div className="text-right">
                                <p className="text-sm font-bold text-slate-900">{product.price}</p>
                                <p className="text-[10px] text-slate-400 font-medium">{product.stock} units</p>
                              </div>
                              <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider ${product.color}`}>
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

              {/* Audit Trail */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-8">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Administrative Audit Trail</h3>
                </div>
                <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  {[
                    { action: 'Password reset by Admin @sarah_c', time: 'Oct 24, 2023 • 02:34 PM', icon: RotateCcw, color: 'bg-blue-50 text-blue-600' },
                    { action: 'Account verified and seller status approved', time: 'Oct 14, 2023 • 10:15 AM', icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
                    { action: 'Role updated from Buyer to Seller', time: 'Oct 13, 2023 • 11:20 AM', icon: Users, color: 'bg-indigo-50 text-indigo-600' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-white ${item.color}`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.action}</p>
                        <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Actions & Status */}
            <div className="space-y-8">
              {/* Account Status */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Account Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Standing</span>
                    <span className="text-xs font-bold text-emerald-600">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">KYC Verification</span>
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">Complete</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Password Change</span>
                    <span className="text-xs font-bold text-slate-900">2 days ago</span>
                  </div>
                  <div className="pt-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Override Account Role</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                      <option>Verified Seller</option>
                      <option>Buyer</option>
                      <option>Moderator</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Administrative Actions */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Administrative Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Password</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    <LogOut className="w-4 h-4" />
                    <span>Force Session Logout</span>
                  </button>
                  <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all">
                      <Ban className="w-4 h-4" />
                      <span>Suspend Account</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">
                      <Trash2 className="w-4 h-4" />
                      <span>Permanent Delete</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Admin Notes</h3>
                <textarea 
                  rows={4}
                  placeholder="Add a private note about this user..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none mb-4"
                ></textarea>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUserDetailsPage;
