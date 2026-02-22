import React from 'react';
import { 
  Users, 
  Package, 
  DollarSign, 
  ShieldCheck, 
  AlertCircle,
  TrendingUp,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../../hooks/useAdmin';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const AdminHome = () => {
  const { useGetStats } = useAdmin();
  const { data: stats, isLoading } = useGetStats();

  const statCards = [
    { 
      label: 'Gross Revenue', 
      value: `ETB ${stats?.totalRevenue?.toLocaleString() || '0.00'}`, 
      icon: DollarSign, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10',
      description: 'Platform total sales'
    },
    { 
      label: 'Active Users', 
      value: stats?.totalUsers || '0', 
      icon: Users, 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-500/10',
      description: 'Total buyer/seller base'
    },
    { 
      label: 'Total Inventory', 
      value: stats?.totalProducts || '0', 
      icon: Package, 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/10',
      description: 'Listed marketplaces items'
    }
  ];

  const queues = [
    { 
      label: 'Seller Verification', 
      count: stats?.pendingVerifications || 0, 
      icon: ShieldCheck, 
      to: '/admin/verifications',
      color: 'bg-amber-500/10 text-amber-500' 
    },
    { 
      label: 'Product Moderation', 
      count: stats?.pendingModeration || 0, 
      icon: ShieldAlert, 
      to: '/admin/moderation',
      color: 'bg-red-500/10 text-red-500' 
    }
  ];

  // Placeholder chart data based on stats
  const chartData = [
    { name: 'Revenue', value: stats?.totalRevenue || 100, color: '#10b981' },
    { name: 'Users', value: stats?.totalUsers * 100 || 50, color: '#6366f1' },
    { name: 'Products', value: stats?.totalProducts * 50 || 30, color: '#3b82f6' },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tight uppercase">Command Center</h1>
          <p className="text-slate-500 font-medium mt-1">Real-time platform overview and system integrity.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-slate-800">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
            <TrendingUp size={20} />
          </div>
          <div className="pr-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Status</p>
            <p className="text-sm font-bold text-emerald-400 mt-1 uppercase italic tracking-tighter">Operational</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:border-indigo-500/30 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-4xl font-black text-white mt-1 italic tracking-tighter">{stat.value}</h3>
            <p className="text-xs text-slate-600 mt-4 font-bold uppercase tracking-widest">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem]">
          <h3 className="text-lg font-black text-white uppercase italic tracking-tight mb-8">Platform Weight</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Queues */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Priority Queues</h3>
          {queues.map((queue, i) => (
            <Link 
              key={i}
              to={queue.to}
              className="group block bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:bg-slate-900/60 transition-all border-l-4 border-l-transparent hover:border-l-indigo-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl ${queue.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <queue.icon size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white leading-none">{queue.label}</h4>
                    <p className="text-slate-500 text-xs mt-2 font-bold uppercase tracking-widest">
                      {queue.count} {queue.count === 1 ? 'item' : 'items'} awaiting action
                    </p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}

          <div className="bg-indigo-500/5 border border-dashed border-indigo-500/20 p-8 rounded-[2rem] text-center">
             <AlertCircle className="w-8 h-8 text-indigo-500/50 mx-auto mb-4" />
             <p className="text-[10px] font-black text-indigo-400/50 uppercase tracking-[0.2em] max-w-[200px] mx-auto">
               Regularly review moderation logs to maintain platform health.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
