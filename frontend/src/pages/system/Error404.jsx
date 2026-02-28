import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, LifeBuoy, Ghost } from 'lucide-react';
import Button from '../../components/common/Button';

const Error404 = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/app/marketplace/search?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl w-full space-y-12">
        {/* Animated Illustration Placeholder */}
        <div className="relative mx-auto w-32 h-32 bg-slate-50 rounded-3xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
          <Ghost className="w-16 h-16 text-slate-300" />
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            404
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Lost in the marketplace?</h1>
          <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">
            We couldn't find the page you're looking for. Please check the web address for typos or try searching for a product below.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search Shemsu marketplace..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all text-slate-900"
          />
        </form>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button onClick={() => navigate('/app')} variant="primary" className="px-8">
            Return Home
          </Button>
          <Button onClick={() => navigate('/app/contact')} variant="outline" className="px-8">
            Contact Support
          </Button>
        </div>

        {/* Popular Categories */}
        <div className="space-y-4 pt-10">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Or try these popular categories</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Trending Items', 'New Arrivals', 'Electronics', 'Fashion'].map((cat) => (
              <button 
                key={cat}
                onClick={() => navigate('/app/marketplace')}
                className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs font-medium text-slate-600 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center gap-2"
              >
                <ArrowRight size={12} className="text-slate-300" />
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 flex items-center gap-8 text-[11px] font-medium text-slate-300">
        <p>© 2026 Shemsu Marketplace. All rights reserved.</p>
        <div className="flex gap-6">
            <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-900 cursor-pointer border-l border-slate-200 pl-6">Help Center</span>
        </div>
      </div>
    </div>
  );
};

export default Error404;
