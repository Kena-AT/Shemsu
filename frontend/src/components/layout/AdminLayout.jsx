import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X, Bell, Search, ShieldAlert } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { cn } from '../../lib/utils';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 overflow-hidden relative font-sans">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl z-50 flex items-center justify-center hover:bg-indigo-700 transition-all active:scale-90 border border-indigo-400/30"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      <div className={cn(
        "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-all duration-500",
        isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsSidebarOpen(false)} />
      
      {/* Sidebar - Desktop and Mobile */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-500 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <AdminSidebar onNavigate={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Admin Header */}
        <header className="h-20 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 lg:hidden">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="text-white font-black uppercase tracking-tighter italic">Shemsu Admin</span>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Management Console</span>
            <div className="h-1 w-1 rounded-full bg-slate-700" />
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">System Normal</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-slate-950/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64 transition-all"
              />
            </div>
            
            <button className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all relative group">
              <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-auto bg-slate-950 p-6 lg:p-10 no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
