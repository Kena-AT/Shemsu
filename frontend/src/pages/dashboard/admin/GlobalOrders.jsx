import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Eye, 
  Truck, 
  AlertCircle, 
  Clock, 
  Calendar,
  BarChart3
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../hooks/useAdmin';
import { motion } from 'framer-motion';
import { exportToCSV } from '../../../lib/exportUtils';
import { toast } from 'react-hot-toast';

const GlobalOrders = () => {
  const [params, setParams] = useState({ search: '', status: '' });
  const { useGetStats } = useAdmin();
  const { data: stats, isLoading: statsLoading } = useGetStats();

  const navigate = useNavigate();
  const { useGetGlobalOrders } = useAdmin();
  const { data: orders, isLoading } = useGetGlobalOrders();

  const handleExport = () => {
    if (!orders || !orders.length) return toast.error('No data available for export');
    exportToCSV(orders, `shemsu_orders_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Order history export initiated');
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'processing': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'pending': return 'bg-slate-50 text-slate-600 border-slate-100';
      case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate stats from real data
  const totalRevenue = orders?.reduce((sum, order) => sum + (order.paymentStatus === 'paid' ? Number(order.totalAmount) : 0), 0) || 0;
  const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;
  const totalOrders = orders?.length || 0;

  const statsData = [
    { label: 'Total Orders', value: totalOrders.toLocaleString(), change: '+8%', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Net Revenue', value: `ETB ${totalRevenue.toLocaleString()}`, change: '+14%', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Payouts', value: 'ETB 12,400', change: '85 Sellers', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' }, // Assuming this is not directly from orders
    { label: 'Disputed Orders', value: '14', change: 'Audit Req', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' }, // Assuming this is not directly from orders
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Global Order List</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor and manage all transactions across the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest"
          >
            <Download className="w-4 h-4" />
            <span>Export History</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-200 uppercase tracking-widest">
            <Truck className="w-4 h-4" />
            <span>Process Queue</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Orders', value: stats?.totalOrders?.toLocaleString() || '4,284', change: '+8%', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Net Revenue', value: `ETB ${stats?.totalRevenue?.toLocaleString() || '84,250'}`, change: '+14%', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Payouts', value: 'ETB 12,400', change: '85 Sellers', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Disputed Orders', value: '14', change: 'Audit Req', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
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
              placeholder="Order ID, Customer..." 
              className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
              value={params.search}
              onChange={(e) => setParams({ ...params, search: e.target.value })}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Last 30 Days</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>All Statuses</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 1-10 of 4,284 results</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 w-12 text-center">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date / Time</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Financials</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders?.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <Link to={`/admin/orders/${order.id}`} className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase italic">
                      #{order.id.toString().substring(0, 8).toUpperCase()}
                    </Link>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-slate-900">{order.buyerName}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Verified Account</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-500 uppercase italic">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-slate-900 italic">
                    ETB {Number(order.totalAmount).toLocaleString()}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-transparent shadow-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-transparent shadow-sm ${order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                     <Link to={`/admin/orders/${order.id}`} className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center w-fit">
                        <ChevronRight className="w-4 h-4" />
                     </Link>
                  </td>
                </tr>
              ))}
              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan="7" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Package size={48} className="mb-4 opacity-10" />
                      <p className="text-xs font-black uppercase tracking-[0.2em]">No transactional data detected in matrix</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Page 1 of 42</p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-[10px] font-bold">1</button>
            <button className="w-8 h-8 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-200">2</button>
            <button className="w-8 h-8 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-200">3</button>
            <span className="text-slate-400 px-2 font-bold text-xs">...</span>
            <button className="w-8 h-8 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-200">42</button>
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalOrders;
