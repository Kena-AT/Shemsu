import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Filter, ChevronDown, Star, LayoutGrid, List, SlidersHorizontal, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || 'wireless headphones';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const results = [
    { id: 1, name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 398.00, rating: 4.9, reviews: 2450, image: 'https://picsum.photos/seed/sony1/400/400', brand: 'Sony', category: 'Electronics' },
    { id: 2, name: 'Bose QuietComfort Ultra Wireless Noise Cancelling Headphones', price: 429.00, rating: 4.8, reviews: 1840, image: 'https://picsum.photos/seed/bose1/400/400', brand: 'Bose', category: 'Electronics' },
    { id: 3, name: 'Apple AirPods Max - Space Gray', price: 549.00, rating: 4.7, reviews: 5620, image: 'https://picsum.photos/seed/apple1/400/400', brand: 'Apple', category: 'Electronics' },
    { id: 4, name: 'Sennheiser Momentum 4 Wireless Headphones', price: 379.95, rating: 4.6, reviews: 920, image: 'https://picsum.photos/seed/senn1/400/400', brand: 'Sennheiser', category: 'Electronics' },
    { id: 5, name: 'JBL Tune 760NC - Lightweight, Foldable Wireless Over-Ear', price: 129.95, rating: 4.4, reviews: 3100, image: 'https://picsum.photos/seed/jbl1/400/400', brand: 'JBL', category: 'Electronics' },
    { id: 6, name: 'Beats Studio Pro - Wireless Bluetooth Noise Cancelling', price: 349.99, rating: 4.5, reviews: 1250, image: 'https://picsum.photos/seed/beats1/400/400', brand: 'Beats', category: 'Electronics' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
              <span className="text-xl font-bold tracking-tight">Shemsu</span>
            </Link>
          </div>
          
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-50 rounded-full relative">
              <ShoppingCart className="w-5 h-5 text-slate-600" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full">2</span>
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full">
              <User className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-xl font-medium text-slate-500">
              Search results for <span className="text-slate-900 font-bold">"{initialQuery}"</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">Found {results.length} results</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm font-medium">
              <span className="text-slate-500">Sort by:</span>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                Relevance <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-full md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="space-y-8">
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Categories
                </h3>
                <div className="space-y-2">
                  {['Electronics', 'Audio', 'Accessories', 'Computers'].map(cat => (
                    <label key={cat} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-blue-600">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600" defaultChecked={cat === 'Electronics' || cat === 'Audio'} />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input type="range" className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded p-2 text-xs">$0</div>
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded p-2 text-xs">$1,000+</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Customer Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2].map(rating => (
                    <label key={rating} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-xs">& Up</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
              {results.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate('/product')}
                  className={`bg-white rounded-xl border border-slate-100 overflow-hidden group cursor-pointer ${viewMode === 'list' ? 'flex gap-6 p-4' : 'shadow-sm'}`}
                >
                  <div className={`bg-slate-50 relative overflow-hidden flex-shrink-0 ${viewMode === 'list' ? 'w-48 h-48 rounded-lg' : 'aspect-square'}`}>
                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all z-10">
                      <Heart className="w-4 h-4 text-slate-600" />
                    </button>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className={`flex flex-col ${viewMode === 'list' ? 'flex-1 py-2' : 'p-4'}`}>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-xs text-slate-400">({product.reviews})</span>
                    </div>
                    <h3 className="font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-slate-400 mb-4">{product.brand} • {product.category}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button className="px-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
                Load More Results
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} />
    </div>
  );
};

export default SearchResultsPage;
