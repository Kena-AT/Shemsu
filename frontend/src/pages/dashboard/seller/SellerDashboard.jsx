import React from 'react';
import { 
  Search, 
  Bell, 
  Plus,
  TrendingUp,
  Package,
  ShoppingCart,
  MoreVertical,
  BarChart3,
  Calendar,
  Clock,
  ChevronRight
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
import { useAuthStore } from '../../../state/useAuthStore';
import { useProducts } from '../../../hooks/useProducts';
import { useOrder } from '../../../hooks/useOrder';
import { formatPrice, formatNumber } from '../../../lib/utils';

const SellerDashboard = () => {
  const { user } = useAuthStore();
  const { useGetSellerStats } = useProducts();
  const { useGetSellerAnalytics, useGetSellerOrders } = useOrder();

  const { data: statsData, isLoading: statsLoading } = useGetSellerStats();
  const { data: analytics, isLoading: analyticsLoading } = useGetSellerAnalytics();
  const { data: recentOrders, isLoading: ordersLoading } = useGetSellerOrders();

  const firstName = user?.fullName?.split(' ')[0] || 'there';

  const stats = [
    { 
      label: 'Gross Revenue', 
      value: analyticsLoading ? '...' : formatPrice(analytics?.revenue || 0), 
      change: analytics?.revenue > 0 ? '+ Live' : 'No data', 
      icon: TrendingUp, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50' 
    },
    { 
      label: 'Active Products', 
      value: statsLoading ? '...' : formatNumber(statsData?.active || 0), 
      change: 'Live', 
      icon: Package, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50' 
    },
    { 
      label: 'Total Orders', 
      value: analyticsLoading ? '...' : formatNumber(analytics?.orders || 0), 
      change: analytics?.orders > 0 ? '+ Live' : 'No data', 
      icon: ShoppingCart, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50' 
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="fixed top-0 left-0 lg:left-64 right-0 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-10">
        <h1 className="text-xl font-bold text-slate-900">Seller Dashboard Home</h1>
        
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <Link 
              to="/seller/products/add" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm shadow-blue-200"
            >
              <Plus className="w-4 h-4" />
              <span>New Product</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-20 space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">Good morning, {firstName}!</h2>
          <p className="text-slate-500 mt-1">Here's a snapshot of your business performance today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-blue-200 transition-all cursor-default"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${stat.bg} ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Revenue Forecast Chart */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revenue Analytics</h3>
              <p className="text-slate-500 text-sm">Visualize your growth and sales trends</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
              <button className="px-4 py-1.5 text-xs font-bold text-blue-600 bg-white rounded-lg shadow-sm">Last 30 Days</button>
              <button className="px-4 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Last 7 Days</button>
            </div>
          </div>
          
          <div className="h-[300px] w-full flex flex-col items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 mt-4 relative group">
            {!analytics?.chartData || analytics.chartData.length === 0 ? (
               <>
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 rounded-xl">
                  <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 text-center max-w-[200px]">
                    <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-900">No Sales Data</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">Analytics will appear here automatically after your first sale.</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-8 absolute">
                  <BarChart3 className="w-12 h-12 text-slate-200 mb-4" />
                  <h4 className="text-slate-900 font-bold">No Revenue Data Yet</h4>
                  <p className="text-slate-400 text-sm text-center max-w-[280px] mt-1">Start selling to see your revenue charts populated with real-time data.</p>
                </div>
               </>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10}} 
                    minTickGap={30}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10}}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
              <p className="text-slate-500 text-xs mt-0.5 font-medium">Track your latest customer transactions</p>
            </div>
            <Link 
              to="/seller/orders"
              className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              Manage Orders
            </Link>
          </div>
          
          {!recentOrders || recentOrders.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h4 className="text-slate-900 font-bold text-lg">Your order list is empty</h4>
              <p className="text-slate-400 text-sm max-w-[320px] mt-2 leading-relaxed">
                When customers purchase your products, they will appear here. Build your inventory to start receiving orders.
              </p>
              <Link 
                to="/seller/products/new" 
                className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
              >
                <span>List a new product</span>
                <Plus className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order / Customer</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Items</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Revenue</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.slice(0, 5).map((order) => {
                    const sellerTotal = order.sellerSpecificItems.reduce((sum, item) => sum + (parseFloat(item.priceAtPurchase) * item.quantity), 0);
                    return (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">#{order.txRef.split('-')[1]}</span>
                            <span className="text-xs text-slate-500">{order.buyer?.fullName || 'Guest'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2">
                            {order.sellerSpecificItems.slice(0, 3).map((item, idx) => (
                              <div key={idx} className="w-8 h-8 rounded-lg border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                                <img src={item.productImageSnapshot} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                            {order.sellerSpecificItems.length > 3 && (
                              <div className="w-8 h-8 rounded-lg border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm">
                                +{order.sellerSpecificItems.length - 3}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-slate-900">{formatPrice(sellerTotal)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-emerald-600">
                            <Clock className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{order.paymentStatus === 'paid' ? 'Processing' : 'Pending'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link to="/seller/orders" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all inline-block shadow-sm">
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
