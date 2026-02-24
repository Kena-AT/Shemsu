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
  Filter,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Download,
  Mail,
  ShieldCheck,
  Ban,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserManagementPage = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const users = [
    { id: '1', name: 'Alex Rivera', email: 'alex.rivera@example.com', role: 'Seller', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', lastLogin: '2 mins ago', avatar: 'AR' },
    { id: '2', name: 'Sarah Chen', email: 'schen_official@gmail.com', role: 'Buyer', status: 'Suspended', statusColor: 'bg-amber-50 text-amber-600', lastLogin: '3 days ago', avatar: 'SC' },
    { id: '3', name: 'Marcus Thorne', email: 'm.thorne@proton.me', role: 'Seller', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', lastLogin: '12 hours ago', avatar: 'MT' },
    { id: '4', name: 'Julia Vance', email: 'jvance@icloud.com', role: 'Buyer', status: 'Banned', statusColor: 'bg-rose-50 text-rose-600', lastLogin: 'Oct 12, 2023', avatar: 'JV' },
    { id: '5', name: 'David Miller', email: 'd.miller@outlook.com', role: 'Seller', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', lastLogin: 'Yesterday', avatar: 'DM' },
  ];

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
          <Link to="/admin/payouts" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <CreditCard className="w-4 h-4" />
            <span>Payouts</span>
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
            <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wider">User Management</h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-1">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-600 uppercase tracking-widest">Users</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
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
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">AK</div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
              <p className="text-slate-500 text-sm mt-1">Control access, monitor activities, and manage platform roles.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-200">
                <UserPlus className="w-4 h-4" />
                <span>Add New User</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Users', value: '12,840', change: '+12% vs last month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Active Now', value: '1,204', change: 'Live', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Pending Verification', value: '85', change: 'Action Required', icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Suspended Accounts', value: '24', change: '+2 today', icon: Ban, color: 'text-rose-600', bg: 'bg-rose-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                <p className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${stat.color}`}>{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <span>All Roles</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <span className="text-slate-400">Status:</span>
                <span>All</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-all">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 1-10 of 12,840</p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 w-12">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Login</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/admin/users/${user.id}`} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                            {user.avatar}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</span>
                            <span className="text-[11px] text-slate-400 font-medium">{user.email}</span>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${user.role === 'Seller' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 bg-slate-100'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${user.statusColor.split(' ')[0]}`}></div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${user.statusColor.split(' ')[1]}`}>{user.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">{user.lastLogin}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 1 to 10 of 1,284 results</p>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-[10px] font-bold">1</button>
                <button className="w-8 h-8 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-200">2</button>
                <button className="w-8 h-8 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-200">3</button>
                <span className="text-slate-400 px-2">...</span>
                <button className="w-8 h-8 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-200">128</button>
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagementPage;
