import React, { useState } from 'react';
import { 
  Users, 
  Search, 
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
  Clock,
  UserCheck,
  AlertTriangle,
  UserX
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../../hooks/useAdmin';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToCSV } from '../../../lib/exportUtils';

const UserManagement = () => {
  const [params, setParams] = useState({ search: '', role: '', status: '' });
  const { useGetUsers, updateStatus, useGetStats } = useAdmin();
  const { data: usersData, isLoading } = useGetUsers(params);
  const { data: stats } = useGetStats();
  
  const [editingUser, setEditingUser] = useState(null);
  const [statusReason, setStatusReason] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleExport = () => {
    if (!usersData || !usersData.length) return toast.error('No data available for export');
    exportToCSV(usersData, `shemsu_users_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Registry export initiated');
  };

  const handleStatusChange = (e) => {
    e.preventDefault();
    if (!statusReason) return toast.error('A reason is mandatory for status changes.');

    updateStatus.mutate(
      { id: editingUser.id, status: newStatus, reason: statusReason },
      {
        onSuccess: () => {
          toast.success(`User status updated to ${newStatus}`);
          setEditingUser(null);
          setStatusReason('');
        },
        onError: (err) => toast.error(err.response?.data?.message || 'Update failed')
      }
    );
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'active': return { color: 'bg-emerald-50 text-emerald-600', dot: 'bg-emerald-500' };
      case 'suspended': return { color: 'bg-amber-50 text-amber-600', dot: 'bg-amber-500' };
      case 'banned': return { color: 'bg-rose-50 text-rose-600', dot: 'bg-rose-500' };
      default: return { color: 'bg-slate-50 text-slate-500', dot: 'bg-slate-400' };
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">Control access, monitor activities, and manage platform roles.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest"
          >
            <Download className="w-4 h-4" />
            <span>Export Registry</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-200 uppercase tracking-widest">
            <UserPlus className="w-4 h-4" />
            <span>Add New Admin</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: stats?.totalUsers?.toLocaleString() || '0', change: '+12% vs last month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Now', value: stats?.activeUsers?.toLocaleString() || '0', change: 'Live Telemetry', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Verification', value: stats?.pendingVerifications || '0', change: 'Action Required', icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Suspended Accounts', value: stats?.suspendedUsers || '0', change: 'Platform Overrides', icon: Ban, color: 'text-rose-600', bg: 'bg-rose-50' },
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
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by identity..." 
              className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
              value={params.search}
              onChange={(e) => setParams({ ...params, search: e.target.value })}
            />
          </div>
          <select 
            className="bg-white border border-slate-200 rounded-xl py-2 px-4 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={params.role}
            onChange={(e) => setParams({ ...params, role: e.target.value })}
          >
            <option value="">All Roles</option>
            <option value="buyer">Buyers</option>
            <option value="seller">Sellers</option>
            <option value="admin">Administrators</option>
          </select>
          <select 
            className="bg-white border border-slate-200 rounded-xl py-2 px-4 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={params.status}
            onChange={(e) => setParams({ ...params, status: e.target.value })}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing {usersData?.length || 0} results</p>
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
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usersData?.map((user) => {
                const statusInfo = getStatusInfo(user.status);
                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col text-left">
                          <Link to={`/admin/users/${user.id}`} className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                            {user.fullName}
                            {user.isDeleted && <span className="ml-2 text-[9px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-md border border-rose-100 uppercase tracking-tighter">Deleted</span>}
                          </Link>
                          <span className="text-[11px] text-slate-400 font-medium">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        user.role === 'admin' ? 'text-indigo-600 bg-indigo-50' : 
                        user.role === 'seller' ? 'text-blue-600 bg-blue-50' : 
                        'text-slate-600 bg-slate-100'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`}></div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${statusInfo.color.split(' ')[1]}`}>{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                         <button 
                           onClick={() => { setEditingUser(user); setNewStatus('active'); }}
                           className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                           title="Activate"
                         >
                           <UserCheck size={16} />
                         </button>
                         <button 
                           onClick={() => { setEditingUser(user); setNewStatus('suspended'); }}
                           className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                           title="Suspend"
                         >
                           <AlertTriangle size={16} />
                         </button>
                         <button 
                           onClick={() => { setEditingUser(user); setNewStatus('banned'); }}
                           className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                           title="Ban"
                         >
                           <UserX size={16} />
                         </button>
                          <div className="w-[1px] h-4 bg-slate-200 mx-1"></div>
                          
                          <div className="relative">
                            <button 
                              onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                              className={`p-2 rounded-lg transition-all ${activeDropdown === user.id ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            <AnimatePresence>
                              {activeDropdown === user.id && (
                                <>
                                  <div className="fixed inset-0 z-20" onClick={() => setActiveDropdown(null)} />
                                  <motion.div 
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 overflow-hidden py-2"
                                  >
                                    <button 
                                      onClick={() => {
                                        navigator.clipboard.writeText(user.id);
                                        toast.success('Identity internal ID copied');
                                        setActiveDropdown(null);
                                      }}
                                      className="w-full text-left px-4 py-2 text-[10px] font-bold text-slate-600 hover:bg-slate-50 uppercase tracking-wider flex items-center gap-3"
                                    >
                                      <ShieldCheck className="w-3.5 h-3.5" />
                                      <span>Copy Identity</span>
                                    </button>
                                    <button 
                                      onClick={() => {
                                         toast.success(`Communication channel opened with ${user.fullName}`);
                                         setActiveDropdown(null);
                                      }}
                                      className="w-full text-left px-4 py-2 text-[10px] font-bold text-slate-600 hover:bg-slate-50 uppercase tracking-wider flex items-center gap-3"
                                    >
                                      <Mail className="w-3.5 h-3.5" />
                                      <span>Direct Message</span>
                                    </button>
                                    <div className="h-[1px] bg-slate-100 my-1"></div>
                                    <button 
                                      onClick={() => {
                                         toast.error('System reset requires Level 5 authorization');
                                         setActiveDropdown(null);
                                      }}
                                      className="w-full text-left px-4 py-2 text-[10px] font-bold text-rose-600 hover:bg-rose-50 uppercase tracking-wider flex items-center gap-3"
                                    >
                                      <RotateCcw className="w-3.5 h-3.5" />
                                      <span>System Reset</span>
                                    </button>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reason Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setEditingUser(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-10 shadow-2xl"
            >
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${getStatusInfo(newStatus).color}`}>
                  {newStatus === 'active' ? <UserCheck size={32} /> : <AlertTriangle size={32} />}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Confirm Status Override</h3>
                <p className="text-slate-500 text-sm mt-2">
                  Setting <strong>{editingUser.fullName}</strong> to <strong>{newStatus.toUpperCase()}</strong>.
                </p>
              </div>

              <form onSubmit={handleStatusChange} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Administrative Justification</label>
                  <textarea 
                    autoFocus
                    required
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                    placeholder="Provide mandatory reason for this manual override..."
                    value={statusReason}
                    onChange={(e) => setStatusReason(e.target.value)}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="flex-1 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all ${
                      newStatus === 'active' ? 'bg-emerald-600 shadow-emerald-200' : newStatus === 'banned' ? 'bg-rose-600 shadow-rose-200' : 'bg-amber-600 shadow-amber-200'
                    }`}
                  >
                    Commit Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
