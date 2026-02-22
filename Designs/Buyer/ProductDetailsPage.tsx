import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Share2, Star, ShieldCheck, Truck, RotateCcw, ChevronRight, Minus, Plus, MessageSquare, Info, ListChecks } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Midnight Black');
  const [activeTab, setActiveTab] = useState('description');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const product = {
    name: 'AudioPure H1 Wireless Noise Cancelling Headphones',
    brand: 'AudioPure',
    price: 299.00,
    oldPrice: 349.00,
    rating: 4.9,
    reviews: 1240,
    description: 'Experience pure sound without the noise. The AudioPure H1 features industry-leading noise cancellation, exceptional sound quality, and a comfortable design for all-day listening.',
    colors: ['Midnight Black', 'Arctic White', 'Navy Blue'],
    images: [
      'https://picsum.photos/seed/hp1/800/800',
      'https://picsum.photos/seed/hp2/800/800',
      'https://picsum.photos/seed/hp3/800/800',
      'https://picsum.photos/seed/hp4/800/800',
    ],
    specs: [
      { label: 'Battery Life', value: 'Up to 40 hours' },
      { label: 'Charging', value: 'USB-C Fast Charging' },
      { label: 'Connectivity', value: 'Bluetooth 5.2' },
      { label: 'Weight', value: '250g' },
    ],
    seller: {
      name: 'AudioPure Official Store',
      rating: 4.8,
      followers: '12.5k',
      joined: '2 years ago'
    }
  };

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
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full">2</span>
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full">
              <User className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/listing" className="hover:text-blue-600">Electronics</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/category" className="hover:text-blue-600">Audio</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-medium">Headphones</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100"
            >
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className={`aspect-square rounded-xl overflow-hidden bg-slate-50 border-2 cursor-pointer transition-all ${i === 0 ? 'border-blue-600' : 'border-transparent hover:border-slate-200'}`}>
                  <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">Official Store</span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-50 rounded-full border border-slate-100"><Heart className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-slate-50 rounded-full border border-slate-100"><Share2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                  ))}
                  <span className="text-sm font-bold ml-1">{product.rating}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-sm text-slate-500 font-medium underline cursor-pointer">{product.reviews} reviews</span>
                <span className="text-slate-300">|</span>
                <span className="text-sm text-emerald-600 font-bold">In Stock</span>
              </div>
            </div>

            <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-black text-slate-900">${product.price.toFixed(2)}</span>
                <span className="text-lg text-slate-400 line-through">${product.oldPrice.toFixed(2)}</span>
                <span className="text-sm font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">SAVE 15%</span>
              </div>
              <p className="text-xs text-slate-500">Free shipping on orders over $500</p>
            </div>

            <div className="space-y-8 mb-10">
              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-bold mb-4">Color: <span className="text-slate-500 font-medium">{selectedColor}</span></h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${selectedColor === color ? 'border-blue-600' : 'border-transparent'}`}
                    >
                      <div className={`w-full h-full rounded-full ${color === 'Midnight Black' ? 'bg-slate-900' : color === 'Arctic White' ? 'bg-slate-100 border border-slate-200' : 'bg-blue-900'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-bold mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-slate-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-slate-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">Only 12 items left!</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all">
                Buy Now
              </button>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-slate-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">2yr Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">30 Day Return</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          <div className="flex border-b border-slate-100 mb-8">
            {['Description', 'Specifications', 'Reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            {activeTab === 'Description' && (
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>{product.description}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>Industry-leading noise cancellation optimized for your environment.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>High-Resolution Audio support for uncompromising sound quality.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>Speak-to-chat technology automatically pauses music when you start a conversation.</span>
                  </li>
                </ul>
              </div>
            )}
            {activeTab === 'Specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-slate-50">
                    <span className="text-sm text-slate-500">{spec.label}</span>
                    <span className="text-sm font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'Reviews' && (
              <div className="space-y-8">
                <div className="flex items-center gap-8 p-8 bg-slate-50 rounded-3xl">
                  <div className="text-center">
                    <div className="text-5xl font-black mb-2">4.9</div>
                    <div className="flex items-center gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">1,240 Reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map(star => (
                      <div key={star} className="flex items-center gap-4">
                        <span className="text-xs font-bold w-4">{star}</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400" style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '2%' }} />
                        </div>
                        <span className="text-xs text-slate-400 w-8">{star === 5 ? '85%' : star === 4 ? '10%' : '2%'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold mb-8">People Also Viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm group"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-4">
                  <img src={`https://picsum.photos/seed/rel${i}/400/400`} alt="Related" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors">Premium Wireless Earbuds Gen 2</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-black text-lg">$199.00</span>
                  <button className="p-2 bg-slate-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer showNewsletter={false} />
    </div>
  );
};

export default ProductDetailsPage;
