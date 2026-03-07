import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronLeft, 
  MapPin, 
  ShoppingBag,
  Clock,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import Button from '../../components/common/Button';
import { toast } from 'react-hot-toast';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { useGetOrderDetails, useUpdateItemStatus } = useOrder();
  
  const { data: order, isLoading, error } = useGetOrderDetails(id);
  const updateStatusMutation = useUpdateItemStatus();

  const handleConfirmDelivery = async (itemId) => {
    try {
      await updateStatusMutation.mutateAsync({ itemId, status: 'delivered' });
      toast.success('Delivery confirmed! Thank you.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to confirm delivery');
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending': 
        return { icon: <Clock className="text-amber-500" />, label: 'Payment Pending', color: 'bg-amber-50 text-amber-700 border-amber-100' };
      case 'processing': 
        return { icon: <Package className="text-blue-500" />, label: 'Processing', color: 'bg-blue-50 text-blue-700 border-blue-100' };
      case 'shipped': 
        return { icon: <Truck className="text-indigo-500" />, label: 'In Transit', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' };
      case 'delivered': 
        return { icon: <CheckCircle className="text-green-500" />, label: 'Delivered', color: 'bg-green-50 text-green-700 border-green-100' };
      case 'cancelled': 
        return { icon: <XCircle className="text-red-500" />, label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-100' };
      default: 
        return { icon: <AlertCircle className="text-gray-500" />, label: status, color: 'bg-gray-50 text-gray-700 border-gray-100' };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex flex-col items-center justify-center p-4">
        <XCircle size={64} className="text-red-200 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Order not found</h2>
        <p className="text-gray-500 mb-6">We couldn't retrieve the details for this order.</p>
        <Button onClick={() => navigate('/app/orders')}>Back to Orders</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/app/orders')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors font-bold text-sm"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Order History
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
               <h1 className="text-3xl font-black text-gray-900 tracking-tight">Order Details</h1>
               <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                  Verified
               </span>
            </div>
            <p className="text-slate-500 font-medium">Ref: <span className="text-slate-900 font-bold mono uppercase">{order.txRef}</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Total Amount Paid</p>
            <p className="text-3xl font-black text-blue-600">
              {formatPrice(parseFloat(order.totalAmount))}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items List */}
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/30 font-bold text-gray-800 flex items-center justify-between">
                <span>Items in Order</span>
                <ShoppingBag size={18} className="text-gray-400" />
              </div>
              <div className="divide-y divide-gray-50">
                {order.items.map((item) => {
                  const statusInfo = getStatusInfo(item.status);
                  return (
                    <div key={item.id} className="p-6">
                      <div className="flex gap-4 mb-4">
                        <div className="h-20 w-20 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                          {item.productImageSnapshot ? (
                            <img src={item.productImageSnapshot} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <ShoppingBag className="h-full w-full p-4 text-gray-200" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1">{item.productNameSnapshot}</h4>
                          <div className="flex items-center text-sm text-gray-500 gap-3 font-medium">
                            <span>Qty: {item.quantity}</span>
                            <span>•</span>
                            <span>{formatPrice(parseFloat(item.priceAtPurchase))}</span>
                          </div>
                          
                          <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.color}`}>
                            {statusInfo.icon}
                            {statusInfo.label.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      {/* Buyer Actions */}
                      {item.status === 'shipped' && (
                        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
                              <ShieldCheck size={20} />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-blue-900">Have you received this item?</p>
                               <p className="text-xs text-blue-600 font-medium tracking-tight">Confirming release of payment to the seller.</p>
                            </div>
                          </div>
                          <Button 
                            variant="primary" 
                            size="sm"
                            className="w-full md:w-auto px-6 font-black tracking-tight"
                            onClick={() => handleConfirmDelivery(item.id)}
                            isLoading={updateStatusMutation.isPending}
                          >
                            Confirm Delivery
                          </Button>
                        </div>
                      )}
                      
                      {item.status === 'delivered' && (
                        <div className="flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                           <CheckCircle size={16} />
                           Transaction completed and verified.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                Delivery Address
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Recipient</p>
                  <p className="font-black text-gray-800 uppercase tracking-tight">{order.buyer?.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Phone</p>
                  <p className="font-bold text-gray-800">{order.shippingAddress.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Location</p>
                  <p className="text-gray-600 font-medium">
                    {order.shippingAddress.subcity}, {order.shippingAddress.city}<br />
                    House: {order.shippingAddress.houseNo || 'N/A'}<br />
                    {order.shippingAddress.additionalInfo && (
                      <span className="italic text-gray-400 mt-1 block">"{order.shippingAddress.additionalInfo}"</span>
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Payment Summary */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">{formatPrice(parseFloat(order.subtotal))}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="font-medium">Shipping</span>
                  <span className="font-bold">{formatPrice(parseFloat(order.shippingAmount))}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="font-medium">Service Fee (2%)</span>
                  <span className="font-bold">{formatPrice(parseFloat(order.serviceFee))}</span>
                </div>
                <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-xl font-black text-blue-600">{formatPrice(parseFloat(order.totalAmount))}</span>
                </div>
              </div>
            </section>

            {/* Help/Support */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                 <AlertCircle size={18} className="text-blue-400" />
                 Need Help?
              </h4>
              <p className="text-xs text-slate-400 mb-4 font-medium leading-relaxed">
                If you have any issues with your order or didn't receive your items as expected, please contact our support team.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-slate-700 text-white hover:bg-slate-800 py-4 font-bold tracking-tight"
                onClick={() => navigate('/app/contact')}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
