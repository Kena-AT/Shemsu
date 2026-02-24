import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  AlertTriangle, 
  Download, 
  Eye, 
  Trash2, 
  Clock, 
  Info,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../../hooks/useAdmin';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToCSV } from '../../../lib/exportUtils';

const ProductModeration = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [params, setParams] = useState({ search: '', status: 'pending' });
  const { useGetProducts, updateProductStatus, useGetStats } = useAdmin();
  const { data: products, isLoading } = useGetProducts({ ...params, status: activeTab });
  const { data: stats } = useGetStats();

  const handleExport = () => {
    if (!products || !products.length) return toast.error('No data available for export');
    exportToCSV(products, `shemsu_products_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Product registry export initiated');
  };

  const [editingProduct, setEditingProduct] = useState(null);
  const [moderationAction, setModerationAction] = useState('');
  const [reason, setReason] = useState('');

  const handleModeration = (e) => {
    e.preventDefault();
    if (!reason) return toast.error('A reason is mandatory for moderation actions.');

    updateProductStatus.mutate(
      { 
        id: editingProduct.id, 
        status: moderationAction === 'approve' ? 'approved' : 'rejected', 
        reason 
      },
      {
        onSuccess: () => {
          toast.success(`Product ${moderationAction === 'approve' ? 'approved' : 'rejected'} successfully.`);
          setEditingProduct(null);
          setReason('');
        },
        onError: (err) => toast.error(err.response?.data?.message || 'Moderation update failed')
      }
    );
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'approved': return { color: 'text-emerald-600 bg-emerald-50', label: 'APPROVED' };
      case 'pending': return { color: 'text-blue-600 bg-blue-50', label: 'PENDING' };
      case 'rejected': return { color: 'text-rose-600 bg-rose-50', label: 'REJECTED' };
      default: return { color: 'text-slate-500 bg-slate-50', label: 'UNKNOWN' };
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
          <h1 className="text-2xl font-bold text-slate-900">Product Moderation</h1>
          <p className="text-slate-500 text-sm mt-1">Review and manage product listings across the marketplace.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest"
          >
            <Download className="w-4 h-4" />
            <span>Export Registry</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-200 uppercase tracking-widest">
            <Check size={16} />
            <span>Bulk Approve</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Pending', value: stats?.pendingModeration || '0', change: 'Marketplace Depth', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'High-Risk Flags', value: '18', change: 'Safety First', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Approved Today', value: '452', change: 'Velocity', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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

      {/* Tabs & Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between px-6 border-b border-slate-100 bg-slate-50/30">
          <div className="flex">
            {['pending', 'approved', 'rejected'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-1 bg-blue-600" 
                  />
                )}
              </button>
            ))}
          </div>
          <div className="py-4 md:py-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <input 
                type="text" 
                placeholder="Search products or sellers..." 
                className="bg-white border border-slate-200 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all font-medium"
                value={params.search}
                onChange={(e) => setParams({ ...params, search: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 w-12 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">#</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seller Entity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Financials</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Flag Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products?.map((product, i) => (
                <tr key={product.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-4 text-xs font-bold text-slate-400 text-center">{i + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                        <img 
                          src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                          alt="" 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                        />
                      </div>
                      <div className="flex flex-col text-left">
                        <Link to={`/admin/moderation/${product.id}`} className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1">
                          {product.name}
                        </Link>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">SKU: {product.sku || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{product.seller?.legalName || 'Independent Seller'}</span>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
                        <ShieldAlert className="w-3 h-3" />
                        <span>Verified Merchant</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-900">Br {product.price?.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 font-medium">Stock: {product.stock} units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${product.moderationStatus === 'pending' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${getStatusInfo(product.moderationStatus).color.split(' ')[1]}`}>
                        {getStatusInfo(product.moderationStatus).label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => { setEditingProduct(product); setModerationAction('approve'); }}
                         className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-100 transition-all shadow-sm shadow-emerald-100"
                       >
                         Approve
                       </button>
                       <button 
                         onClick={() => { setEditingProduct(product); setModerationAction('reject'); }}
                         className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-100 transition-all shadow-sm shadow-rose-100"
                       >
                         Reject
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products?.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-xs text-slate-400 italic">No products matched the current curation criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Curation Reminder */}
      <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex gap-4">
        <div className="p-3 bg-white rounded-2xl text-blue-600 shadow-sm h-fit">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest">Moderation Framework 4.0</h4>
          <p className="text-xs text-blue-800/80 leading-relaxed mt-1 font-medium italic">
            "Ensure all high-resolution images are processed within 4 hours. Flagged items should be prioritized based on report density. Decisions made here are final and visible to sellers within their portal."
          </p>
        </div>
      </div>

      {/* Moderation Modal */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setEditingProduct(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
              
              <div className="text-center mb-10">
                <div className={`w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg ${moderationAction === 'approve' ? 'bg-emerald-50 text-emerald-600 shadow-emerald-100' : 'bg-rose-50 text-rose-600 shadow-rose-100'}`}>
                  {moderationAction === 'approve' ? <Check size={40} /> : <X size={40} />}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {moderationAction === 'approve' ? 'Approve Listing' : 'Take Down Product'}
                </h3>
                <p className="text-slate-500 text-sm mt-1 max-w-[80%] mx-auto font-medium">
                  Reviewing <strong>{editingProduct.name}</strong> from <strong>{editingProduct.seller?.legalName}</strong>.
                </p>
              </div>

              <form onSubmit={handleModeration} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">Administrative Justification</label>
                  <textarea 
                    autoFocus
                    required
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 font-medium placeholder:text-slate-400"
                    placeholder="Provide mandatory reason for this action. This will be logged and sent to the merchant..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
                  >
                    Discard Review
                  </button>
                  <button 
                    type="submit"
                    className={`flex-1 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-white shadow-xl transition-all ${
                      moderationAction === 'approve' ? 'bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700' : 'bg-rose-600 shadow-rose-200 hover:bg-rose-700'
                    }`}
                  >
                    Commit Action
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

export default ProductModeration;
