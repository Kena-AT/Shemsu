import React, { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import { formatPrice, formatNumber } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Star, 
  ShoppingCart, 
  Heart,
  ShieldCheck, 
  CheckCircle,
  Rocket,
  Package
} from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../../components/layout/Footer';

const MarketplaceHome = () => {
  const { data: categories } = useCategories();
  const { useGetProducts } = useProducts();
  const { data: products, isLoading } = useGetProducts({ limit: 4 });
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if ((e.type === 'click' || e.key === 'Enter') && searchQuery.trim()) {
      navigate(`/app/marketplace?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative bg-[#0a0a0a] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/marketplace_hero_bg_1772288948993.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6">
              Discover Quality from <span className="font-semibold">Local Vendors</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg mb-8 max-w-xl mx-auto">
              A refined marketplace for electronics, modern fashion, and elevated home decor. Curated for those who value authenticity and design.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search products, brands and more" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Search
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-400">
              <span>Trending:</span>
              {products?.slice(0, 3).map((product) => (
                <button 
                  key={product.id}
                  onClick={() => navigate(`/app/marketplace/product/${product.id}`)} 
                  className="hover:text-white transition-colors"
                >
                  #{product.name.replace(/\s+/g, '_')}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 w-full md:w-auto min-w-[240px]">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Secure Payments</h3>
              <p className="text-[11px] text-slate-500">100% encrypted transactions</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 w-full md:w-auto min-w-[240px]">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Verified Vendors</h3>
              <p className="text-[11px] text-slate-500">5000+ handpicked sellers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12 text-left">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <Link to="/app/marketplace" className="text-blue-600 font-medium flex items-center gap-2 hover:underline">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories?.slice(0, 3).map((cat, i) => (
            <motion.div 
              key={cat.id}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/app/marketplace?categoryId=${cat.id}`)}
              className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img 
                src={i === 0 ? "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800" : i === 1 ? "https://images.unsplash.com/photo-1445205170230-053b830c603a?q=80&w=800" : "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800"} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full text-left">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-slate-300 mb-6 text-sm">
                  {cat.name === 'Electronics' ? 'Latest gadgets and high-end tech' : cat.name === 'Fashion' ? 'Modern styles for everyone' : 'Elevate your living space'}
                </p>
                <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-slate-100 transition-colors">
                  Shop Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-left">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
              <p className="text-slate-500 text-sm">Most popular picks from across the marketplace</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="h-[400px] bg-white rounded-xl animate-pulse" />)
            ) : (
              products?.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(`/app/marketplace/product/${product.id}`)}
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 group cursor-pointer"
                >
                  <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-slate-100">
                    {product.stock < 5 && (
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
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
                        <Package className="text-slate-200" size={48} />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className={`w-3 h-3 ${product.rating > 0 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                    <span className="text-xs font-medium">{Number(product.rating || 0).toFixed(1)}</span>
                    <span className="text-xs text-slate-400">({formatNumber(product.reviewCount || 0)} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-slate-900">{formatPrice(parseFloat(product.price))}</span>
                    <button className="p-2 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-lg transition-all">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer showNewsletter={false} />
    </div>
  );
};

export default MarketplaceHome;
