import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  CheckCircle, 
  CreditCard, 
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../../hooks/useAdmin';

const AdminHome = () => {
  const { useGetStats } = useAdmin();
  const { data: stats, isLoading } = useGetStats();

  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
    { name: 'Jul', value: stats?.totalRevenue ? Math.min(stats.totalRevenue / 10, 10000) : 7000 },
  ];

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers?.toLocaleString() || '0', change: '+12.5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Products', value: stats?.totalProducts?.toLocaleString() || '0', change: '+5.2%', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Revenue (ETB)', value: `ETB ${stats?.totalRevenue?.toLocaleString() || '0.00'}`, change: '+18.2%', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Sellers', value: stats?.totalSellers?.toLocaleString() || '0', change: '-2.1%', icon: CheckCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revenue Performance</h3>
              <p className="text-slate-400 text-xs font-medium">Platform earnings over the last 7 months</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly</span>
              <div className="w-10 h-5 bg-slate-100 rounded-full relative p-1 cursor-pointer">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 700, color: '#0f172a' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Awaiting Verification */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Awaiting Verification</h3>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{stats?.pendingVerifications || 0} Required</span>
            </div>
            <div className="space-y-4">
              {stats?.recentVerifications?.length > 0 ? stats.recentVerifications.map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200">
                      {item.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{item.type}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </div>
              )) : (
                <p className="text-xs text-slate-400 italic text-center py-4">No pending verifications</p>
              )}
            </div>
            <Link to="/admin/verifications" className="w-full mt-6 flex items-center justify-center py-2.5 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition-all">
              Go to Verification Queue
            </Link>
          </div>

          {/* Reported Products */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Product Moderation</h3>
            <div className="flex items-center gap-6 mb-6">
              <div className={`w-16 h-16 rounded-full border-4 ${stats?.pendingModeration > 0 ? 'border-rose-500' : 'border-emerald-500'} border-t-slate-100 flex items-center justify-center`}>
                <span className="text-sm font-bold text-slate-900">{stats?.pendingModeration || 0}</span>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 leading-none">Pending Items</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Awaiting review</p>
              </div>
            </div>
            <Link to="/admin/moderation" className="w-full flex items-center justify-center py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
              Launch Moderator
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent System Activity</h3>
          <Link to="/admin/audit" className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">View All Logs</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Event</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats?.recentActivity?.length > 0 ? stats.recentActivity.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${log.status === 'Success' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                      <span className="text-xs font-bold text-slate-900">{log.event}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">{log.entity}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{log.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      log.status === 'Success' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-xs text-slate-400 italic">No recent activity recorded</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
