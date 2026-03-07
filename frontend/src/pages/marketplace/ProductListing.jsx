import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Search, ShoppingCart, Star, Heart, Filter, ChevronDown, Grid, List, LayoutGrid, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { formatPrice, formatNumber } from '../../lib/utils';
import Footer from '../../components/layout/Footer';

const ProductListing = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const search = searchParams.get('search');

  const { data: categories } = useCategories();
  const { useGetProducts } = useProducts();
  const { data: products, isLoading } = useGetProducts({ categoryId, search });

  const [priceRange, setPriceRange] = useState(1000000);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('Newest Arrivals');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(search || '');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchParams.set('search', searchQuery);
      setSearchParams(searchParams);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = products.filter(p => parseFloat(p.price) <= priceRange);
    
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    
    return result;
  }, [products, priceRange, sortBy]);

  const activeCategory = categories?.find(c => c.id === categoryId);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0 text-left">
            <div className="mb-8">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Categories
              </h3>
              <ul className="space-y-2 text-sm">
                <li 
                  onClick={() => {
                    searchParams.delete('categoryId');
                    setSearchParams(searchParams);
                  }}
                  className={`flex justify-between items-center cursor-pointer transition-colors ${!categoryId ? 'text-blue-600 font-medium' : 'text-slate-600 hover:text-blue-600'}`}
                >
                  <span>All Categories</span>
                  <span className="text-slate-400 font-normal">{formatNumber(1240)}</span>
                </li>
                {categories?.map((cat) => (
                  <li 
                    key={cat.id}
                    onClick={() => {
                      searchParams.set('categoryId', cat.id);
                      setSearchParams(searchParams);
                    }}
                    className={`flex justify-between items-center cursor-pointer transition-colors ${categoryId === cat.id ? 'text-blue-600 font-medium' : 'text-slate-600 hover:text-blue-600'}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-slate-400">{formatNumber(452)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-4">Price Range: <span className="text-blue-600">{formatPrice(priceRange)}</span></h3>
              <div className="px-2">
                <input 
                  type="range" 
                  min="0" 
                  max="1000000" 
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
                  <span>{formatPrice(0)}</span>
                  <span>{formatPrice(1000000)}+</span>
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
              onClick={() => setPriceRange(1000000)}
              className="w-full py-2 text-slate-500 text-sm hover:text-blue-600 transition-colors"
            >
              Clear all
            </button>
          </aside>

          {/* Main Content */}
          <div className="flex-1 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">{activeCategory?.name || 'All Products'}</h1>
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

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="aspect-square bg-slate-50 animate-pulse rounded-xl" />)}
              </div>
            ) : filteredProducts.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-24 text-center">
                  <Package className="text-slate-200 mb-4" size={64} />
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-slate-500">Try adjusting your filters or search terms.</p>
               </div>
            ) : (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" : "flex flex-col gap-4 mb-12"}>
                {filteredProducts.map((product) => {
                  const price = parseFloat(product.price);
                  return (
                    <motion.div 
                      key={product.id}
                      whileHover={{ y: -5 }}
                      onClick={() => navigate(`/app/marketplace/product/${product.id}`)}
                      className={`bg-white rounded-xl p-4 shadow-sm border border-slate-100 group cursor-pointer ${viewMode === 'list' ? 'flex gap-6' : 'flex flex-col'}`}
                    >
                      <div className={`relative rounded-lg overflow-hidden bg-slate-50 flex-shrink-0 ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square mb-4'}`}>
                        {product.stock < 10 && (
                          <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded z-10 transition-all">
                            LOW STOCK
                          </span>
                        )}
                        <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <Heart className="w-4 h-4 text-slate-600" />
                        </button>
                        {product.images?.[0] ? (
                          <img 
                            src={product.images[0].url} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center">
                              <Package className="text-slate-100" size={48} />
                           </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className={`w-3 h-3 ${product.rating > 0 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                          <span className="text-xs font-medium">{Number(product.rating || 0).toFixed(1)}</span>
                          <span className="text-xs text-slate-400">({product.reviewCount || 0})</span>
                        </div>
                        <h3 className="font-semibold text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{product.name}</h3>
                        <p className="text-xs text-slate-400 mb-2">by {product.vendorName || 'Global Vendor'}</p>
                        {viewMode === 'list' && (
                          <p className="text-sm text-slate-500 mt-2 line-clamp-3">
                            {product.description || "Experience high-quality performance with this premium selection. Perfect for daily use and professional tasks."}
                          </p>
                        )}
                        <div className={`flex items-center justify-between mt-auto ${viewMode === 'list' ? 'pt-4 border-t border-slate-50' : 'pt-4'}`}>
                          <span className="font-bold text-lg">{formatPrice(price)}</span>
                          <button className="p-2 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-lg transition-all">
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
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
            )}
          </div>
        </div>
      </main>

      <Footer showCompany={false} />
    </div>
  );
};

export default ProductListing;
