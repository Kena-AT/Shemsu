import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Rocket, ShoppingBag, Search, User, LogOut, Menu, X, Heart, ShoppingCart } from 'lucide-react';
import { useAuthStore } from '../../state/useAuthStore';
import { useCartStore } from '../../state/useCartStore';
import { useCart } from '../../hooks/useCart';
import { cn } from '../../lib/utils';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { itemCount, setItems } = useCartStore();
  const { useGetCart } = useCart();
  const { data: cart } = useGetCart();
  
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (cart?.items) {
      setItems(cart.items);
    }
  }, [cart, setItems]);

  const isSellerPage = location.pathname.startsWith('/seller');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/app/marketplace/search?search=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  if (isSellerPage) return null;

  return (
    <header className="border-b border-slate-100 sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 hover:bg-slate-50 rounded-full md:hidden text-slate-600 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Link to="/app" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="Shemsu Logo" className="h-8 w-auto mix-blend-multiply" />
            <span className="text-xl font-bold tracking-tight text-slate-900">Shemsu</span>
          </Link>
        </div>
        
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {isAuthenticated && user?.role === 'buyer' && (
            <Link to="/app/orders" className="p-2 hover:bg-slate-50 rounded-full transition-colors hidden sm:block" title="My Orders">
              <ShoppingBag className="w-5 h-5 text-slate-600" />
            </Link>
          )}

          <Link to="/app/cart" className="p-2 hover:bg-slate-50 rounded-full relative transition-colors">
            <ShoppingCart className="w-5 h-5 text-slate-600" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div 
              className="flex items-center gap-2 p-1 bg-slate-50 rounded-full cursor-pointer hover:bg-slate-100 transition-colors" 
              onClick={() => navigate(user.role === 'seller' ? '/seller' : '/app/profile')}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-700 pr-2 hidden sm:block">
                {user.role === 'seller' ? 'Hub' : (user?.fullName?.split(' ')[0] || 'User')}
              </span>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-4 md:px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all shadow-sm text-sm">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
              <span className="sm:hidden">Log</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white p-4 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
            />
          </div>
          <nav className="flex flex-col gap-2">
            <Link to="/app/marketplace" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">Marketplace</Link>
            <Link to="/app/orders" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">My Orders</Link>
            <Link to="/app/profile" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">My Profile</Link>
            <Link to="/app/cart" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">Shopping Cart</Link>
            {user?.role === 'seller' && (
              <Link to="/seller" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg">Seller Dashboard</Link>
            )}
            {isAuthenticated && (
              <button 
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg text-left"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
