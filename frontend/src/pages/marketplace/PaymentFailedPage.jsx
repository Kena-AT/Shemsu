import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle, RefreshCcw, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const PaymentFailedPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason') || 'The transaction could not be completed.';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-6 text-red-600">
          <XCircle size={48} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-500 mb-8">
          {reason} No funds were deducted from your account.
        </p>

        <div className="space-y-4">
          <Button 
            className="w-full" 
            onClick={() => navigate('/checkout')}
          >
            <RefreshCcw size={20} className="mr-2" />
            Try Again
          </Button>
          
          <button 
            onClick={() => navigate('/cart')}
            className="text-gray-500 hover:text-blue-600 font-medium flex items-center justify-center w-full transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Return to Cart
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Need help? Contact our support at <span className="font-semibold text-blue-600">support@shemsu.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
