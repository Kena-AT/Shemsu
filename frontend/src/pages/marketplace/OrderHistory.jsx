import React from 'react';
import { useOrder } from '../../hooks/useOrder';
import { ShoppingBag, Package, Truck, CheckCircle, XCircle, AlertCircle, ChevronRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, formatNumber } from '../../lib/utils';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { useGetBuyerOrders } = useOrder();
  const { data: orders, isLoading } = useGetBuyerOrders();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle className="text-amber-500" size={18} />;
      case 'processing': return <Package className="text-blue-500" size={18} />;
      case 'shipped': return <Truck className="text-indigo-500" size={18} />;
      case 'delivered': return <CheckCircle className="text-green-500" size={18} />;
      case 'cancelled':
      case 'cancelled_due_to_stock':
      case 'failed': return <XCircle className="text-red-500" size={18} />;
      default: return <AlertCircle className="text-gray-500" size={18} />;
    }
  };

  const getStatusLabel = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <div className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold">
            {formatNumber(orders?.length || 0)} Orders Total
          </div>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
            <ShoppingBag size={64} className="text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h2>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
            <button 
              onClick={() => navigate('/app/marketplace')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-50 flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Order Reference</span>
                    <h3 className="text-lg font-bold text-gray-900 mono">{order.txRef}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      {getStatusIcon(order.status)}
                      <span className="font-bold text-gray-800">{getStatusLabel(order.status)}</span>
                    </div>
                    <p className="text-2xl font-black text-blue-600">
                      {formatPrice(parseFloat(order.totalAmount))}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 bg-gray-50/50">
                  <div className="space-y-4">
                    {order.items?.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-xl bg-white border border-gray-200 overflow-hidden flex-shrink-0">
                          {item.productImageSnapshot ? (
                            <img src={item.productImageSnapshot} alt={item.productNameSnapshot} className="h-full w-full object-cover" />
                          ) : (
                            <ShoppingBag className="h-full w-full p-4 text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{item.productNameSnapshot}</h4>
                          <div className="flex items-center text-sm text-gray-500 gap-3 mt-0.5">
                            <span>Qty: {item.quantity}</span>
                            <span>•</span>
                            <span>{formatPrice(parseFloat(item.priceAtPurchase))}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="p-4 bg-white border-t border-gray-50 flex justify-between items-center px-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={16} className="mr-1.5" />
                    <span className="truncate max-w-[200px]">{order.shippingAddress.subcity}, {order.shippingAddress.city}</span>
                  </div>
                  <button 
                    className="flex items-center text-blue-600 font-bold text-sm hover:underline"
                    onClick={() => navigate(`/app/orders/${order.id}`)}
                  >
                    View Details
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
