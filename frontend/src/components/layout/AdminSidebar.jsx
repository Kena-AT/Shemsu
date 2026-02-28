import React from 'react';
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
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../state/useAuthStore';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/users', label: 'User Management', icon: Users },
  { to: '/admin/verifications', label: 'Seller Verification', icon: ShieldCheck },
  { to: '/admin/moderation', label: 'Product Moderation', icon: Package },
  { to: '/admin/payouts', label: 'Payouts', icon: CreditCard },
  { to: '/admin/analytics', label: 'Reports/Analytics', icon: BarChart3 },
  { to: '/admin/audit', label: 'Audit Logs', icon: FileText },
  { to: '/admin/security', label: 'Security & Middleware', icon: Shield },
];

const bottomItems = [
  { to: '/admin/settings', label: 'Settings', icon: Settings },
  { to: '/admin/docs', label: 'Documentation', icon: FileText },
];

const AdminSidebar = ({ onNavigate }) => {
  const location = useLocation();
  const { user, setUser } = useAuthStore();

  const isActive = (item) => {
    if (item.exact) return location.pathname === '/admin' || location.pathname === '/admin/';
    return location.pathname.startsWith(item.to);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full z-20 overflow-hidden font-sans">
      <div className="p-6 border-b border-slate-100 bg-white">
        <Link to="/admin" className="flex items-center gap-3" onClick={onNavigate}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">Shemsu</span>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Admin Console</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                active 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 bg-white space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              isActive(item)
                ? 'bg-slate-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        ))}
        
        {['/admin/settings', '/admin/profile'].includes(location.pathname) && (
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        )}

        <Link to="/admin/profile" className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 px-2 hover:bg-slate-50 rounded-xl transition-all" onClick={onNavigate}>
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
            {user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('') : 'AD'}
          </div>
          <div className="flex flex-col overflow-hidden text-left">
            <span className="text-sm font-bold text-slate-900 truncate">{user?.fullName || 'Administrator'}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Senior Moderator</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
