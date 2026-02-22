import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Star, Heart, Filter, ChevronDown, Grid, List, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const ProductListingPage = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState(5000);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('Newest Arrivals');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const initialProducts = [
    { id: 1, name: 'Wireless Noise Cancelling Headphones', brand: 'TechGear Pro', price: 299.00, rating: 4.8, reviews: 1240, image: 'https://picsum.photos/seed/hp1/400/400', bestseller: true },
    { id: 2, name: 'Series 7 Smartwatch with Health Tracking', brand: 'OmniStyle', price: 149.50, rating: 4.5, reviews: 850, image: 'https://picsum.photos/seed/sw1/400/400' },
    { id: 3, name: 'Classic Leather Analog Timepiece', brand: 'ChronoMasters', price: 89.00, rating: 4.2, reviews: 340, image: 'https://picsum.photos/seed/watch2/400/400' },
    { id: 4, name: 'Instant Analog Retro Camera', brand: 'SnapPhoto', price: 120.00, rating: 4.7, reviews: 1540, image: 'https://picsum.photos/seed/cam1/400/400', discount: '20%' },
    { id: 5, name: 'Ultra-Thin 15" Gaming Laptop', brand: 'TechGear Pro', price: 1299.00, rating: 4.9, reviews: 540, image: 'https://picsum.photos/seed/lap1/400/400' },
    { id: 6, name: 'Compact Bluetooth Mechanical Keyboard', brand: 'KeyMasters', price: 119.00, rating: 4.6, reviews: 210, image: 'https://picsum.photos/seed/kb1/400/400' },
    { id: 7, name: 'Polarized Aviator Sunglasses', brand: 'VisionElite', price: 55.00, rating: 4.4, reviews: 120, image: 'https://picsum.photos/seed/sun1/400/400' },
    { id: 8, name: 'Pro-Runner Lightweight Sneakers', brand: 'ActiveStep', price: 125.00, rating: 4.8, reviews: 1100, image: 'https://picsum.photos/seed/shoe1/400/400' },
  ];

  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter(p => p.price <= priceRange);
    
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    return result;
  }, [priceRange, sortBy]);

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
                placeholder="Search for products, brands and more" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-50 rounded-full relative">
              <ShoppingCart className="w-5 h-5 text-slate-600" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full">2</span>
            </button>
            <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-full">
              <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden">
                <img src="https://picsum.photos/seed/user/100/100" alt="User" />
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 mr-1" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="mb-8">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Categories
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between items-center text-slate-600 hover:text-blue-600 cursor-pointer">
                  <span>All Categories</span>
                  <span className="text-slate-400 font-normal">1,240</span>
                </li>
                <li 
                  onClick={() => navigate('/category')}
                  className="flex justify-between items-center text-blue-600 font-medium cursor-pointer"
                >
                  <span>Electronics</span>
                  <span className="text-slate-400">452</span>
                </li>
                <li className="flex justify-between items-center text-slate-600 hover:text-blue-600 cursor-pointer">
                  <span>Fashion</span>
                  <span className="text-slate-400">310</span>
                </li>
                <li className="flex justify-between items-center text-slate-600 hover:text-blue-600 cursor-pointer">
                  <span>Home & Garden</span>
                  <span className="text-slate-400">215</span>
                </li>
                <li className="flex justify-between items-center text-slate-600 hover:text-blue-600 cursor-pointer">
                  <span>Beauty</span>
                  <span className="text-slate-400">189</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-4">Price Range: <span className="text-blue-600">${priceRange}</span></h3>
              <div className="px-2">
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
                  <span>$0</span>
                  <span>$5000+</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-4">Ratings</h3>
              <div className="space-y-2">
                {[4, 3, 2].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                      ))}
                      <span className="text-xs text-slate-500 group-hover:text-blue-600">& Up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4">
              Apply Filters
            </button>
            <button 
              onClick={() => setPriceRange(5000)}
              className="w-full py-2 text-slate-500 text-sm hover:text-blue-600 transition-colors"
            >
              Clear all
            </button>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">Electronics</h1>
                <p className="text-sm text-slate-500">Showing {filteredProducts.length} high-quality products</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium relative">
                  <span className="text-slate-500">Sort by:</span>
                  <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg min-w-[160px] justify-between"
                  >
                    {sortBy} <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isSortOpen && (
                    <div className="absolute top-full right-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-10 overflow-hidden">
                      {['Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Rating'].map((option) => (
                        <button
                          key={option}
                          onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
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

            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" : "flex flex-col gap-4 mb-12"}>
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate('/product')}
                  className={`bg-white rounded-xl p-4 shadow-sm border border-slate-100 group cursor-pointer ${viewMode === 'list' ? 'flex gap-6' : 'flex flex-col'}`}
                >
                  <div className={`relative rounded-lg overflow-hidden bg-slate-50 flex-shrink-0 ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square mb-4'}`}>
                    {product.bestseller && (
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
                        BESTSELLER
                      </span>
                    )}
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
                        -{product.discount}
                      </span>
                    )}
                    <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Heart className="w-4 h-4 text-slate-600" />
                    </button>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-xs text-slate-400">({product.reviews})</span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-slate-400 mb-2">by {product.brand}</p>
                    {viewMode === 'list' && (
                      <p className="text-sm text-slate-500 mt-2 line-clamp-3">
                        Experience high-quality performance with the {product.name}. Perfect for daily use and professional tasks.
                      </p>
                    )}
                    <div className={`flex items-center justify-between mt-auto ${viewMode === 'list' ? 'pt-4 border-t border-slate-50' : 'pt-4'}`}>
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      <button className="p-2 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-lg transition-all">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600">3</button>
              <span className="text-slate-400">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600">12</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer showCompany={false} />
    </div>
  );
};

export default ProductListingPage;
