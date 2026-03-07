import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Share2, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronRight, 
  Minus, 
  Plus, 
  Package,
  Info,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import { formatPrice, formatNumber } from '../../lib/utils';
import Footer from '../../components/layout/Footer';
import ReviewSection from '../../components/marketplace/ReviewSection';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { useGetProduct, useGetProducts } = useProducts();
  const { useAddToCart } = useCart();
  const { data: product, isLoading } = useGetProduct(id);
  const { data: relatedProducts } = useGetProducts({ limit: 4 });
  
  const addMutation = useAddToCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedColor, setSelectedColor] = useState('Default');

  React.useEffect(() => {
    if (product) {
      // trackPageView/trackEvent removed
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      // trackEvent removed
    }
    addMutation.mutate({
      productId: product.id,
      quantity,
      attributes: { Color: selectedColor }
    });
  };

  const handleBuyNow = async () => {
    if (product) {
      // trackEvent removed
    }
    try {
      await addMutation.mutateAsync({
        productId: product.id,
        quantity,
        attributes: { Color: selectedColor }
      });
      navigate('/app/checkout');
    } catch (err) {
      // Toast error handled by mutation
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Product Details...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  const images = product.images?.length > 0 ? product.images.map(img => img.url) : ['https://picsum.photos/seed/default/800/800'];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 text-left">
          <Link to="/app" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/app/marketplace" className="hover:text-blue-600">Marketplace</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/app/marketplace?categoryId=${product.categoryId}`} className="hover:text-blue-600">{product.category?.name || 'Category'}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 text-left">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              key={images[selectedImage]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100"
            >
              <img 
                src={images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-xl overflow-hidden bg-slate-50 border-2 cursor-pointer transition-all ${selectedImage === i ? 'border-blue-600' : 'border-transparent hover:border-slate-200'}`}
                >
                  <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category?.name || 'Featured'}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-50 rounded-full border border-slate-100"><Heart className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-slate-50 rounded-full border border-slate-100"><Share2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                  ))}
                  <span className="text-sm font-bold ml-1">{product.rating || '0.0'}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span 
                  className="text-sm text-slate-500 font-medium underline cursor-pointer"
                  onClick={() => setActiveTab('Reviews')}
                >
                  {formatNumber(product.reviewCount || 0)} reviews
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-sm text-emerald-600 font-bold">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>

            <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-black text-slate-900">{formatPrice(parseFloat(product.price))}</span>
                <span className="text-lg text-slate-400 line-through">{formatPrice(parseFloat(product.price) * 1.2)}</span>
                <span className="text-sm font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">SAVE 20%</span>
              </div>
              <p className="text-xs text-slate-500">Free shipping on orders over {formatPrice(500)}</p>
            </div>

            <div className="space-y-8 mb-10">
              {/* Color Selection Placeholder */}
              <div>
                <h3 className="text-sm font-bold mb-4">Color: <span className="text-slate-500 font-medium">{selectedColor}</span></h3>
                <div className="flex gap-3">
                  {['Default', 'Phantom', 'Pure'].map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${selectedColor === color ? 'border-blue-600' : 'border-transparent'}`}
                    >
                      <div className={`w-full h-full rounded-full ${color === 'Default' ? 'bg-slate-900' : color === 'Phantom' ? 'bg-slate-700' : 'bg-slate-100 border border-slate-200'}`} />
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
                  <p className="text-xs text-slate-400">Only {product.stock} items left!</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                disabled={addMutation.isPending || product.stock === 0}
                className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:shadow-none"
              >
                <ShoppingCart className="w-5 h-5" /> 
                {addMutation.isPending ? 'Adding...' : 'Add to Cart'}
              </button>
              <button 
                onClick={handleBuyNow}
                disabled={addMutation.isPending || product.stock === 0}
                className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all disabled:bg-slate-200"
              >
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
                <div className="relative">
                  <ShieldCheck className={`w-5 h-5 ${product.seller?.totalItemsSold >= 30 ? 'text-blue-600' : 'text-slate-400'}`} />
                  {product.seller?.totalItemsSold >= 30 && (
                    <Award className="w-3 h-3 text-orange-500 absolute -top-1 -right-1 fill-orange-500" />
                  )}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${product.seller?.totalItemsSold >= 30 ? 'text-blue-600' : 'text-slate-500'}`}>
                  {product.seller?.totalItemsSold >= 30 ? 'Top Rated Vendor' : 'Verified Vendor'}
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">30 Day Return</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20 text-left">
          <div className="flex border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar">
            {['Description', 'Specifications', 'Reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-8 py-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            {activeTab === 'Description' && (
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>{product.description || "No description provided for this product. Premium quality guaranteed."}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>Selected from certified global vendors for maximum reliability.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>Optimized for performance and durability in modern environments.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>Includes standard 1-year coverage from the manufacturer.</span>
                  </li>
                </ul>
              </div>
            )}
            {activeTab === 'Specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {[
                  { label: 'Category', value: product.category?.name || 'Uncategorized' },
                  { label: 'Vendor', value: product.vendorName || 'Global Partner' },
                  { label: 'Stock Status', value: product.stock > 0 ? 'Available' : 'Out of Stock' },
                  { label: 'Ships From', value: 'International Hub' },
                  { label: 'Warranty', value: '1 Year' },
                  { label: 'Material', value: 'Premium Grade' }
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-slate-50">
                    <span className="text-sm text-slate-500">{spec.label}</span>
                    <span className="text-sm font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'Reviews' && (
              <ReviewSection 
                productId={id} 
                averageRating={product.rating} 
                reviewCount={product.reviewCount} 
              />
            )}
          </div>
        </div>

        {/* Related Products */}
        <section className="text-left">
          <h2 className="text-2xl font-bold mb-8">People Also Viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts?.filter(p => p.id !== id).map((p) => (
              <motion.div 
                key={p.id}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/app/marketplace/product/${p.id}`)}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm group cursor-pointer"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-4">
                  {p.images?.[0] ? (
                    <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200"><Package size={48} /></div>
                  )}
                </div>
                <h3 className="font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{p.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-black text-lg">{formatPrice(parseFloat(p.price))}</span>
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

export default ProductDetails;
