import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronRight, 
  Laptop, 
  Smartphone, 
  Headphones, 
  Camera, 
  Watch, 
  Star, 
  ChevronDown,
  Package,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import Footer from '../../components/layout/Footer';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { useGetProducts } = useProducts();
  const { useGetCategories } = useCategories();
  
  const [activeTab, setActiveTab] = useState('All');
  const [priceRange, setPriceRange] = useState(5000);
  
  const { data: categories } = useGetCategories();
  const { data: productsData, isLoading } = useGetProducts({ 
    categoryId: categoryId,
    limit: 50 
  });

  const category = useMemo(() => 
    categories?.find(c => c.id === categoryId), 
    [categories, categoryId]
  );

  const filteredProducts = useMemo(() => {
    if (!productsData) return [];
    let filtered = productsData;
    
    if (activeTab !== 'All') {
      // Logic for subcategories if they existed in backend
      // For now, we'll just show all since we don't have subcategory data
    }
    
    return filtered.filter(p => parseFloat(p.price) <= priceRange);
  }, [productsData, activeTab, priceRange]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Category...</div>;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 text-left">
          <Link to="/app" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/app/marketplace" className="hover:text-blue-600">Categories</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-medium">{category?.name || 'Category'}</span>
        </nav>

        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">{category?.name || 'Marketplace'}</h1>
            <p className="text-slate-500 leading-relaxed">
              {category?.description || `Explore our premium selection of ${category?.name || 'products'}. Quality guaranteed from verified vendors across the globe.`}
            </p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
            Trending Deals <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-category Tabs Placeholder */}
        <div className="flex flex-wrap gap-3 mb-12">
          {['All', 'Premium', 'New Arrivals', 'Best Sellers'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-10 text-left">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Filters</h3>
              <button 
                onClick={() => {
                  setPriceRange(5000);
                  setActiveTab('All');
                }}
                className="text-xs text-blue-600 font-medium"
              >
                CLEAR ALL
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-600 rounded-full"></span> Price Range
                </h4>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded p-2 text-xs">
                    <span className="text-slate-400">$</span> 0
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded p-2 text-xs">
                    <span className="text-slate-400">$</span> {priceRange}
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0"
                  max="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                />
              </div>

              <div>
                <h4 className="text-sm font-bold mb-4">Customer Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2].map(rating => (
                    <label key={rating} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer group">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
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
              
              <div className="p-6 bg-slate-900 rounded-2xl text-white">
                <h4 className="font-bold mb-2">Vendor Protection</h4>
                <p className="text-xs text-slate-400 mb-4">Get 100% money back guarantee on all verified items.</p>
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold ring-1 ring-blue-400/30 w-fit px-3 py-1 rounded-full">
                  <Package className="w-3 h-3" /> GLOBAL SHIPPING
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-medium text-slate-500"><span className="text-slate-900 font-bold">{filteredProducts.length}</span> products found</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Sort by:</span>
                <button className="font-bold flex items-center gap-1">Newest Arrivals <ChevronDown className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p) => (
                  <motion.div 
                    layout
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8 }}
                    onClick={() => navigate(`/app/marketplace/product/${p.id}`)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4">
                      {p.stock < 10 && (
                        <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded bg-orange-500 text-white z-10 uppercase tracking-wider">
                          Low Stock
                        </span>
                      )}
                      {p.images?.[0] ? (
                        <img 
                          src={p.images[0].url} 
                          alt={p.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200"><Package size={48} /></div>
                      )}
                      <button className="absolute bottom-3 right-3 p-2.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 hover:bg-blue-600 hover:text-white">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-2.5 h-2.5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                      ))}
                      <span className="text-[10px] text-slate-400 ml-1">(1.2k)</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{p.name}</h3>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-1">{p.description || 'Premium quality guaranteed.'}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black">${parseFloat(p.price).toFixed(2)}</span>
                      <span className="text-sm text-slate-400 line-through">${(parseFloat(p.price) * 1.2).toFixed(2)}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination Placeholder */}
            {filteredProducts.length > 0 && (
              <div className="flex items-center justify-center gap-4 py-8 border-t border-slate-100">
                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><ChevronDown className="w-5 h-5 rotate-90" /></button>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-200">1</button>
                  <button className="w-10 h-10 rounded-xl hover:bg-slate-50 text-sm font-bold transition-colors">2</button>
                  <button className="w-10 h-10 rounded-xl hover:bg-slate-50 text-sm font-bold transition-colors">3</button>
                </div>
                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><ChevronDown className="w-5 h-5 -rotate-90" /></button>
              </div>
            )}
            
            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your price range or filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} />
    </div>
  );
};

export default CategoryPage;
