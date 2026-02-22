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
  Plus,
  Filter,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const SellerProductListing = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const products = [
    { id: '1', name: 'Aura Chronograph Watch', sku: 'AUR-001-BLK', category: 'Accessories', price: '$189.00', stock: 42, status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', image: 'https://picsum.photos/seed/watch/40/40' },
    { id: '2', name: 'Sonic Pro Headphones', sku: 'SON-HDP-02', category: 'Electronics', price: '$299.00', stock: 8, status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', image: 'https://picsum.photos/seed/headphones/40/40' },
    { id: '3', name: 'Swift Runner Shoes', sku: 'SWF-RUN-RED', category: 'Footwear', price: '$125.00', stock: 114, status: 'Draft', statusColor: 'bg-slate-100 text-slate-500', image: 'https://picsum.photos/seed/shoes/40/40' },
    { id: '4', name: 'Insta-Capture Camera', sku: 'CAM-INS-04', category: 'Electronics', price: '$89.00', stock: 0, status: 'Out of Stock', statusColor: 'bg-red-50 text-red-600', image: 'https://picsum.photos/seed/camera/40/40' },
  ];

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pId => pId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
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
            <span className="text-slate-900">Products</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <img src="https://picsum.photos/seed/seller/32/32" alt="Profile" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Products</h1>
              <p className="text-slate-500 text-sm mt-1">Manage your inventory, pricing, and product status.</p>
            </div>
            <Link 
              to="/seller/products/add" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm shadow-blue-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search products by name or SKU..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>All Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                <span>Status: Active</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                <span>Price Range</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 w-12">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedProducts.length === products.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleSelect(product.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 leading-tight">{product.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">SKU: {product.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{product.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold ${product.stock < 10 ? 'text-amber-600' : 'text-slate-900'}`}>{product.stock}</span>
                          {product.stock < 10 && product.stock > 0 && (
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Low</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.statusColor}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/seller/products/edit/${product.id}`} className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
                            <Settings className="w-4 h-4" />
                          </Link>
                          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <p className="text-xs text-slate-500 font-medium">Showing 1 to 4 of 24 results</p>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold">1</button>
                <button className="w-8 h-8 rounded-lg text-slate-600 text-xs font-bold hover:bg-slate-200">2</button>
                <button className="w-8 h-8 rounded-lg text-slate-600 text-xs font-bold hover:bg-slate-200">3</button>
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Active Products</p>
                <h3 className="text-3xl font-bold text-slate-900">18</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Drafts</p>
                <h3 className="text-3xl font-bold text-slate-900">6</h3>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Low Stock</p>
                <h3 className="text-3xl font-bold text-slate-900">3</h3>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerProductListing;
