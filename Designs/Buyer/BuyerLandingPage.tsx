import React, { useState } from 'react';
import { Search, User, ShieldCheck, CheckCircle, ArrowRight, Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const BuyerLandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { name: 'Electronics', image: 'https://picsum.photos/seed/elec/400/500', desc: 'Latest tech and high-end tech' },
    { name: 'Fashion', image: 'https://picsum.photos/seed/fashion/400/500', desc: 'Modern styles for everyone' },
    { name: 'Home Decor', image: 'https://picsum.photos/seed/home/400/500', desc: 'Elevate your living space' },
  ];

  const trendingProducts = [
    { id: 1, name: 'Zenith Pro Watch', price: 299.00, rating: 4.9, reviews: 124, image: 'https://picsum.photos/seed/watch/300/300', tag: 'NEW' },
    { id: 2, name: 'AudioPure H1', price: 450.00, rating: 5.0, reviews: 89, image: 'https://picsum.photos/seed/audio/300/300' },
    { id: 3, name: 'Nomad Essential Tee', price: 65.00, rating: 4.7, reviews: 256, image: 'https://picsum.photos/seed/tee/300/300', tag: 'HOT' },
    { id: 4, name: 'Aura Halo Lamp', price: 185.00, rating: 4.8, reviews: 42, image: 'https://picsum.photos/seed/lamp/300/300' },
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
                placeholder="Search products..." 
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
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
              <User className="w-4 h-4" />
              <span>Account</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Decreased height and centered content */}
      <section className="relative bg-[#0a0a0a] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/hero/1920/1080?blur=10" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6">
              Discover Quality from <span className="font-semibold">Global Vendors</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg mb-8 max-w-xl mx-auto">
              A refined marketplace for premium electronics, modern fashion, and elevated home decor. Curated for those who value authenticity and design.
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search products, brands and more" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
                Search
              </button>
            </form>
            
            <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-400">
              <span>Trending:</span>
              <button onClick={() => {setSearchQuery('OLED TV'); navigate('/search?q=OLED%20TV')}} className="hover:text-white transition-colors">#OLED_TV</button>
              <button onClick={() => {setSearchQuery('Watches'); navigate('/search?q=Watches')}} className="hover:text-white transition-colors">#Minimalist_Watches</button>
              <button onClick={() => {setSearchQuery('Smart Home'); navigate('/search?q=Smart%20Home')}} className="hover:text-white transition-colors">#Smart_Home</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges - Centered and in small boxes */}
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
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <Link to="/listing" className="text-blue-600 font-medium flex items-center gap-2 hover:underline">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.name}
              whileHover={{ y: -10 }}
              onClick={() => navigate(cat.name === 'Electronics' ? '/category' : '/listing')}
              className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-slate-300 mb-6">{cat.desc}</p>
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
              <p className="text-slate-500">Most popular picks from across the marketplace</p>
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
            {trendingProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -5 }}
                onClick={() => navigate('/product')}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 group cursor-pointer"
              >
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-slate-100">
                  {product.tag && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                      {product.tag}
                    </span>
                  )}
                  <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-slate-600" />
                  </button>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                  <button className="p-2 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-lg transition-all">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer showNewsletter={false} />
    </div>
  );
};

export default BuyerLandingPage;
