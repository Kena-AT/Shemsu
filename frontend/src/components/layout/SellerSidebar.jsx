import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Rocket
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../state/useAuthStore';

const navItems = [
  { to: '/seller', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/seller/products', label: 'Products', icon: Package },
  { to: '/seller/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/seller/analytics', label: 'Analytics', icon: BarChart3 },
];

const bottomItems = [
  { to: '/seller/settings', label: 'Settings', icon: Settings },
  { to: '/seller/support', label: 'Support', icon: HelpCircle },
];

const SellerSidebar = ({ activeNav, onNavigate }) => {
  const location = useLocation();
  const { user } = useAuthStore();

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
              to={item.to}
              onClick={handleClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                active 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={handleClick}
            className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 border border-slate-200 flex items-center justify-center text-white font-bold text-sm">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'S'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-slate-900 truncate">{user?.fullName || 'Store Owner'}</span>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Store Owner</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SellerSidebar;
