import React, { useState } from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  CheckCircle, 
  Package, 
  CreditCard, 
  BarChart3, 
  FileText, 
  Settings, 
  Search, 
  Bell, 
  ChevronRight,
  ArrowLeft,
  Printer,
  Download,
  Truck,
  MapPin,
  Mail,
  Phone,
  Clock,
  ExternalLink,
  AlertCircle,
  Check,
  X,
  MoreVertical,
  LogOut
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-slate-100">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">Shemsu</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Admin Console</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <Users className="w-4 h-4" />
            <span>User Management</span>
          </Link>
          <Link to="/admin/verification" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <CheckCircle className="w-4 h-4" />
            <span>Seller Verification</span>
          </Link>
          <Link to="/admin/moderation" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <Package className="w-4 h-4" />
            <span>Product Moderation</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm transition-all">
            <CreditCard className="w-4 h-4" />
            <span>Global Orders</span>
          </Link>
          <Link to="/admin/analytics" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <BarChart3 className="w-4 h-4" />
            <span>Reports/Analytics</span>
          </Link>
          <Link to="/admin/logs" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <FileText className="w-4 h-4" />
            <span>Audit Logs</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <Link to="/admin/docs" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <FileText className="w-4 h-4" />
            <span>Documentation</span>
          </Link>
          
          <Link to="/admin/profile" className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 px-2 hover:bg-slate-50 rounded-xl transition-all">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">AK</div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-slate-900 truncate">Abebe Kebede</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Senior Moderator</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Order Details</h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-1">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span>Orders</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-600 uppercase tracking-widest">Details</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search orders, tracking..." 
                className="bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">AK</div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/admin/orders')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">Order #ORD-9921</h1>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-100">SHIPPED</span>
                </div>
                <p className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-widest">Placed on Oct 24, 2023 • 02:34 PM • Via Visa Card</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Truck className="w-4 h-4" />
                <span>Track Shipment</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Order Items & Timeline */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Items */}
              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Order Items (2)</h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subtotal: $132.00</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { name: 'ProX Wireless Mouse', price: '$89.00', qty: 1, sku: 'SRM-MS-01', vendor: 'Apex Sports', image: 'https://picsum.photos/seed/m1/60/60' },
                    { name: 'Ergonomic Mousepad', price: '$43.00', qty: 1, sku: 'SRM-MP-05', vendor: 'Apex Sports', image: 'https://picsum.photos/seed/m2/60/60' },
                  ].map((item, i) => (
                    <div key={i} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt="" className="w-16 h-16 rounded-xl object-cover border border-slate-200" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">SKU: {item.sku} • Vendor: {item.vendor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">{item.price}</p>
                        <p className="text-[10px] text-slate-400 font-medium">Qty: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subtotal</p>
                    <p className="text-sm font-bold text-slate-900">$132.00</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Shipping</p>
                    <p className="text-sm font-bold text-slate-900">$10.00</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tax (0%)</p>
                    <p className="text-sm font-bold text-slate-900">$0.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-lg font-bold text-blue-600">$142.00</p>
                  </div>
                </div>
              </section>

              {/* Order Timeline */}
              <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-8">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Order Timeline</h3>
                </div>
                <div className="space-y-8 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  {[
                    { status: 'Package Shipped', time: 'Oct 25, 2023 • 09:15 AM', desc: 'Package has been picked up by DHL Express. Tracking: #DHL-9921-X', icon: Truck, color: 'bg-blue-600 text-white' },
                    { status: 'Order Processed', time: 'Oct 24, 2023 • 04:20 PM', desc: 'Vendor has confirmed the order and prepared the package.', icon: Check, color: 'bg-emerald-500 text-white' },
                    { status: 'Payment Confirmed', time: 'Oct 24, 2023 • 02:35 PM', desc: 'Payment of $142.00 was successfully processed via Visa.', icon: CreditCard, color: 'bg-emerald-500 text-white' },
                    { status: 'Order Placed', time: 'Oct 24, 2023 • 02:34 PM', desc: 'Customer initiated the order from the web storefront.', icon: FileText, color: 'bg-slate-400 text-white' },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border-4 border-white ${step.color}`}>
                        <step.icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="text-sm font-bold text-slate-900">{step.status}</h4>
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{step.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Customer & Shipping */}
            <div className="space-y-8">
              {/* Customer Info */}
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Customer Info</h3>
                  <Link to="/admin/users/1" className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">View Profile</Link>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">SJ</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Sarah Jenkins</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Customer since 2022</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium">s.jenkins@example.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium">+1 (555) 012-3456</span>
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Shipping Address</h3>
                  <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Edit</button>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600 leading-relaxed font-medium">
                    Sarah Jenkins<br />
                    1234 Maple Avenue, Suite 400<br />
                    Los Angeles, CA 90001<br />
                    United States
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Shipping Method</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">DHL Express International</span>
                    <span className="text-xs font-bold text-slate-900">$10.00</span>
                  </div>
                </div>
              </section>

              {/* Administrative Actions */}
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Order Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    <FileText className="w-4 h-4" />
                    <span>Download Invoice</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    <AlertCircle className="w-4 h-4" />
                    <span>Open Dispute</span>
                  </button>
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all">
                      <X className="w-4 h-4" />
                      <span>Cancel Order</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminOrderDetailsPage;
