import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../state/useAuthStore';
import { useSeller } from '../../hooks/useSeller';

const SellerSidebar = ({ activeNav, onNavigate }) => {
  const location = useLocation();
  const { user } = useAuthStore();
  const { useGetVerificationStatus } = useSeller();
  const { data: statusData } = useGetVerificationStatus();

  const status = statusData?.status || user?.verificationStatus || 'none';
  const isApproved = status === 'approved';

  const navItems = [
    { to: '/seller', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/seller/products', label: 'Products', icon: Package, locked: !isApproved },
    { to: '/seller/orders', label: 'Orders', icon: ShoppingCart, locked: !isApproved },
    { to: '/seller/analytics', label: 'Analytics', icon: BarChart3, locked: !isApproved },
    ...(!isApproved ? [{ to: '/seller/verify', label: 'Verification', icon: ShieldAlert }] : []),
  ];

  const bottomItems = [
    { to: '/seller/settings', label: 'Settings', icon: Settings, locked: !isApproved },
    { to: '/seller/support', label: 'Support', icon: HelpCircle },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.to;
    return location.pathname.startsWith(item.to);
  };

  const handleClick = () => {
    if (onNavigate) onNavigate();
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full">
      <div className="p-6 border-b border-slate-100">
        <Link to="/seller" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            <Rocket className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">Shemsu</span>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Seller Portal</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = activeNav ? activeNav === item.label : isActive(item);
          return (
            <Link
              key={item.to}
              to={item.locked ? '#' : item.to}
              onClick={(e) => {
                if (item.locked) {
                  e.preventDefault();
                  return;
                }
                handleClick();
              }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors ${
                active 
                  ? 'bg-blue-50 text-blue-600' 
                  : item.locked 
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {item.locked && (
                <div title="Verification Required">
                   <ShieldAlert size={14} className="text-slate-300" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.to}
            to={item.locked ? '#' : item.to}
            onClick={(e) => {
              if (item.locked) {
                e.preventDefault();
                return;
              }
              handleClick();
            }}
            className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors ${
              item.locked 
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
            {item.locked && <ShieldAlert size={14} className="text-slate-300" />}
          </Link>
        ))}
        
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 px-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-600 border border-slate-200 flex items-center justify-center text-white font-bold text-sm">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-slate-100">
              {status === 'approved' ? (
                <ShieldCheck size={14} className="text-emerald-500" />
              ) : status === 'pending' ? (
                <Clock size={14} className="text-amber-500" />
              ) : (
                <ShieldAlert size={14} className="text-rose-500" />
              )}
            </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-slate-900 truncate">{user?.fullName || 'Store Owner'}</span>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${
              status === 'approved' ? 'text-emerald-600' :
              status === 'pending' ? 'text-amber-600' :
              'text-rose-600'
            }`}>
              {status === 'none' ? 'UNVERIFIED' : status}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SellerSidebar;
