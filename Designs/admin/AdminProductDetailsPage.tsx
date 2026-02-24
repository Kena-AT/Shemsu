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
  Edit3,
  Trash2,
  AlertTriangle,
  ExternalLink,
  Eye,
  Clock,
  Check,
  X,
  Info,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AdminProductDetailsPage = () => {
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
          <Link to="/admin/moderation" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm transition-all">
            <Package className="w-4 h-4" />
            <span>Product Moderation</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
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
            <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Product Details</h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-1">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span>Products</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-600 uppercase tracking-widest">Details</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search products, users..." 
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
                onClick={() => navigate('/admin/moderation')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">Premium Leather Biker Jacket</h1>
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-rose-100">FLAGGED</span>
                </div>
                <p className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-widest">SKU: SRM-LJ-001 • Urban Styles Vendor • Created Oct 12, 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Edit3 className="w-4 h-4" />
                <span>Edit Listing</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                <X className="w-4 h-4" />
                <span>Clear Reports</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Product Media & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Media */}
              <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Product Media</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3 aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100">
                    <img src="https://picsum.photos/seed/jacket1/800/600" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                    <div className="aspect-square rounded-xl overflow-hidden border border-slate-100">
                      <img src="https://picsum.photos/seed/jacket2/200/200" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden border border-slate-100">
                      <img src="https://picsum.photos/seed/jacket3/200/200" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-400">+2 More</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Full Description */}
              <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Full Description</h3>
                  </div>
                  <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Edit Content</button>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Crafted from premium full-grain lambskin leather, this biker jacket is designed for those who value both style and durability. Featuring classic asymmetrical zip closure, multiple functional pockets, and quilted shoulder panels.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li>100% Genuine Lambskin Leather</li>
                    <li>Polyester satin lining for comfort</li>
                    <li>High-quality YKK hardware zippers</li>
                    <li>Adjustable waist belts for a custom fit</li>
                  </ul>
                </div>
              </section>

              {/* Inventory History */}
              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Inventory History</h3>
                  </div>
                  <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Adjust Stock</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Change</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reason</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Staff</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { date: 'Oct 24, 14:20', change: '-1 Unit', reason: 'Sales Order', order: '#ORD-5521', staff: 'System' },
                        { date: 'Oct 23, 09:15', change: '+10 Units', reason: 'Restock', order: '-', staff: 'j_admin_01' },
                        { date: 'Oct 21, 16:45', change: '-2 Units', reason: 'Damaged/Returns', order: '#ORD-5489', staff: 'm_manager' },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 text-xs font-medium text-slate-600">{item.date}</td>
                          <td className={`px-6 py-4 text-xs font-bold ${item.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{item.change}</td>
                          <td className="px-6 py-4 text-xs text-slate-600">{item.reason}</td>
                          <td className="px-6 py-4 text-xs font-bold text-blue-600 hover:underline cursor-pointer">{item.order}</td>
                          <td className="px-6 py-4 text-xs text-slate-400">{item.staff}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column: Status & Reports */}
            <div className="space-y-8">
              {/* Current Status */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Current Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visibility</span>
                    <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                      <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer right-0 border-blue-600"/>
                      <label className="toggle-label block overflow-hidden h-4 rounded-full bg-blue-600 cursor-pointer"></label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stock Level</span>
                    <span className="text-xs font-bold text-slate-900">42 Units</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sales Velocity</span>
                    <div className="flex items-center gap-1 text-emerald-600">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">~12% (30d)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price</span>
                    <span className="text-lg font-bold text-slate-900">$249.00</span>
                  </div>
                </div>
              </div>

              {/* Active Reports */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Active Reports (3)</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { type: 'Misleading Description', time: '2h ago', desc: 'User claims the leather feels like synthetic material, not real lambskin.' },
                    { type: 'Policy Violation', time: '1d ago', desc: 'Third-party external link found in product specifications section.' },
                    { type: 'Counterfeit Check', time: '2d ago', desc: 'Auto-flagged: High number of recent negative feedback about authenticity.' },
                  ].map((report, i) => (
                    <div key={i} className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">{report.type}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{report.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{report.desc}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 bg-rose-600 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">
                  Disable This Listing
                </button>
              </div>

              {/* Admin Activity */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Admin Activity</h3>
                <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
                  {[
                    { action: 'Listing Flagged', user: 'System', time: 'Oct 24, 14:20' },
                    { action: 'Price Adjusted to $249', user: 'j_admin_01', time: 'Oct 20, 2023' },
                    { action: 'Images Uploaded', user: 'Urban Styles', time: 'Oct 12, 2023' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 relative z-10">
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-sm shrink-0 mt-1"></div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{item.action}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5 uppercase tracking-widest">{item.time} • By {item.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="p-8 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
            © 2024 Shemsu Administration Console. Internal Use Only.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default AdminProductDetailsPage;
