import React, { useState } from 'react';
import { 
  Package, 
  ChevronRight, 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  ExternalLink, 
  Eye, 
  Clock, 
  Check, 
  X, 
  Info, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  FileText,
  BarChart3,
  Search,
  Bell
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../../../hooks/useAdmin';
import { motion } from 'framer-motion';

const AdminProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { useGetProductById, deleteProduct, updateProductStatus } = useAdmin();
  const { data: product, isLoading } = useGetProductById(id);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400">
        <Package size={48} className="mb-4 opacity-20" />
        <h2 className="text-xl font-bold uppercase tracking-widest">Product Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 font-bold hover:underline">Return to Moderation</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{product.name}</h1>
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100 ${product.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {product.status || 'UNMODERATED'}
              </span>
            </div>
            <p className="text-slate-500 text-[11px] font-bold mt-1 uppercase tracking-widest">
              ID: {product._id?.substring(0, 8)} • {product.seller?.businessName || 'Merchant'} • Created {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl text-[11px] font-black text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest bg-white shadow-sm">
            <Edit3 className="w-4 h-4" />
            <span>Modify Listing</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest">
            <X className="w-4 h-4" />
            <span>Clear Reports</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Media & Primary Data */}
        <div className="lg:col-span-2 space-y-10">
          {/* Media Vault */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 rounded-xl">
                 <Package className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Product Visualization</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3 aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-inner group relative">
                <img 
                  src={product.images?.[0] || "https://picsum.photos/seed/shemsu/800/600"} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                {product.images?.slice(1, 4).map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm cursor-pointer hover:border-blue-400 transition-all">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                {(!product.images || product.images.length <= 1) && (
                  <>
                    <div className="aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center italic text-slate-300 font-bold text-[10px] uppercase tracking-widest">Slot 02</div>
                    <div className="aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center italic text-slate-300 font-bold text-[10px] uppercase tracking-widest">Slot 03</div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Full Descriptive Content */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                   <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Manifest & Description</h3>
              </div>
            </div>
            <div className="prose prose-slate max-w-none relative z-10">
              <p className="text-sm font-medium text-slate-600 leading-relaxed italic border-l-4 border-blue-100 pl-6 mb-8 bg-slate-50/50 py-4 rounded-r-2xl">
                {product.description || "No descriptive manifest provided by the merchant."}
              </p>
              
              <div className="grid grid-cols-2 gap-10 mt-10">
                 <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Specifications</h4>
                    <ul className="space-y-3">
                       <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>Category: {product.category || 'General'}</span>
                       </li>
                       <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>Verified Merchant: {product.seller?.businessName || 'Pending'}</span>
                       </li>
                    </ul>
                 </div>
              </div>
            </div>
          </section>

          {/* Logistics Tracking */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                    <BarChart3 className="w-5 h-5" />
                 </div>
                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Logistics & Ledger</h3>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Use Only</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Delta</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operation</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrative Entity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 text-xs font-bold text-slate-700">Today, 09:12 AM</td>
                    <td className="px-8 py-5 text-xs font-black text-emerald-600">+10 Inventory</td>
                    <td className="px-8 py-5 text-xs font-medium text-slate-600 uppercase tracking-tight">Manual Restock</td>
                    <td className="px-8 py-5 text-xs font-black text-blue-600 italic uppercase">System_Auto</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 text-xs font-bold text-slate-700">Oct 23, 16:45</td>
                    <td className="px-8 py-5 text-xs font-black text-rose-600">-1 Inventory</td>
                    <td className="px-8 py-5 text-xs font-medium text-slate-600 uppercase tracking-tight">Purchase ORD-9921</td>
                    <td className="px-8 py-5 text-xs font-black text-blue-600 italic uppercase">User_CX</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Column: Status & Moderation Controls */}
        <div className="space-y-10">
          {/* Security & Marketplace Standing */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative group overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"></div>
             <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-8 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                Marketplace Standing
             </h3>
             <div className="space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visibility state</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live On Store</span>
                    <div className="w-10 h-5 bg-emerald-600 rounded-full relative p-1 cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-50 font-sans">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Health</span>
                  <span className="text-sm font-black text-slate-900 italic">{product.countInStock || 0} Units Available</span>
                </div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Velocity index</span>
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-black">~12% Increase</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit Price</span>
                  <span className="text-2xl font-black text-slate-900 tracking-tighter italic">Br {product.price}</span>
                </div>
             </div>
          </div>

          {/* Active Moderation Reports */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-rose-600 opacity-20"></div>
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Safety Reports (0)</h3>
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 px-2 py-1 rounded border border-slate-100">Clean Slate</span>
             </div>
             
             {/* If no reports */}
             <div className="p-8 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">No active compliance or safety reports have been logged for this asset.</p>
             </div>

             <div className="mt-8 space-y-4">
                <button className="w-full flex items-center justify-center gap-3 py-4 bg-rose-50 text-rose-600 rounded-2xl text-[10px] font-black hover:bg-rose-100 uppercase tracking-[0.15em] transition-all border border-rose-100/50">
                   <AlertTriangle className="w-4 h-4" />
                   <span>Flag For Deep Review</span>
                </button>
                <button 
                  onClick={() => {
                     if(window.confirm('Are you sure you want to disable this listing from the public store?')) {
                        updateProductStatus.mutate({ id: product._id, status: 'rejected' });
                     }
                  }}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black hover:bg-rose-700 uppercase tracking-[0.15em] transition-all shadow-xl shadow-rose-200"
                >
                   <Trash2 className="w-4 h-4" />
                   <span>Nuclear Shutdown</span>
                </button>
             </div>
          </div>

          {/* Meta Data Sidebar */}
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-8 flex items-center gap-2">
                <Info className="w-4 h-4" />
                System Manifest
             </h3>
             <div className="space-y-6">
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Asset Reference ID</span>
                   <span className="text-xs font-black text-slate-300 font-mono tracking-tighter">#{product._id}</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Last Modification Pulse</span>
                   <span className="text-xs font-black text-slate-300 uppercase italic">ADMIN_OVERRIDE @ Oct 24</span>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10">
                   <p className="text-[10px] text-slate-500 leading-relaxed italic">
                      "This asset is currently complying with all automated safety sub-routines and global marketplace policies."
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fallback Icon for ShieldCheck
const ShieldCheck = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default AdminProductDetails;
