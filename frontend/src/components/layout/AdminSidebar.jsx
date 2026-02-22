import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  PackageSearch, 
  ListChecks, 
  History, 
  Settings,
  ShieldAlert,
  Menu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../state/useAuthStore';

const navItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/admin/users', label: 'User Management', icon: Users },
  { to: '/admin/verifications', label: 'Seller Verification', icon: ShieldCheck },
  { to: '/admin/moderation', label: 'Product Moderation', icon: PackageSearch },
  { to: '/admin/orders', label: 'Global Orders', icon: ListChecks },
  { to: '/admin/audit', label: 'Audit Logs', icon: History },
];

const bottomItems = [
  { to: '/admin/settings', label: 'System Settings', icon: Settings },
];

const AdminSidebar = ({ onNavigate }) => {
  const location = useLocation();
  const { user } = useAuthStore();

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.to;
    return location.pathname.startsWith(item.to);
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shadow-2xl">
      <div className="p-6 border-b border-slate-800 bg-slate-950/50">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-none">Shemsu</span>
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Admin Control</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                active 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-950/20 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
              isActive(item)
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>{item.label}</span>
          </Link>
        ))}
        
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold text-sm shadow-inner">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-white truncate">{user?.fullName || 'Administrator'}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Superuser</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
