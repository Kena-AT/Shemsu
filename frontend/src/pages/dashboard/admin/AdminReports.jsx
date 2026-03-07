import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  UserPlus, 
  Percent, 
  Activity, 
  Clock, 
  Truck, 
  Zap, 
  Download, 
  ChevronRight,
  Monitor,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../../hooks/useAdmin';
import { formatPrice, formatNumber } from '../../../lib/utils';
import Button from '../../../components/common/Button';

const AdminReports = () => {
  const { useGetStats, useGetAnalytics } = useAdmin();
  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { data: analytics, isLoading: analyticsLoading } = useGetAnalytics();

  const [timeRange, setTimeRange] = useState('Weekly');

  const isLoading = statsLoading || analyticsLoading;

  const revenueData = analytics?.revenueData || [
    { day: 'Mon', value: 0 },
    { day: 'Tue', value: 0 },
    { day: 'Wed', value: 0 },
    { day: 'Thu', value: 0 },
    { day: 'Fri', value: 0 },
    { day: 'Sat', value: 0 },
    { day: 'Sun', value: 0 },
  ];

  const categoryData = analytics?.categoryData || [
    { name: 'Electronics', value: 0, color: '#3b82f6' },
    { name: 'Fashion', value: 0, color: '#ec4899' },
    { name: 'Home & Living', value: 0, color: '#f59e0b' },
    { name: 'Beauty', value: 0, color: '#10b981' },
  ];

  const metrics = [
    { label: 'Total Platform Revenue', value: formatPrice(stats?.totalRevenue || 0), change: '+12.5%', icon: TrendingUp, positive: true },
    { label: 'Buyer Service Fees (2%)', value: formatPrice(stats?.buyerFees || 0), change: '+10.2%', icon: Zap, positive: true },
    { label: 'Seller Platform Fees (2%)', value: formatPrice(stats?.sellerFees || 0), change: '+8.4%', icon: Percent, positive: true },
    { label: 'Active Users', value: formatNumber(stats?.totalUsers || 0), change: '+5.2%', icon: Users, positive: true },
  ];

  const topPerformers = analytics?.topPerformers || [];

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Activity className="animate-spin text-blue-600" /></div>;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link to="/admin" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 font-bold">Analytics</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Analytics Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {['Daily', 'Weekly', 'Monthly'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeRange === range 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400">
                <m.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-0.5 text-[10px] font-black italic uppercase tracking-wider ${m.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {m.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {m.change}
              </div>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{m.label}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{m.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Trends */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 italic uppercase tracking-tight">Revenue Trends</h3>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <Filter className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontStyle: 'italic', fontWeight: 900 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', fontStyle: 'italic' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Health */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 italic uppercase tracking-tight">Platform Health</h3>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></div>
              <span className="text-[8px] font-black uppercase tracking-widest">All Systems Operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Server Uptime', value: '99.98%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Support Load', value: 'Low', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Order Fulfillment', value: '1.2 days', icon: Truck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'API Latency', value: '48ms', icon: Clock, color: 'text-rose-600', bg: 'bg-rose-50' },
            ].map((stat, i) => (
              <div key={i} className="space-y-3">
                <div className={`w-10 h-10 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center border ${stat.bg.replace('bg-', 'border-').replace('-50', '-100')}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-lg font-black text-slate-900 italic">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Region: US-East-1</p>
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Categories */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 italic uppercase tracking-tight mb-8">Top Categories</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-900 italic">{formatPrice(482000)}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top Sale</span>
            </div>
          </div>
          <div className="space-y-4 mt-6">
            {categoryData.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }}></div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{c.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent High Performance */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 italic uppercase tracking-tight">Recent High Performance</h3>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-200">
                <Download className="w-3 h-3" />
                <span>Download CSV</span>
              </button>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
            </div>
          </div>

          <div className="overflow-x-auto overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Seller/Product</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Sales Volume</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topPerformers.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                          <Monitor className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{row.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{row.sub}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{row.cat}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-xs font-black text-slate-900">{row.vol}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-${row.color}-200 bg-${row.color}-50 text-${row.color}-600`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Details</button>
                    </td>
                  </tr>
                ))}
                {topPerformers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                      No high performance data available yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
