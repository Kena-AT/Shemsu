import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  Search, 
  Bell, 
  ChevronRight,
  ArrowLeft,
  Upload,
  Info,
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

const SellerAddProduct = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">Shemsu</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Seller Portal</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link to="/seller/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </Link>
          <Link to="/seller/products" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium transition-colors">
            <Package className="w-5 h-5" />
            <span>Products</span>
          </Link>
          <Link to="/seller/orders" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span>Orders</span>
          </Link>
          <Link to="/seller/analytics" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link to="/seller/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <Link to="/seller/support" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
          </Link>
          
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 px-2">
            <img 
              src="https://picsum.photos/seed/seller/40/40" 
              alt="Alex Rivera" 
              className="w-10 h-10 rounded-full border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-slate-900 truncate">Alex Rivera</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Store Owner</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Link to="/seller/dashboard" className="hover:text-slate-600">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/seller/products" className="hover:text-slate-600">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900">Add New</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center gap-3 ml-2">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900">Alex Rivera</p>
                  <p className="text-[10px] text-slate-500 font-medium">Store Owner</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                  <img src="https://picsum.photos/seed/seller/32/32" alt="Profile" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
              <p className="text-slate-500 text-sm mt-1">Ready to expand your catalog? Fill in the details below.</p>
            </div>
            <button 
              onClick={() => navigate('/seller/products')}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Product Information */}
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Product Information</h3>
                  <p className="text-slate-500 text-sm mt-1">This information will be displayed publicly in your store front.</p>
                </div>
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Minimalist Ceramic Vase" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea 
                      rows={4}
                      placeholder="Describe the product features, materials, and unique selling points..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                        <option>Select Category</option>
                        <option>Electronics</option>
                        <option>Accessories</option>
                        <option>Home & Decor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Collection</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Summer 2024" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Inventory & Pricing */}
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Inventory & Pricing</h3>
                  <p className="text-slate-500 text-sm mt-1">Manage your stock levels and set competitive pricing.</p>
                </div>
                <div className="md:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Base Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                        <input 
                          type="number" 
                          placeholder="0.00" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Compare at Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                        <input 
                          type="number" 
                          placeholder="0.00" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Stock Quantity</label>
                      <input 
                        type="number" 
                        placeholder="0" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">SKU (Stock Keeping Unit)</label>
                      <input 
                        type="text" 
                        placeholder="MSV-2024-001" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Product Images */}
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Product Images</h3>
                  <p className="text-slate-500 text-sm mt-1">Add up to 5 high-quality images. Recommended size: 1200x1200px.</p>
                </div>
                <div className="md:col-span-2 space-y-6">
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-bold text-slate-900">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG or WebP (max. 10MB)</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-300">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                  />
                  <div className={`w-10 h-6 rounded-full transition-colors ${isActive ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <span className="text-sm font-bold text-slate-700">Set product as active immediately</span>
              </label>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => navigate('/seller/products')}
                  className="flex-1 sm:flex-none px-8 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 sm:flex-none px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-sm shadow-blue-200">
                  Save Product
                </button>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
              <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm h-fit">
                <Info className="w-4 h-4" />
              </div>
              <p className="text-xs text-blue-800 leading-relaxed">
                <span className="font-bold">Pro Tip:</span> Using high-quality lifestyle images of your product can increase conversion rates by up to 40%. Don't forget to write a descriptive SKU for better inventory tracking!
              </p>
            </div>
          </div>
          
          <footer className="pt-8 pb-4 text-center">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
              © 2024 Shemsu Seller Dashboard. All rights reserved. Built with precision for modern commerce.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default SellerAddProduct;
