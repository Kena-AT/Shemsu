import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Filter, 
  ChevronDown, 
  Star, 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  Heart,
  Package,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import Footer from '../../components/layout/Footer';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  
  const [internalQuery, setInternalQuery] = useState(query);
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(5000);

  const { useGetProducts } = useProducts();
  const { data: products, isLoading } = useGetProducts({ 
    search: query,
    limit: 50 
  });

  useEffect(() => {
    setInternalQuery(query);
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (internalQuery.trim()) {
      setSearchParams({ search: internalQuery });
    }
  };

  const filteredResults = useMemo(() => {
    if (!products) return [];
    return products.filter(p => parseFloat(p.price) <= priceRange);
  }, [products, priceRange]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Searching Marketplace...</div>;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 text-left">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-2xl font-medium text-slate-500 mb-4">
              Results for <span className="text-slate-900 font-bold">"{query}"</span>
            </h1>
            <form onSubmit={handleSearchSubmit} className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                value={internalQuery}
                onChange={(e) => setInternalQuery(e.target.value)}
                placeholder="Search again..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-lg shadow-sm"
              />
            </form>
          </div>
          
          <div className="flex items-center gap-4 self-end">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 text-left">
          {/* Filters Sidebar */}
          <aside className={`w-full md:w-64 flex-shrink-0 transition-all ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="sticky top-24 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</h3>
                {isFilterOpen && (
                  <button onClick={() => setIsFilterOpen(false)} className="md:hidden p-1 hover:bg-slate-100 rounded-full">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input 
                    type="range" 
                    min="0"
                    max="5000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold">ETB 0</div>
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold">ETB {priceRange}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-4">Quick Ratings</h3>
                <div className="space-y-3">
                  {[4, 3].map(rating => (
                    <label key={rating} className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center group-hover:border-blue-600 transition-colors">
                        <div className="w-3 h-3 bg-blue-600 rounded-sm opacity-0 group-hover:opacity-20 transition-all" />
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-xs group-hover:text-blue-600 transition-colors">& Up</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results Display */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-400">Showing {filteredResults.length} of {products?.length || 0} products</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Sort:</span>
                <button className="font-bold border-b-2 border-slate-900 pb-0.5">Best Match</button>
              </div>
            </div>

            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
              <AnimatePresence mode="popLayout">
                {filteredResults.map((p) => (
                  <motion.div 
                    layout
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/app/marketplace/product/${p.id}`)}
                    className={`bg-white rounded-2xl border border-slate-100 overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all ${viewMode === 'list' ? 'flex gap-8 p-6' : ''}`}
                  >
                    <div className={`bg-slate-50 relative overflow-hidden flex-shrink-0 ${viewMode === 'list' ? 'w-56 h-56 rounded-xl' : 'aspect-square'}`}>
                      <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hover:text-red-500 shadow-lg">
                        <Heart className="w-4 h-4" />
                      </button>
                      {p.images?.[0] ? (
                        <img 
                          src={p.images[0].url} 
                          alt={p.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200"><Package size={48} /></div>
                      )}
                    </div>
                    
                    <div className={`flex flex-col ${viewMode === 'list' ? 'flex-1 py-4' : 'p-5'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold ml-1">4.9</span>
                        </div>
                        <span className="text-xs text-slate-300">|</span>
                        <span className="text-xs text-slate-400 font-medium">1.2k sold</span>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{p.name}</h3>
                      <p className="text-xs font-bold text-blue-600 mb-4 bg-blue-50 w-fit px-2 py-1 rounded uppercase tracking-wider">{p.category?.name || 'Global Select'}</p>
                      
                      {viewMode === 'list' && (
                        <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed">{p.description || 'Premium build quality with international warranty. Best in class performance for daily needs.'}</p>
                      )}

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-2xl font-black text-slate-900">ETB {parseFloat(p.price).toFixed(2)}</span>
                          <span className="text-xs text-emerald-600 font-bold">Free Shipping</span>
                        </div>
                        <button className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredResults.length > 0 && (
              <div className="mt-16 flex flex-col items-center gap-4">
                <button className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                  Load More Results
                </button>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Page 1 of 4</p>
              </div>
            )}
            
            {filteredResults.length === 0 && (
              <div className="py-24 text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No results for "{query}"</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">Try checking your spelling or use more general terms to find what you're looking for.</p>
                <button 
                  onClick={() => setInternalQuery('')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} />
    </div>
  );
};

export default SearchResults;
