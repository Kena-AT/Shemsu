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
import { useAdmin } from '../../../hooks/useAdmin';
import { formatPrice, formatNumber } from '../../../lib/utils';

const SellerPayouts = () => {
  const { useGetPayouts, processPayout } = useAdmin();
  const { data: payoutData, isLoading } = useGetPayouts();

  const [selectedPayouts, setSelectedPayouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const payoutStats = [
    { 
      label: 'Total Payouts', 
      value: formatPrice(payoutData?.stats?.totalPayouts || 0), 
      change: '+12.5% vs last month', 
      icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' 
    },
    { 
      label: 'Pending Balance', 
      value: formatPrice(payoutData?.stats?.pendingAmount || 0), 
      sub: `${formatNumber(payoutData?.stats?.pendingCount || 0)} transactions awaiting approval`, 
      icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' 
    },
    { 
      label: 'Seller Balances', 
      value: `${formatNumber(payoutData?.balances?.length || 0)} Sellers`, 
      sub: 'Total with positive balance', 
      icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' 
    },
  ];

  const history = payoutData?.history || [];

  const toggleSelect = (id) => {
    setSelectedPayouts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleProcessPayout = async (payout) => {
    try {
      if (window.confirm(`Process payout of ${formatPrice(payout.balance)} to ${payout.seller_name}?`)) {
        await processPayout.mutateAsync({
          sellerId: payout.seller_id,
          amount: payout.balance,
          txRef: `PAY-${Date.now()}-${payout.seller_id.slice(0, 4)}`,
          reason: 'Scheduled seller payout'
        });
      }
    } catch (error) {
       // Error handled by mutation
    }
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
        <div className="flex items-center justify-between px-8 py-5 bg-slate-50/50 border-b border-slate-100">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Balances for Payout</h4>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-slate-50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Seller</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Total Earned</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Total Paid</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Available Balance</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payoutData?.balances?.filter(b => parseFloat(b.balance) > 0).map((b, i) => (
              <tr key={b.seller_id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-200 uppercase tracking-wider">
                      {b.seller_name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{b.seller_name}</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-center text-[10px] font-bold text-slate-500 uppercase">
                  {formatPrice(parseFloat(b.total_earned))}
                </td>
                <td className="px-6 py-6 text-center text-[10px] font-bold text-slate-500 uppercase">
                  {formatPrice(parseFloat(b.total_paid))}
                </td>
                <td className="px-6 py-6 text-center text-xs font-black text-emerald-600 italic">
                  {formatPrice(parseFloat(b.balance))}
                </td>
                <td className="px-8 py-6 text-right">
                  <button 
                    onClick={() => handleProcessPayout(b)}
                    disabled={processPayout.isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    Approving Payout
                  </button>
                </td>
              </tr>
            ))}
            {(!payoutData?.balances || payoutData.balances.filter(b => parseFloat(b.balance) > 0).length === 0) && (
              <tr>
                <td colSpan="5" className="px-8 py-10 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                  No pending balances to payout
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-8 flex items-center justify-between px-8 py-5 bg-slate-50/50 border-y border-slate-100">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Payout History</h4>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-slate-50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payout ID (Ref)</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Seller</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Amount</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Date</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {history.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-4 text-[11px] font-black text-blue-600 italic tracking-tighter">
                  {p.txRef}
                </td>
                <td className="px-6 py-4 text-xs font-black text-slate-900 uppercase tracking-tight">
                  {p.seller}
                </td>
                <td className="px-6 py-4 text-center text-xs font-black text-slate-900">
                  {formatPrice(parseFloat(p.amount))}
                </td>
                <td className="px-6 py-4 text-center text-[10px] font-bold text-slate-400 uppercase">
                  {p.date}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(p.status)}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
            {history.length === 0 && (
              <tr>
                <td colSpan="5" className="px-8 py-10 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                  No payout history available
                </td>
              </tr>
            )}
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
