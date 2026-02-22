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
  ExternalLink,
  Plus,
  Trash2,
  Info,
  Eye
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const SellerEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Published');

  // Mock product data
  const product = {
    name: 'Aura-Tune Pro Headphones',
    category: 'Audio & Headphones',
    brand: 'Aura-Tune',
    description: 'Experience premium sound with the Aura-Tune Pro Headphones. Featuring industry-leading active noise cancellation, 40-hour battery life, and high-fidelity audio drivers. Designed for all-day comfort with memory foam ear cushions and a lightweight frame.',
    basePrice: 249.00,
    salePrice: 199.00,
    sku: 'AT-PRO-BLK-001',
    stock: 142,
    images: [
      'https://picsum.photos/seed/h1/200/200',
      'https://picsum.photos/seed/h2/200/200',
      'https://picsum.photos/seed/h3/200/200',
    ]
  };

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
            <span className="text-slate-900">Edit Product</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/seller/products')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-emerald-100">Active</span>
                </div>
                <p className="text-slate-500 text-sm mt-1">{product.name}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Eye className="w-4 h-4" />
              <span>View on Store</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Information */}
              <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                    <input 
                      type="text" 
                      defaultValue={product.name}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                        <option>{product.category}</option>
                        <option>Electronics</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Brand</label>
                      <input 
                        type="text" 
                        defaultValue={product.brand}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea 
                      rows={6}
                      defaultValue={product.description}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
              </section>

              {/* Product Media */}
              <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-900">Product Media</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.images.map((img, i) => (
                    <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200">
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="p-2 bg-white rounded-lg text-red-600 shadow-lg hover:scale-110 transition-transform">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {i === 0 && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-blue-600 text-white text-[8px] font-bold uppercase tracking-wider rounded">Primary</span>
                      )}
                    </div>
                  ))}
                  <button className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all group">
                    <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Add Image</span>
                  </button>
                </div>
              </section>
            </div>

            {/* Right Column: Sidebar Info */}
            <div className="space-y-8">
              {/* Pricing */}
              <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Pricing</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Base Price</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                      <input 
                        type="number" 
                        defaultValue={product.basePrice}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sale Price (Optional)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                      <input 
                        type="number" 
                        defaultValue={product.salePrice}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-blue-600"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer pt-2">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-xs font-medium text-slate-600">Apply tax to this product</span>
                  </label>
                </div>
              </section>

              {/* Inventory */}
              <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Inventory</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SKU</label>
                    <input 
                      type="text" 
                      defaultValue={product.sku}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Stock Quantity</label>
                    <input 
                      type="number" 
                      defaultValue={product.stock}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-medium text-slate-600">Track Stock</span>
                    <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                      <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer right-0 border-blue-600"/>
                      <label className="toggle-label block overflow-hidden h-4 rounded-full bg-blue-600 cursor-pointer"></label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Product Status */}
              <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Product Status</h3>
                </div>
                <div className="space-y-3">
                  <button 
                    onClick={() => setStatus('Published')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${status === 'Published' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">Published</p>
                      <p className="text-[10px] text-slate-500">Visible to all customers</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${status === 'Published' ? 'border-blue-600' : 'border-slate-300'}`}>
                      {status === 'Published' && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                    </div>
                  </button>
                  <button 
                    onClick={() => setStatus('Draft')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${status === 'Draft' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">Draft</p>
                      <p className="text-[10px] text-slate-500">Not visible on store</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${status === 'Draft' ? 'border-blue-600' : 'border-slate-300'}`}>
                      {status === 'Draft' && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                    </div>
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-200">
            <button className="flex items-center gap-2 text-red-600 text-sm font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
              <span>DELETE PRODUCT</span>
            </button>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/seller/products')}
                className="px-8 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                CANCEL
              </button>
              <button className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-sm shadow-blue-200">
                UPDATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerEditProduct;
