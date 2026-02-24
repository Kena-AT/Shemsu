import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Bell, 
  Plus,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Settings,
  Pencil,
  Trash2,
  Package,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SellerSidebar from '../../../components/layout/SellerSidebar';
import { useProducts } from '../../../hooks/useProducts';
import { exportToCSV } from '../../../lib/exportUtils';
import { toast } from 'react-hot-toast';

const ProductList = () => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { useGetSellerProducts, deleteProduct: deleteMutation } = useProducts();
  const { data: productsData, isLoading } = useGetSellerProducts();
  const products = productsData || [];

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.sku?.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (e) {}
    }
  };

  const handleExport = () => {
    if (!products || !products.length) return toast.error('No inventory data to export');
    exportToCSV(products, `shemsu_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Inventory export initiated');
  };

  const activeCount = products.filter(p => p.stock > 0).length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock < 10).length;
  const draftCount = products.filter(p => p.stock === 0).length;

  if (isLoading) return (
    <div className="flex-1 flex items-center justify-center p-20">
      <div className="animate-pulse text-blue-600 font-bold">Loading products...</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="fixed top-0 left-0 lg:left-64 right-0 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-10 transition-all">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link to="/seller" className="hover:text-slate-600">Dashboard</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900">Products</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>
      </header>

      <div className="pt-20 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Products</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your inventory, pricing, and product status.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export Inventory</span>
            </button>
            <Link 
              to="/seller/products/new" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm shadow-blue-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                      checked={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length}
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
                {filteredProducts.map((product) => {
                  const statusLabel = product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? 'Low Stock' : 'Active';
                  const statusColor = product.stock === 0 
                    ? 'bg-red-50 text-red-600' 
                    : product.stock < 10 
                      ? 'bg-amber-50 text-amber-600' 
                      : 'bg-emerald-50 text-emerald-600';
                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50 transition-colors group"
                    >
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
                          {product.images?.[0] ? (
                            <img 
                              src={product.images[0].url} 
                              alt={product.name} 
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                              <Package className="w-5 h-5 text-slate-300" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 leading-tight">{product.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">SKU: {product.sku || 'N/A'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{product.category?.name || '—'}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">ETB {parseFloat(product.price).toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold ${product.stock < 10 ? 'text-amber-600' : 'text-slate-900'}`}>{product.stock}</span>
                          {product.stock < 10 && product.stock > 0 && (
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Low</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>
                          {statusLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/seller/products/edit/${product.id}`} className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <Package className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No products found.</p>
              <Link to="/seller/products/new" className="text-blue-600 text-sm font-bold mt-2 inline-block">Add your first product →</Link>
            </div>
          )}

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">Showing 1 to {filteredProducts.length} of {products.length} results</p>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold">1</button>
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
              <h3 className="text-3xl font-bold text-slate-900">{activeCount}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Drafts</p>
              <h3 className="text-3xl font-bold text-slate-900">{draftCount}</h3>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Low Stock</p>
              <h3 className="text-3xl font-bold text-slate-900">{lowStockCount}</h3>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
