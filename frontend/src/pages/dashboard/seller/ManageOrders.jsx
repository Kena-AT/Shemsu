import React from 'react';
import { useOrder } from '../../../hooks/useOrder';
import { Package, Truck, CheckCircle, XCircle, AlertCircle, ExternalLink, User, Smartphone, MapPin, Download } from 'lucide-react';
import Button from '../../../components/common/Button';
import { exportToCSV } from '../../../lib/exportUtils';
import { toast } from 'react-hot-toast';

const ManageOrders = () => {
  const { useGetSellerOrders, useUpdateItemStatus } = useOrder();
  const { data: orders, isLoading } = useGetSellerOrders();
  const updateStatusMutation = useUpdateItemStatus();

  const handleStatusUpdate = async (itemId, newStatus) => {
    await updateStatusMutation.mutateAsync({ itemId, status: newStatus });
  };

  const handleExport = () => {
    if (!orders || !orders.length) return toast.error('No order history to export');
    exportToCSV(orders, `shemsu_seller_orders_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Order history export initiated');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Orders</h1>
          <p className="text-slate-500 mt-1">Track and fulfill your customer orders</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 flex items-center shadow-sm hover:bg-slate-50 transition-all"
          >
            <Download size={18} className="mr-2 text-slate-400" />
            Export History
          </button>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 flex items-center shadow-sm">
            <Package size={18} className="mr-2 text-blue-500" />
            {orders?.length || 0} Total Orders
          </div>
        </div>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-slate-200" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">No orders yet</h2>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
            When customers buy your products, they will appear here for fulfillment.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Order Header */}
              <div className="bg-slate-50/50 p-6 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <Package className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{order.txRef}</h3>
                    <p className="text-sm text-slate-500">
                      Placed • {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-sm">
                    <User size={14} className="mr-2 text-slate-400" />
                    <span className="font-medium text-slate-700">{order.buyer?.fullName}</span>
                  </div>
                  <div className="flex items-center bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-sm">
                    <Smartphone size={14} className="mr-2 text-slate-400" />
                    <span className="font-medium text-slate-700">{order.shippingAddress?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Items belonging to this seller */}
              <div className="p-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="pb-3 w-2/5">Product</th>
                      <th className="pb-3 text-center">Qty</th>
                      <th className="pb-3 text-right">Price</th>
                      <th className="pb-3 text-center pl-8">Current Status</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {order.sellerSpecificItems?.map((item) => (
                      <tr key={item.id} className="group">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
                              {item.productImageSnapshot ? (
                                <img src={item.productImageSnapshot} alt="" className="h-full w-full object-cover" />
                              ) : (
                                <Package className="h-full w-full p-3 text-slate-200" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate">{item.productNameSnapshot}</p>
                              {item.attributesSnapshot && Object.keys(item.attributesSnapshot).length > 0 && (
                                <p className="text-xs text-slate-400 truncate">
                                  {Object.entries(item.attributesSnapshot).map(([k, v]) => `${k}: ${v}`).join(', ')}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-center font-medium text-slate-700">{item.quantity}</td>
                        <td className="py-4 text-right font-bold text-slate-900">
                          ETB {parseFloat(item.priceAtPurchase).toLocaleString()}
                        </td>
                        <td className="py-4 text-center pl-8">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            item.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            item.status === 'shipped' ? 'bg-indigo-100 text-indigo-700' :
                            item.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                            item.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {item.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <select 
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={item.status}
                            onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                            disabled={updateStatusMutation.isPending}
                          >
                            <option value="pending">Mark Pending</option>
                            <option value="processing">Mark Processing</option>
                            <option value="shipped">Mark Shipped</option>
                            <option value="delivered">Mark Delivered</option>
                            <option value="cancelled">Mark Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Footer - Shipping Info */}
              <div className="bg-slate-50/30 px-6 py-4 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center text-sm text-slate-500">
                  <MapPin size={16} className="mr-2 text-slate-400" />
                  <span>Ship to: {order.shippingAddress?.subcity}, {order.shippingAddress?.city} • House {order.shippingAddress?.houseNo}</span>
                </div>
                <div className="text-xs font-bold text-slate-400">
                  PAYMENT: {order.paymentStatus?.toUpperCase()} • {order.paymentMethod?.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
