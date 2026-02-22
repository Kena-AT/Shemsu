import React, { useState } from 'react';
import { Search, ShoppingCart, User, ChevronRight, Laptop, Smartphone, Headphones, Camera, Watch, Star, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const CategoryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Laptops');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const subCategories = [
    { name: 'Laptops', icon: Laptop },
    { name: 'Smartphones', icon: Smartphone },
    { name: 'Audio', icon: Headphones },
    { name: 'Cameras', icon: Camera },
    { name: 'Wearables', icon: Watch },
  ];

  const products = [
    { id: 1, name: 'UltraBook Pro 14" OLED', desc: 'M2 Chip, 16GB RAM, 512GB SSD', price: 1299.00, oldPrice: 1499.00, rating: 4.9, reviews: 128, image: 'https://picsum.photos/seed/laptop1/500/400', tag: 'TOP RATED', stock: 'IN STOCK' },
    { id: 2, name: 'SonicWaves Wireless Max', desc: 'Active Noise Cancellation, 40h Battery', price: 349.00, rating: 4.8, reviews: 312, image: 'https://picsum.photos/seed/hp2/500/400', tag: 'SALE', freeShipping: true },
    { id: 3, name: 'Galaxy Pro S24 Ultra', desc: 'AI Enhanced Camera, 256GB Storage', price: 1199.00, rating: 4.7, reviews: 540, image: 'https://picsum.photos/seed/phone1/500/400', tag: 'NEW', officialDealer: true },
    { id: 4, name: 'AirBook Slim Gen 3', desc: 'Featherlight, 18h Battery, 256GB', price: 899.00, rating: 4.6, reviews: 45, image: 'https://picsum.photos/seed/laptop2/500/400', freeReturns: true },
    { id: 5, name: 'TabElite Creator 11', desc: 'Liquid Retina Display, Pencil Support', price: 749.00, rating: 4.5, reviews: 312, image: 'https://picsum.photos/seed/tablet1/500/400', penIncluded: true },
    { id: 6, name: 'Lumix Z-Series Alpha', desc: '4K Video, 24.2MP Mirrorless', price: 1899.00, rating: 4.9, reviews: 156, image: 'https://picsum.photos/seed/cam2/500/400', warrantyIncluded: true },
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
                placeholder="Search for products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-50 rounded-full relative">
              <ShoppingCart className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full">
              <User className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/listing" className="hover:text-blue-600">Categories</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-medium">Electronics</span>
        </nav>

        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Electronics</h1>
            <p className="text-slate-500 leading-relaxed">
              Upgrade your lifestyle with our premium selection of tech essentials. From high-performance laptops to immersive audio, find everything you need to stay connected and entertained.
            </p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            View All Deals
          </button>
        </div>

        {/* Sub-category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {subCategories.map((sub) => (
            <button 
              key={sub.name}
              onClick={() => setActiveTab(sub.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === sub.name 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <sub.icon className="w-4 h-4" />
              {sub.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-60 flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Filters</h3>
              <button className="text-xs text-blue-600 font-medium">CLEAR ALL</button>
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
                    <span className="text-slate-400">$</span> 5,000+
                  </div>
                </div>
                <input type="range" className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div>
                <h4 className="text-sm font-bold mb-4">Brand</h4>
                <div className="space-y-2">
                  {['Apple', 'Samsung', 'Sony', 'Dell'].map(brand => (
                    <label key={brand} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600" defaultChecked={brand === 'Apple' || brand === 'Sony'} />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold mb-4">Customer Rating</h4>
                <div className="space-y-2">
                  {[4].map(rating => (
                    <label key={rating} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600" defaultChecked />
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

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-medium text-slate-500"><span className="text-slate-900 font-bold">48</span> products found</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Sort by:</span>
                <button className="font-bold flex items-center gap-1">Newest Arrivals <ChevronDown className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate('/product')}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4">
                    {product.tag && (
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded ${product.tag === 'SALE' ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'}`}>
                        {product.tag}
                      </span>
                    )}
                    <button className="absolute bottom-3 right-3 p-2.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <ShoppingCart className="w-4 h-4 text-slate-900" />
                    </button>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                    ))}
                    <span className="text-[10px] text-slate-400 ml-1">({product.reviews})</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{product.desc}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black">${product.price.toFixed(2)}</span>
                    {product.oldPrice && <span className="text-sm text-slate-400 line-through">${product.oldPrice.toFixed(2)}</span>}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 py-8 border-t border-slate-100">
              <button className="p-2 text-slate-400 hover:text-blue-600"><ChevronDown className="w-5 h-5 rotate-90" /></button>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold">1</button>
                <button className="w-8 h-8 rounded-full hover:bg-slate-100 text-sm font-bold">2</button>
                <button className="w-8 h-8 rounded-full hover:bg-slate-100 text-sm font-bold">3</button>
                <span className="text-slate-400">...</span>
                <button className="w-8 h-8 rounded-full hover:bg-slate-100 text-sm font-bold">12</button>
              </div>
              <button className="p-2 text-slate-400 hover:text-blue-600"><ChevronDown className="w-5 h-5 -rotate-90" /></button>
            </div>
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} />
    </div>
  );
};

export default CategoryPage;
