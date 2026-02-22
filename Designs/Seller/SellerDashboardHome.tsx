import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  Search, 
  Bell, 
  Plus,
  TrendingUp,
  MoreVertical,
  ExternalLink
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
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Week 1', value: 4000 },
  { name: 'Week 2', value: 3000 },
  { name: 'Week 3', value: 5000 },
  { name: 'Week 4', value: 4500 },
  { name: 'Week 5', value: 6000 },
  { name: 'Week 6', value: 5500 },
  { name: 'Week 7', value: 7000 },
];

const SellerDashboardHome = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">Shemsu</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Seller Portal</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link to="/seller/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </Link>
          <Link to="/seller/products" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <Package className="w-5 h-5" />
            <span>Products</span>
          </Link>
          <Link to="/seller/orders" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span>Orders</span>
          </Link>
          <Link to="/seller/analytics" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link to="/seller/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <Link to="/seller/support" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
          </Link>
          
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 px-2">
            <img 
              src="https://picsum.photos/seed/seller/40/40" 
              alt="Alex Rivera" 
              className="w-10 h-10 rounded-full border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-slate-900 truncate">Alex Rivera</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Store Owner</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
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
        </header>

        <div className="p-8 space-y-8">
          {/* Welcome Section */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Good morning, Alex!</h2>
            <p className="text-slate-500 mt-1">Here's what's happening with your store today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Sales', value: '$12,450.00', change: '+12%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Active Products', value: '48', change: 'Stable', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Pending Orders', value: '5', change: '+2%', icon: ShoppingCart, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </motion.div>
            ))}
          </div>

          {/* Revenue Forecast Chart */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Revenue Forecast</h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold text-slate-900">$12,450.00</span>
                  <span className="text-emerald-600 text-sm font-bold">+12.5% from last month</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg">
                <button className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-white rounded-md shadow-sm">Last 30 Days</button>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">Last 7 Days</button>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
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
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
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

          {/* Recent Orders Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
              <button className="text-blue-600 text-sm font-bold hover:underline">View All Orders</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { id: '#ORD-2481', date: 'Oct 24, 2023', customer: 'Jane Doe', avatar: 'JD', price: '$342.00', status: 'Shipped', statusColor: 'bg-emerald-50 text-emerald-600' },
                    { id: '#ORD-2480', date: 'Oct 23, 2023', customer: 'Marcus Brown', avatar: 'MB', price: '$1,204.50', status: 'Processing', statusColor: 'bg-blue-50 text-blue-600' },
                    { id: '#ORD-2479', date: 'Oct 23, 2023', customer: 'Sarah Lee', avatar: 'SL', price: '$89.99', status: 'Delivered', statusColor: 'bg-indigo-50 text-indigo-600' },
                    { id: '#ORD-2478', date: 'Oct 22, 2023', customer: 'Tom Miller', avatar: 'TM', price: '$520.00', status: 'Cancelled', statusColor: 'bg-slate-100 text-slate-500' },
                  ].map((order, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200">
                            {order.avatar}
                          </div>
                          <span className="text-sm font-medium text-slate-900">{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboardHome;
