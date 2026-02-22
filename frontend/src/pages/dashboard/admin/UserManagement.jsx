import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  UserX, 
  UserCheck, 
  Trash2, 
  Mail,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useAdmin } from '../../../hooks/useAdmin';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const [params, setParams] = useState({ search: '', role: '', status: '' });
  const { useGetUsers, updateStatus } = useAdmin();
  const { data: usersData, isLoading } = useGetUsers(params);
  
  const [editingUser, setEditingUser] = useState(null);
  const [statusReason, setStatusReason] = useState('');
  const [newStatus, setNewStatus] = useState('');

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'suspended': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'banned': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tight uppercase">User Registry</h1>
          <p className="text-slate-500 font-medium mt-1">Manage global access and behavioral overrides.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/40 p-4 rounded-3xl border border-slate-800">
        <div className="relative col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value })}
          />
        </div>
        <select 
          className="bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none"
          value={params.role}
          onChange={(e) => setParams({ ...params, role: e.target.value })}
        >
          <option value="">All Roles</option>
          <option value="buyer">Buyers</option>
          <option value="seller">Sellers</option>
          <option value="admin">Admins</option>
        </select>
        <select 
          className="bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none"
          value={params.status}
          onChange={(e) => setParams({ ...params, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Identity</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Joined</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {usersData?.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-800/20 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold border border-slate-700">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {user.fullName} {user.isDeleted && <span className="ml-2 text-[10px] bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded border border-red-500/20 uppercase tracking-tighter">Deleted</span>}
                        </span>
                        <span className="text-xs text-slate-500">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Shield className={`w-3 h-3 ${user.role === 'admin' ? 'text-indigo-500' : user.role === 'seller' ? 'text-blue-500' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter border ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => { setEditingUser(user); setNewStatus('active'); }}
                         className="p-2 text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all"
                         title="Activate"
                       >
                         <UserCheck size={18} />
                       </button>
                       <button 
                         onClick={() => { setEditingUser(user); setNewStatus('suspended'); }}
                         className="p-2 text-slate-500 hover:text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all"
                         title="Suspend"
                       >
                         <AlertTriangle size={18} />
                       </button>
                       <button 
                         onClick={() => { setEditingUser(user); setNewStatus('banned'); }}
                         className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                         title="Ban"
                       >
                         <UserX size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
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
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl"
            >
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${getStatusColor(newStatus)}`}>
                  {newStatus === 'active' ? <UserCheck size={32} /> : <AlertTriangle size={32} />}
                </div>
                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Confirm Status Change</h3>
                <p className="text-slate-500 text-sm mt-2">
                  Updating <strong>{editingUser.fullName}</strong> to <strong>{newStatus}</strong>.
                </p>
              </div>

              <form onSubmit={handleStatusChange} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Mandatory Reason</label>
                  <textarea 
                    autoFocus
                    required
                    rows={3}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="Provide justification for this administrative override..."
                    value={statusReason}
                    onChange={(e) => setStatusReason(e.target.value)}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="flex-1 py-4 text-xs font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all ${
                      newStatus === 'active' ? 'bg-emerald-600 shadow-emerald-600/20' : newStatus === 'banned' ? 'bg-red-600 shadow-red-600/20' : 'bg-amber-600 shadow-amber-600/20'
                    }`}
                  >
                    Execute Change
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
