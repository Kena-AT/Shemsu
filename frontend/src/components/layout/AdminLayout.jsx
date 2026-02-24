import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Search, ChevronRight, Calendar, ChevronDown } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { cn } from '../../lib/utils';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') return 'Platform Overview';
    if (path.includes('/users')) return 'User Management';
    if (path.includes('/verifications')) return 'Seller Verification';
    if (path.includes('/moderation')) return 'Product Moderation';
    if (path.includes('/orders')) return 'Global Orders';
    if (path.includes('/payouts')) return 'Payout Management';
    if (path.includes('/analytics')) return 'Reports & Analytics';
    if (path.includes('/audit')) return 'Audit Logs';
    if (path.includes('/settings')) return 'System Settings';
    return 'Admin Console';
  };

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') return 'Dashboard';
    if (path.includes('/users')) return 'Users';
    if (path.includes('/verifications')) return 'Verification';
    if (path.includes('/moderation')) return 'Moderation';
    if (path.includes('/orders')) return 'Orders';
    if (path.includes('/audit')) return 'Logs';
    if (path.includes('/settings')) return 'Settings';
    return 'Console';
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl z-50 flex items-center justify-center hover:bg-blue-700 transition-all active:scale-90 border border-blue-400/30"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      <div className={cn(
        "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-500",
        isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsSidebarOpen(false)} />
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-500 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <AdminSidebar onNavigate={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Admin Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{getPageTitle()}</h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-1">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-600 uppercase tracking-widest">{getBreadcrumb()}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search users, orders, or logs..." 
                className="bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-80 transition-all font-medium"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative group">
                <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden md:block"></div>
              
              <div className="relative group hidden md:block">
                <button className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{timeRange}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 overflow-hidden">
                  {['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'All Time'].map((range) => (
                    <button 
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className="w-full text-left px-4 py-2 text-[10px] font-bold text-slate-600 hover:bg-slate-50 uppercase tracking-wider"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm shadow-blue-200 flex items-center gap-2">
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-auto bg-[#F8FAFC] p-8 no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
