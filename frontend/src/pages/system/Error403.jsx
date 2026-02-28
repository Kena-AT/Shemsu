import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft, LifeBuoy } from 'lucide-react';
import Button from '../../components/common/Button';

const Error403 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
          <ShieldAlert className="w-12 h-12 text-blue-600" />
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              ERROR 403
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Access Denied</h1>
          <p className="text-slate-500 text-sm leading-relaxed px-4">
            It looks like you've reached a restricted area of the Shemsu marketplace. 
            Please check your credentials or contact your administrator if you believe this is an error.
          </p>
        </div>

        <div className="pt-6 grid grid-cols-2 gap-3">
          <Button 
            onClick={() => navigate('/')}
            variant="primary"
            className="flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Button>
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>

        <div className="pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Need immediate assistance? 
            <button className="text-blue-600 font-semibold hover:underline ml-1">
              Contact Shemsu Support
            </button>
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex items-center gap-6 text-[11px] font-medium text-slate-400">
        <span className="flex items-center gap-1.5"><LifeBuoy size={12} /> Help Center</span>
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
      </div>
    </div>
  );
};

export default Error403;
