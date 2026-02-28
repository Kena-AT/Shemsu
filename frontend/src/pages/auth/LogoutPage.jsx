import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Rocket, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../state/useAuthStore';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    // Perform actual logout logic
    logout();
    
    // Auto-redirect after 5 seconds if they don't click anything
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
         <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
            <LogOut size={32} />
         </div>
         
         <div className="space-y-3 mb-12">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">See you soon!</h1>
            <p className="text-slate-500">You have been successfully logged out of your Shemsu account. Your session has safely ended.</p>
         </div>

         <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex items-center justify-between mb-8 group">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform p-1">
                    <img src="/logo.png" alt="Shemsu Logo" className="w-full h-auto mix-blend-multiply" />
                </div>
                <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Return to</p>
                    <p className="font-bold text-slate-900">Marketplace Home</p>
                </div>
            </div>
            <button 
                onClick={() => navigate('/')}
                className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 shadow-lg shadow-blue-100"
            >
                <CheckCircle2 size={18} />
            </button>
         </div>

         <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em] animate-pulse">
            Redirecting in 5 seconds...
         </p>
      </div>

      <div className="fixed bottom-12 flex items-center gap-2 opacity-20 hover:opacity-100 transition-opacity">
        <img src="/logo.png" alt="Shemsu Logo" className="h-6 w-auto mix-blend-multiply opacity-50" />
        <span className="text-sm font-black text-slate-900 tracking-widest uppercase">Shemsu</span>
      </div>
    </div>
  );
};

export default LogoutPage;
