import React from 'react';
import { 
  Package, 
  ChevronRight, 
  ArrowLeft, 
  Printer, 
  Truck, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  CreditCard, 
  AlertCircle, 
  Check, 
  X, 
  ExternalLink,
  Shield
} from 'lucide-react';
import { useAdmin } from '../../../hooks/useAdmin';
import { motion } from 'framer-motion';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { useGetOrderDetails } = useAdmin();
  const { data: order, isLoading } = useGetOrderDetails(id);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400">
        <AlertCircle size={48} className="mb-4 opacity-20" />
        <h2 className="text-xl font-bold uppercase tracking-widest">Order Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 font-bold hover:underline">Return to Global Orders</button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

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
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Order #{order._id?.substring(0, 8).toUpperCase()}</h1>
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className="text-slate-500 text-[11px] font-bold mt-1 uppercase tracking-widest italic">
              Placed on {new Date(order.createdAt).toLocaleString()} • Via Chapa Payment
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl text-[11px] font-black text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest bg-white shadow-sm">
            <Printer className="w-4 h-4" />
            <span>Invoice PDF</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest">
            <Truck className="w-4 h-4" />
            <span>Track Item</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Line Items & History */}
        <div className="lg:col-span-2 space-y-10">
          {/* Order Inventory */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="p-8 border-b border-slate-100 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                   <Package className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Transaction Inventory</h3>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Ref: #{order.paymentResult?.id || 'NO_PAYMENT_REF'}</span>
            </div>
            <div className="divide-y divide-slate-100 relative z-10">
              {order.orderItems?.map((item, i) => (
                <div key={i} className="p-8 flex items-center justify-between group hover:bg-slate-50/30 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-1 font-bold">
                       <img 
                         src={item.image || "https://picsum.photos/seed/item/200/200"} 
                         alt={item.name} 
                         className="w-full h-full object-cover rounded-xl"
                         referrerPolicy="no-referrer"
                       />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-1.5 flex items-center gap-2">
                        SKU: {item._id?.substring(0, 6).toUpperCase()} • 
                        <span className="text-blue-500 underline cursor-pointer">View Merchant</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900 italic">Br {item.price.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Qty: {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Value Summary */}
            <div className="p-10 bg-slate-50/50 border-t border-slate-100 grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10 font-sans">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Item Subtotal</span>
                <span className="text-sm font-black text-slate-900 italic">Br {order.subtotal?.toLocaleString() || order.itemsPrice?.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Logistic Fees</span>
                <span className="text-sm font-black text-slate-900 italic">Br {order.shippingAmount?.toLocaleString() || order.shippingPrice?.toLocaleString() || '0.00'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Service Fee (2%)</span>
                <span className="text-sm font-black text-slate-900 italic text-blue-600">Br {order.serviceFee?.toLocaleString() || '0.00'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Applied Tax</span>
                <span className="text-sm font-black text-slate-900 italic">Br {order.taxPrice?.toLocaleString() || '0.00'}</span>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Total Exposure</span>
                <span className="text-2xl font-black text-blue-600 tracking-tighter italic">Br {order.totalAmount?.toLocaleString() || order.totalPrice?.toLocaleString()}</span>
              </div>
            </div>
          </section>

          {/* Logistic Lifecycle */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 opacity-20"></div>
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                 <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Order Fulfillment Pulse</h3>
            </div>
            <div className="space-y-10 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-50">
              {/* Delivered */}
              <div className="flex gap-8 relative z-10 group">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border-2 ${order.isDelivered ? 'bg-emerald-500 text-white border-white' : 'bg-slate-100 text-slate-300 border-white'}`}>
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Final Delivery Verification</h4>
                    {order.isDelivered && (
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(order.deliveredAt).toLocaleString()}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                    {order.isDelivered ? "Fulfillment cycle completed. Recipient has acknowledged receipt of items." : "Waiting for confirmation from logistics provider."}
                  </p>
                </div>
              </div>
              {/* Payment */}
              <div className="flex gap-8 relative z-10 group">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border-2 ${order.isPaid ? 'bg-emerald-500 text-white border-white' : 'bg-rose-500 text-white border-white'}`}>
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Clearing & Settlement</h4>
                    {order.isPaid && (
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(order.paidAt).toLocaleString()}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                    {order.isPaid ? "Transaction settled via Chapa API. Funds placed in marketplace bridge account." : "Payment verification failed or timed out."}
                  </p>
                </div>
              </div>
              {/* Initial */}
              <div className="flex gap-8 relative z-10 group">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg border-2 border-white">
                  <FileText className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Order Initialization</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(order.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed italic">
                    Subject initiated transaction process via marketplace storefront.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Customer & Safety Details */}
        <div className="space-y-10">
          {/* Consumer Intelligence */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative group overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"></div>
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    Consumer Profile
                </h3>
                <Link to={`/admin/users/${order.user?._id}`} className="p-2 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all">
                   <ExternalLink className="w-4 h-4 text-blue-600" />
                </Link>
             </div>
             <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl font-black text-slate-600 italic">
                  {order.user?.fullName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{order.user?.fullName}</h4>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">Status: High Value Buyer</p>
                </div>
             </div>
             <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-600 p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] font-bold tracking-tight lowercase">{order.user?.email}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] font-bold tracking-tight">{order.user?.phoneNumber || '+251 XXX XXX XXX'}</span>
                </div>
             </div>
          </section>

          {/* Logistic Destination */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600 opacity-20"></div>
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em]">Delivery Coordinate</h3>
                <Truck className="w-5 h-5 text-emerald-600" />
             </div>
             <div className="flex gap-4">
                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 h-fit">
                   <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-600 leading-[1.8] font-bold italic">
                  {order.shippingAddress?.address}<br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}<br />
                  {order.shippingAddress?.country || 'Ethiopia'}<br />
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mt-2">Verified Destination Pulse</span>
                </div>
             </div>
          </section>

          {/* Platform Safety Overrides */}
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 relative overflow-hidden border border-slate-800">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-8 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Administrative Overrides
             </h3>
             <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all italic">
                   Initiate Dispute Sub-routine
                </button>
                <div className="pt-6 mt-6 border-t border-white/5 space-y-4">
                   <button className="w-full flex items-center justify-center gap-3 py-4 bg-rose-500/10 text-rose-500 rounded-2xl text-[10px] font-black hover:bg-rose-500/20 transition-all border border-rose-500/20 uppercase tracking-widest italic">
                      Invalidate Transaction
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <footer className="p-10 text-center">
         <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.4em] italic opacity-50">
           © 2024 Shemsu Administration Core • Security Grade: Maximum
         </p>
      </footer>
    </div>
  );
};

export default AdminOrderDetails;
