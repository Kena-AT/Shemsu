import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Download, 
  FileCheck, 
  FileX, 
  Clock, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../../hooks/useAdmin';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToCSV } from '../../../lib/exportUtils';

const SellerVerificationQueue = () => {
  const [params, setParams] = useState({ search: '', status: '' });
  const { useGetVerificationQueue, verifySeller, useGetStats } = useAdmin();
  const { data: queue, isLoading, refetch } = useGetVerificationQueue();
  const { data: stats } = useGetStats();

  const handleExport = () => {
    if (!queue || !queue.length) return toast.error('No data available for export');
    exportToCSV(queue, `shemsu_seller_queue_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Verification queue export initiated');
  };

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editingSeller, setEditingSeller] = useState(null);
  const [reviewAction, setReviewAction] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const [reason, setReason] = useState('');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleVerification = (e) => {
    e.preventDefault();
    if (!reason) return toast.error('A reason is mandatory for verification actions.');

    verifySeller.mutate(
      { 
        id: editingSeller.id, 
        status: reviewAction === 'approve' ? 'approved' : 'rejected', 
        reviewNotes, 
        reason 
      },
      {
        onSuccess: () => {
          toast.success(`Seller ${reviewAction === 'approve' ? 'approved' : 'rejected'} successfully.`);
          setEditingSeller(null);
          setReviewNotes('');
          setReason('');
        },
        onError: (err) => toast.error(err.response?.data?.message || 'Verification update failed')
      }
    );
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'approved': return { color: 'text-emerald-600 bg-emerald-50', label: 'VERIFIED' };
      case 'pending': return { color: 'text-amber-600 bg-amber-50', label: 'PENDING REVIEW' };
      case 'rejected': return { color: 'text-rose-600 bg-rose-50', label: 'REJECTED' };
      default: return { color: 'text-slate-500 bg-slate-50', label: 'INCOMPLETE' };
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Seller Verification Queue</h1>
          <p className="text-slate-500 text-sm mt-1">Review and manage pending applications for Shemsu Marketplace.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleRefresh}
            className={`flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-all ${isRefreshing ? 'animate-pulse' : ''}`}
          >
            <RotateCcw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="uppercase tracking-widest">{isRefreshing ? 'Refreshing...' : 'Refresh Queue'}</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Pending Verification', value: stats?.pendingVerifications || '0', change: 'Live Queue', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Sellers', value: stats?.totalSellers || '0', change: 'Platform Wide', icon: FileCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Moderation Alerts', value: stats?.pendingModeration || '0', change: 'High Priority', icon: FileX, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <span className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search businesses..." 
            className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value })}
          />
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all uppercase tracking-widest shadow-sm shadow-slate-200"
        >
          <Download className="w-4 h-4" />
          <span>Export Queue</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 w-12 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">#</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Business Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">TIN / Merchant ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submission Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Docs Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {queue?.map((seller, i) => {
                const statusInfo = getStatusInfo(seller.verificationStatus);
                return (
                  <tr key={seller.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-xs font-bold text-slate-400 text-center">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 uppercase">
                          {seller.legalName?.charAt(0) || 'S'}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{seller.legalName}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">ID: SL-{seller.id}292</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-tighter">TIN: {seller.tin}</span>
                        <span className="text-[10px] text-slate-400 font-medium tracking-tight">CID: {seller.chapaMerchantId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-left">
                         <span className="text-xs font-bold text-slate-700">{new Date(seller.updatedAt).toLocaleDateString()}</span>
                         <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{new Date(seller.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-12 h-1 rounded-full ${statusInfo.color.split(' ')[0]}`}></div>
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${statusInfo.color.split(' ')[1]}`}>{statusInfo.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setEditingSeller(seller); setReviewAction('approve'); }}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Approve"
                        >
                          <FileCheck className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => { setEditingSeller(seller); setReviewAction('reject'); }}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Reject"
                        >
                          <FileX className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {queue?.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-xs text-slate-400 italic">No submissions awaiting verification</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {editingSeller && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setEditingSeller(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
              
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${reviewAction === 'approve' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {reviewAction === 'approve' ? <FileCheck size={32} /> : <FileX size={32} />}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center justify-center gap-3">
                  {reviewAction === 'approve' ? 'Approve Verification' : 'Reject Submission'}
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Finalizing review for <strong className="uppercase">{editingSeller.legalName}</strong>
                </p>
              </div>

              <form onSubmit={handleVerification} className="space-y-6">
                <div className="space-y-2 text-left">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Reviewer Notes (Optional)</label>
                   <input 
                     type="text"
                     className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                     placeholder="Notes on document validity, business type, etc."
                     value={reviewNotes}
                     onChange={(e) => setReviewNotes(e.target.value)}
                   />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Administrative Reason (Mandatory)</label>
                  <textarea 
                    autoFocus
                    required
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                    placeholder="Provide justification for this decision (logged in audit history)..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setEditingSeller(null)}
                    className="flex-1 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors"
                  >
                    Discard Review
                  </button>
                  <button 
                    type="submit"
                    className={`flex-1 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all ${
                      reviewAction === 'approve' ? 'bg-emerald-600 shadow-emerald-200' : 'bg-rose-600 shadow-rose-200'
                    }`}
                  >
                    Commit Decision
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

export default SellerVerificationQueue;
