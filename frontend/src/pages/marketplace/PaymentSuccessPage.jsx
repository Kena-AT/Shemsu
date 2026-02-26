import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight, Loader2, XCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import { useCart } from '../../hooks/useCart';
import { useOrder } from '../../hooks/useOrder';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tx_ref = searchParams.get('tx_ref');
  const { useClearCart } = useCart();
  const { useVerifyOrder } = useOrder();
  
  const clearCartMutation = useClearCart();
  const { data: verification, isLoading: isVerifying, error: verificationError } = useVerifyOrder(tx_ref);

  useEffect(() => {
    if (verification?.status === 'success') {
      clearCartMutation.mutate();
    }
    // eslint-disable-next-line
  }, [verification]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center animate-pulse">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Verifying Payment...</h2>
          <p className="text-sm text-gray-500 mt-2">Please wait while we confirm your transaction with Chapa.</p>
        </div>
      </div>
    );
  }

  const isFailed = verificationError || (verification && verification.status !== 'success');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
        {isFailed ? (
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-6 text-red-600">
            <XCircle size={48} />
          </div>
        ) : (
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-6 text-green-600">
            <CheckCircle size={48} />
          </div>
        )}
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isFailed ? 'Payment Not Verified' : 'Order Confirmed!'}
        </h1>
        <p className="text-gray-500 mb-8">
          {isFailed 
            ? "We couldn't confirm your payment with Chapa. This might be due to a cancelled transaction or a connection issue."
            : "Thank you for your purchase. We've received your payment and our sellers are preparing your items."}
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 mb-8 flex flex-col items-center border border-slate-100">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Transaction Reference</span>
          <span className="text-slate-900 font-mono font-medium">{tx_ref || 'N/A'}</span>
          {isFailed && verification && (
             <span className="mt-2 text-xs font-bold text-red-600 px-2 py-0.5 bg-red-50 rounded uppercase">
               Status: {verification.status || 'Failed'}
             </span>
          )}
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full" 
            onClick={() => navigate('/app/orders')}
            variant={isFailed ? 'outline' : 'primary'}
          >
            <ShoppingBag size={20} className="mr-2" />
            View My Orders
          </Button>
          
          <button 
            onClick={() => navigate('/app/marketplace')}
            className="text-gray-500 hover:text-blue-600 font-medium flex items-center justify-center w-full transition-colors"
          >
            Continue Shopping
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>

        {!isFailed && (
          <p className="mt-8 text-xs text-gray-400">
            A confirmation email has been sent to your registered address.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
