import React, { useState, useEffect } from 'react';
import { 
  ChevronRight,
  ArrowLeft,
  Upload,
  Info,
  Image as ImageIcon,
  Trash2,
  Bell,
  Plus,
  Eye,
  Package,
  ShoppingCart,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SellerSidebar from '../../../components/layout/SellerSidebar';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import { useAuthStore } from '../../../state/useAuthStore';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { user } = useAuthStore();
  
  const { useGetProduct, createProduct, updateProduct } = useProducts();
  const { data: categories } = useCategories();
  const { data: productData, isLoading: isProductLoading } = useGetProduct(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    price: '',
    salePrice: '',
    stock: '',
    sku: '',
    isActive: true
  });
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (isEdit && productData) {
      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        categoryId: productData.categoryId || '',
        price: productData.price || '',
        salePrice: productData.salePrice || '',
        stock: productData.stock || '',
        sku: productData.sku || '',
        isActive: productData.stock > 0
      });
      if (productData.images) {
        setPreviewImages(productData.images.map(img => ({ url: img.url, id: img.id })));
      }
    }
  }, [isEdit, productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + previewImages.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    
    setSelectedImages(prev => [...prev, ...files]);
    
    const newPreviews = files.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    // If it was a newly selected image (has 'file' property)
    if (previewImages[index].file) {
      setSelectedImages(prev => prev.filter(f => f !== previewImages[index].file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });
    
    selectedImages.forEach(file => {
      submissionData.append('images', file);
    });

    try {
      if (isEdit) {
        await updateProduct.mutateAsync({ id, formData: submissionData });
      } else {
        await createProduct.mutateAsync(submissionData);
      }
      navigate('/seller/products');
    } catch (err) {
      // Error handled by mutation
    }
  };

  if (isEdit && isProductLoading) return (
    <div className="flex-1 flex items-center justify-center p-20">
      <div className="animate-pulse text-blue-600 font-bold">Loading product details...</div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="fixed top-0 left-0 lg:left-64 right-0 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-10 transition-all">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link to="/seller" className="hover:text-slate-600">Dashboard</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/seller/products" className="hover:text-slate-600">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900">{isEdit ? 'Edit Product' : 'Add New'}</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 ml-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{user?.fullName || 'User'}</p>
                <p className="text-[10px] text-slate-500 font-medium">Store Owner</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 border border-slate-200 overflow-hidden flex items-center justify-center text-white font-bold text-[10px]">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'S'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="pt-20 max-w-5xl mx-auto space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
            <p className="text-slate-500 text-sm mt-1">
              {isEdit ? 'Update your product details and inventory.' : 'Ready to expand your catalog? Fill in the details below.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isEdit && (
              <button type="button" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                <Eye className="w-4 h-4" />
                <span>View on Store</span>
              </button>
            )}
            <button 
              type="button"
              onClick={() => navigate('/seller/products')}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
          </div>
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Minimalist Ceramic Vase" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the product features, materials, and unique selling points..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-medium"
                    required
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                    <select 
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories?.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Internal Notes (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Add any internal reference notes..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
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
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00" 
                        step="0.01"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Sale Price (Optional)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                      <input 
                        type="number" 
                        name="salePrice"
                        value={formData.salePrice}
                        onChange={handleChange}
                        placeholder="0.00" 
                        step="0.01"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-blue-600"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Stock Quantity</label>
                    <input 
                      type="number" 
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="0" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">SKU (Stock Keeping Unit)</label>
                    <input 
                      type="text" 
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="MSV-2024-001" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
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
                <div 
                  onClick={() => document.getElementById('imageInput').click()}
                  className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 transition-all cursor-pointer group"
                >
                  <input 
                    type="file" 
                    id="imageInput" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="hidden" 
                  />
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG or WebP (max. 10MB)</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {previewImages.map((img, i) => (
                    <div key={i} className="relative group w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          type="button"
                          onClick={() => removeImage(i)}
                          className="p-1.5 bg-white rounded-lg text-red-600 shadow-lg hover:scale-110 transition-transform"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {i === 0 && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-600 text-white text-[8px] font-bold uppercase tracking-wider rounded">Primary</span>
                      )}
                    </div>
                  ))}
                  {[...Array(Math.max(0, 5 - previewImages.length))].map((_, i) => (
                    <div key={i} className="w-24 h-24 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-200 border-dashed">
                      <ImageIcon className="w-8 h-8 opacity-50" />
                    </div>
                  ))}
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
                  name="isActive"
                  className="sr-only" 
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
              <span className="text-sm font-bold text-slate-700">Set product as active immediately</span>
            </label>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button 
                type="button"
                onClick={() => navigate('/seller/products')}
                className="flex-1 sm:flex-none px-8 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={createProduct.isLoading || updateProduct.isLoading}
                className="flex-1 sm:flex-none px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-sm shadow-blue-200 disabled:opacity-50"
              >
                {isEdit ? 'Update Product' : 'Save Product'}
              </button>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
            <div className="w-10 h-10 flex-shrink-0 bg-white rounded-xl text-blue-600 shadow-sm flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-blue-800 leading-relaxed font-medium">
                <span className="font-bold">Pro Tip:</span> Using high-quality lifestyle images of your product can increase conversion rates by up to 40%. Don't forget to write a descriptive SKU for better inventory tracking!
              </p>
            </div>
          </div>
        </div>
        
        <footer className="pt-8 pb-4 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <span>© 2024 Shemsu Seller Dashboard</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
            <span>All rights reserved</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
            <span>Built with precision for modern commerce</span>
          </p>
        </footer>
      </form>
    </div>
  );
};

export default AddEditProduct;
