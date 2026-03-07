import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Download,
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
  BarChart,
  Bar
} from 'recharts';
import { useOrder } from '../../../hooks/useOrder';
import { formatPrice, formatNumber } from '../../../lib/utils';
import { motion } from 'framer-motion';

const SellerAnalytics = () => {
  const { useGetSellerAnalytics } = useOrder();
  const { data: analytics, isLoading } = useGetSellerAnalytics();

  if (isLoading) {
    return <div className="p-8 flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Financial Analytics</h1>
          <p className="text-slate-500 mt-1">Deep dive into your revenue and sales performance</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 flex items-center shadow-sm hover:bg-slate-50 transition-all text-left">
            <Filter size={18} className="mr-2 text-slate-400" />
            Last 30 Days
          </button>
          <button className="bg-blue-600 px-4 py-2 rounded-xl text-sm font-bold text-white flex items-center shadow-md shadow-blue-100 hover:bg-blue-700 transition-all">
            <Download size={18} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <TrendingUp size={24} />
            </div>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUpRight size={12} className="mr-1" />
              12%
            </span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Revenue</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">{formatPrice(analytics?.revenue || 0)}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
              <BarChart3 size={24} />
            </div>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUpRight size={12} className="mr-1" />
              5%
            </span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Sales Velocity</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">{formatNumber(analytics?.orders || 0)} Orders</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4 text-left">
            <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
              <Calendar size={24} />
            </div>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Average Order Value</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">
            {analytics?.orders > 0 ? formatPrice(analytics.revenue / analytics.orders) : formatPrice(0)}
          </h3>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-left">
        <h3 className="text-xl font-bold text-slate-900 mb-8">Revenue Growth</h3>
        <div className="h-[400px] w-full">
          {!analytics?.chartData || analytics.chartData.length === 0 ? (
            <div className="h-full w-full flex flex-col items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <TrendingUp size={48} className="text-slate-200 mb-4" />
              <p className="text-slate-500 font-medium">Insufficient data for trending</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.chartData}>
                <defs>
                  <linearGradient id="colorValueAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValueAnalytics)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics;
