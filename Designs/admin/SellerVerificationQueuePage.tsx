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
  Filter,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Download,
  FileCheck,
  FileX,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerVerificationQueuePage = () => {
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [sellerList, setSellerList] = useState([
    { id: '1', name: 'Lumina Tech Solutions', category: 'Electronics', date: 'Oct 12, 2023', time: '10:45 AM', status: 'VERIFIED', color: 'text-emerald-600 bg-emerald-50' },
    { id: '2', name: 'Velvet Threads Co.', category: 'Fashion', date: 'Oct 14, 2023', time: '02:15 PM', status: 'PENDING REVIEW', color: 'text-amber-600 bg-amber-50' },
    { id: '3', name: 'Nordic Living', category: 'Home Decor', date: 'Oct 15, 2023', time: '09:00 AM', status: 'INCOMPLETE', color: 'text-rose-600 bg-rose-50' },
    { id: '4', name: 'Organic Bites', category: 'Food & Beverage', date: 'Oct 16, 2023', time: '11:30 AM', status: 'VERIFIED', color: 'text-emerald-600 bg-emerald-50' },
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Queue exported successfully!');
    }, 1200);
  };

  const handleAction = (id: string, action: 'VERIFIED' | 'REJECTED') => {
    setSellerList(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: action,
          color: action === 'VERIFIED' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
        };
      }
      return s;
    }));
  };

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
          <Link to="/admin/verification" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm transition-all">
            <CheckCircle className="w-4 h-4" />
            <span>Seller Verification</span>
          </Link>
          <Link to="/admin/moderation" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
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
            <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Seller Verification Queue</h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-1">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-600 uppercase tracking-widest">Verification</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleRefresh}
              className={`flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-all ${isRefreshing ? 'animate-pulse' : ''}`}
            >
              <RotateCcw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Queue'}</span>
            </button>
            <div className="h-6 w-[1px] bg-slate-200"></div>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">AK</div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Seller Verification Queue</h1>
            <p className="text-slate-500 text-sm mt-1">Review and manage pending applications for Shemsu Marketplace.</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Pending Verification', value: '128', change: '+12.5%', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Verified Today', value: '42', change: '+5.2%', icon: FileCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Rejected Today', value: '12', change: '-2.1%', icon: FileX, color: 'text-rose-600', bg: 'bg-rose-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                  <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <span>All Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <span>All Statuses</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Exporting...' : 'Export Queue'}</span>
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 w-12">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Business Details</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registration Date</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Documents Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sellerList.map((seller) => (
                    <tr key={seller.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                            {seller.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{seller.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">ID: SL-{seller.id}292-UT</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">{seller.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">{seller.date}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{seller.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-12 h-1 rounded-full ${seller.color.split(' ')[0]}`}></div>
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${seller.color.split(' ')[1]}`}>{seller.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleAction(seller.id, 'VERIFIED')}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            title="Approve"
                          >
                            <FileCheck className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleAction(seller.id, 'REJECTED')}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            title="Reject"
                          >
                            <FileX className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 1-10 of 128 sellers</p>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-[10px] font-bold">1</button>
                <button className="w-8 h-8 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-200">2</button>
                <button className="w-8 h-8 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-200">3</button>
                <span className="text-slate-400 px-2">...</span>
                <button className="w-8 h-8 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-200">13</button>
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Detailed View Placeholder */}
          <div className="bg-white p-12 rounded-3xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Detailed View Modal Mockup</h3>
            <p className="text-sm text-slate-500 max-w-md mt-2">Select a seller from the queue to view full profile details, uploaded documents (ID, Tax Registration), and verification history.</p>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <FileText className="w-3.5 h-3.5" />
                <span>TAX_REG_PDF</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <FileText className="w-3.5 h-3.5" />
                <span>BUSINESS_ID_JPG</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerVerificationQueuePage;
