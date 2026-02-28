import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home, ShieldCheck, Mail } from 'lucide-react';
import Button from '../../components/common/Button';

const Error500 = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl w-full bg-white p-12 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100">
        <div className="relative mx-auto w-28 h-28 bg-red-50 rounded-full flex items-center justify-center mb-10">
          <AlertTriangle className="w-14 h-14 text-red-500" />
          <div className="absolute -top-1 -right-1 bg-white p-2 rounded-full shadow-lg">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="inline-block px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full uppercase tracking-tighter mb-2">
            Error 500
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Internal Server Error</h1>
          <p className="text-slate-500 text-base leading-relaxed max-w-md mx-auto">
            We're experiencing some technical difficulties on our end. Our team has been notified and is looking into it. 
            Please try refreshing the page or check back in a few minutes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleRefresh}
            className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh Page
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex-1 bg-slate-50 text-slate-900 font-bold py-4 rounded-2xl hover:bg-slate-100 border border-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back Home
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-50 space-y-4">
          <p className="text-xs text-slate-400">
            Still having trouble? <button className="text-blue-600 font-bold hover:underline">Support Details</button>
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <span className="text-red-500 transition-all duration-1000">●</span> System Status
            </div>
            <span className="text-slate-200">|</span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               Reference ID: <span className="text-slate-900">SH-932412</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 left-0 right-0 flex justify-center gap-12 text-[11px] font-bold text-slate-300 uppercase tracking-widest pointer-events-none">
        <p className="flex items-center gap-2 animate-pulse"><ShieldCheck size={14} /> Secure Marketplace Environment</p>
      </div>
    </div>
  );
};

export default Error500;
