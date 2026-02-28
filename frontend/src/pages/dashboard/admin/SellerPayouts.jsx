import React, { useState } from 'react';
import { 
  CreditCard, 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/common/Button';

const SellerPayouts = () => {
  const [selectedPayouts, setSelectedPayouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const payoutStats = [
    { label: 'Total Payouts', value: '$1,284,450.00', change: '+12.5% vs last month', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Payouts', value: '$12,300.50', sub: '14 transactions awaiting approval', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Next Scheduled Payout', value: 'Oct 25, 2023', sub: 'Scheduled in 3 days', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const payouts = [
    { id: 'PAY-882190', seller: 'Artisan Makers Ltd.', bank: 'Chase **** 9901', amount: '$4,500.00', date: 'Oct 22, 2023', status: 'Completed', logo: 'AM' },
    { id: 'PAY-882191', seller: 'Green Horizon', bank: 'BofA **** 4412', amount: '$1,250.75', date: 'Oct 23, 2023', status: 'Pending', logo: 'GH' },
    { id: 'PAY-882192', seller: 'Urban Threads', bank: 'Wells **** 1019', amount: '$840.00', date: 'Oct 23, 2023', status: 'Failed', logo: 'UT' },
    { id: 'PAY-882193', seller: 'Silk & Velvet', bank: 'Citi **** 0056', amount: '$2,105.20', date: 'Oct 24, 2023', status: 'Pending', logo: 'SV' },
  ];

  const toggleSelect = (id) => {
    setSelectedPayouts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Failed': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {payoutStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center border border-slate-100`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-xl font-black text-slate-900 italic tracking-tight">{stat.value}</h3>
              {stat.change && <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tight">{stat.change}</p>}
              {stat.sub && <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{stat.sub}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by Seller Name or Payout ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-11 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 focus:outline-none cursor-pointer"
            >
              <option value="All">Status: All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 focus:outline-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>All Time</option>
            </select>
          </div>
        </div>
        <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-colors">
          <Filter size={18} />
        </button>
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden relative">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 w-10 text-center">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => {
                    if (e.target.checked) setSelectedPayouts(payouts.map(p => p.id));
                    else setSelectedPayouts([]);
                  }}
                  checked={selectedPayouts.length === payouts.length && payouts.length > 0}
                />
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payout ID</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Seller</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Bank Account</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Amount</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Date</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-5 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payouts.map((p, i) => (
              <tr 
                key={p.id} 
                className={`hover:bg-slate-50/50 transition-colors group ${selectedPayouts.includes(p.id) ? 'bg-blue-50/30' : ''}`}
                onClick={() => toggleSelect(p.id)}
              >
                <td className="px-8 py-6 w-10 text-center" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedPayouts.includes(p.id)}
                    onChange={() => toggleSelect(p.id)}
                  />
                </td>
                <td className="px-6 py-6 text-[11px] font-black text-blue-600 italic tracking-tighter">
                  {p.id}
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-200 uppercase tracking-wider">
                      {p.logo}
                    </div>
                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{p.seller}</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{p.bank}</span>
                </td>
                <td className="px-6 py-6 text-center text-xs font-black text-slate-900 italic">
                  {p.amount}
                </td>
                <td className="px-6 py-6 text-center text-[10px] font-bold text-slate-400 uppercase">
                  {p.date}
                </td>
                <td className="px-6 py-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(p.status)}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-8 py-6 w-10 text-right">
                  <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100 group-hover:bg-white group-hover:shadow-sm">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bulk Action Overlay */}
        <AnimatePresence>
          {selectedPayouts.length > 0 && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-blue-600 rounded-[28px] p-4 shadow-2xl shadow-blue-500/40 flex items-center justify-between border border-blue-400/30 z-20"
            >
              <div className="flex items-center gap-4 px-4 text-white">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black italic">{selectedPayouts.length} pending payouts selected</span>
                  <span className="text-[9px] font-medium opacity-80 uppercase tracking-widest">Secured payment processing ready</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedPayouts([])}
                  className="px-6 py-3 rounded-2xl text-xs font-black text-white hover:bg-white/10 transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button className="px-8 py-3 bg-white rounded-2xl text-xs font-black text-blue-600 shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Confirm Approval</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between px-4 pb-12">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 1 to 10 of 248 entries</p>
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><ChevronLeft size={16} /></button>
          {[1, 2, 3].map(i => (
            <button key={i} className={`w-8 h-8 rounded-xl text-[10px] font-black transition-all ${i === 1 ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-100 uppercase'}`}>{i}</button>
          ))}
          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export default SellerPayouts;
