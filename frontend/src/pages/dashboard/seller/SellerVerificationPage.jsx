import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  Building2, 
  CreditCard, 
  AlertCircle, 
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useSeller } from '../../../hooks/useSeller';
import { useAuthStore } from '../../../state/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

const SellerVerificationPage = () => {
  const { useGetVerificationStatus, submitVerification } = useSeller();
  const { data: statusData, isLoading: initialLoading } = useGetVerificationStatus();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    tin: '',
    chapaMerchantId: ''
  });

  useEffect(() => {
    if (statusData && statusData.status !== 'none') {
      setFormData({
        tin: statusData.tin || '',
        chapaMerchantId: statusData.chapaMerchantId || ''
      });
    }
  }, [statusData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tin || !formData.chapaMerchantId) return;
    await submitVerification.mutateAsync(formData);
  };

  if (initialLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const status = statusData?.status || 'none';

  return (
    <div className="min-h-full max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600">
          <ShieldCheck size={40} strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Seller Verification</h1>
        <p className="text-slate-500 mt-3 text-lg font-medium">Complete your profile to start selling on Shemsu Marketplace</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form / Status */}
        <div className="lg:col-span-12 space-y-8">
          {/* Status Banner */}
          <AnimatePresence mode="wait">
            {status === 'approved' && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex items-center gap-5"
              >
                <div className="bg-emerald-500 p-3 rounded-2xl text-white shadow-lg shadow-emerald-200">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900 text-lg">Verified Account</h3>
                  <p className="text-emerald-700 font-medium">Your business is fully verified. You can access all dashboard features.</p>
                </div>
              </motion.div>
            )}

            {status === 'pending' && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-center gap-5"
              >
                <div className="bg-amber-500 p-3 rounded-2xl text-white shadow-lg shadow-amber-200">
                  <Clock size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-amber-900 text-lg">Review in Progress</h3>
                  <p className="text-amber-700 font-medium">Your submission is currently being reviewed by our administrative team. This usually takes 24-48 hours.</p>
                </div>
              </motion.div>
            )}

            {status === 'rejected' && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex items-center gap-5"
              >
                <div className="bg-rose-500 p-3 rounded-2xl text-white shadow-lg shadow-rose-200">
                  <XCircle size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-rose-900 text-lg">Verification Rejected</h3>
                  <p className="text-rose-700 font-medium">
                    Reason: {statusData?.reviewNotes || 'Documents provided don\'t match registration data.'}
                  </p>
                  <p className="text-rose-600 mt-2 text-sm font-bold uppercase tracking-wider">Please update and resubmit below.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden text-left">
            <div className="p-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-slate-900 p-2.5 rounded-xl text-white">
                  <Building2 size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Business Credentials</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Tax Identification Number (TIN)</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors">
                        <FileCheck size={20} />
                      </div>
                      <input 
                        required
                        type="text"
                        placeholder="10-digit TIN number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-14 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium transition-all group-hover:bg-white"
                        value={formData.tin}
                        onChange={(e) => setFormData({...formData, tin: e.target.value})}
                        disabled={status === 'pending' || status === 'approved'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Chapa Merchant ID</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors">
                        <CreditCard size={20} />
                      </div>
                      <input 
                        required
                        type="text"
                        placeholder="mer-..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-14 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium transition-all group-hover:bg-white"
                        value={formData.chapaMerchantId}
                        onChange={(e) => setFormData({...formData, chapaMerchantId: e.target.value})}
                        disabled={status === 'pending' || status === 'approved'}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-4">
                  <AlertCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <p className="text-sm text-blue-900/70 font-medium leading-relaxed">
                    Make sure your Chapa Merchant ID matches your active store on Chapa. Payments will be routed through this ID. 
                    Incorrect credentials may cause payout delays.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <p className="text-slate-400 text-xs flex items-center gap-2">
                    <HelpCircle size={14} />
                    Need help finding these? <a href="#" className="font-bold text-blue-600 hover:underline">Read Guide</a>
                  </p>
                  
                  <button 
                    type="submit"
                    disabled={status === 'pending' || status === 'approved' || submitVerification.isPending}
                    className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg ${
                      status === 'pending' || status === 'approved'
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
                    }`}
                  >
                    {submitVerification.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    <span>{status === 'rejected' ? 'Update & Resubmit' : 'Submit for Review'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Verification Steps - Informational */}
            <div className="bg-slate-50 p-10 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Step 01</span>
                <h4 className="font-bold text-slate-900">Email Verified</h4>
                <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-bold">
                  <CheckCircle2 size={12} />
                  COMPLETED
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Step 02</span>
                <h4 className="font-bold text-slate-900">Submission</h4>
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
                  {status === 'none' ? <Clock size={12} /> : <CheckCircle2 size={12} className="text-emerald-600" />}
                  {status === 'none' ? 'PENDING' : 'COMPLETED'}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Step 03</span>
                <h4 className="font-bold text-slate-900">Admin Review</h4>
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
                  {status === 'approved' ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Clock size={12} />}
                  {status === 'approved' ? 'APPROVED' : (status === 'rejected' ? 'FAILED' : 'WAITING')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerVerificationPage;
