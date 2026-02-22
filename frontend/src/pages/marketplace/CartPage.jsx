import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Heart,
  ShoppingCart,
  Store,
  CheckCircle2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../state/useCartStore';
import Footer from '../../components/layout/Footer';

const CartPage = () => {
  const navigate = useNavigate();
  const { useGetCart, useUpdateItem, useRemoveItem, useClearCart } = useCart();
  const { data: cart, isLoading } = useGetCart();
  const updateItem = useUpdateItem();
  const removeItem = useRemoveItem();
  const clearCart = useClearCart();
  const { setItems } = useCartStore();

  useEffect(() => {
    if (cart?.items) {
      setItems(cart.items);
    }
  }, [cart, setItems]);

  const subtotal = useMemo(() => {
    return cart?.items?.reduce((sum, item) => sum + (item.priceSnapshot * item.quantity), 0) || 0;
  }, [cart]);

  const shipping = subtotal > 0 ? 12.50 : 0;
  const tax = subtotal * 0.07; // 7% tax for example
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading your shopping cart...</p>
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
          <ShoppingCart className="text-slate-200" size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Discover amazing products on our marketplace.</p>
        <Link to="/app/marketplace" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 pb-20">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 text-left">
          <Link to="/app" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-medium">Shopping Cart</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div className="text-left">
            <h1 className="text-3xl font-black text-slate-900 mb-1">Shopping Cart</h1>
            <p className="text-sm text-slate-500 font-medium">{cart.items.length} Items</p>
          </div>
          <button 
            onClick={() => { if(window.confirm('Clear entire cart?')) clearCart.mutate() }}
            className="text-sm font-medium text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear all items
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Cart Content */}
          <div className="lg:col-span-2 space-y-8">
            {Object.entries(cart.vendorGroups || {}).map(([vendor, items]) => (
              <div key={vendor} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-left">
                <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sold by:</span>
                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{vendor}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Top Rated Vendor</span>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="p-6 flex flex-col sm:flex-row gap-6"
                      >
                        {/* Product Image */}
                        <Link to={`/app/marketplace/product/${item.productId}`} className="w-32 h-32 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 group">
                          <img 
                            src={item.image || 'https://picsum.photos/seed/placeholder/300/300'} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <Link to={`/app/marketplace/product/${item.productId}`} className="font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1">{item.name}</Link>
                            <span className="font-black text-lg">${parseFloat(item.priceSnapshot).toFixed(2)}</span>
                          </div>
                          
                          <div className="text-xs text-slate-400 font-medium space-x-2 mb-4 capitalize">
                            {Object.entries(item.attributes || {}).map(([key, val], idx) => (
                              <span key={key}>
                                {key}: <span className="text-slate-600">{val}</span>
                                {idx < Object.entries(item.attributes).length - 1 && <span className="ml-2">|</span>}
                              </span>
                            ))}
                            {!Object.keys(item.attributes || {}).length && (
                              <span>Standard Edition | Warranty: 1 Year Manufacturer</span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-9">
                              <button 
                                onClick={() => updateItem.mutate({ id: item.id, quantity: Math.max(1, item.quantity - 1) })}
                                className="px-3 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => updateItem.mutate({ id: item.id, quantity: item.quantity + 1 })}
                                className="px-3 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                                <Heart className="w-3.5 h-3.5" /> Save for later
                              </button>
                              <button 
                                onClick={() => removeItem.mutate(item.id)}
                                className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Remove
                              </button>
                            </div>
                          </div>

                          {/* Alerts */}
                          {(item.isPriceStale || item.isInvalid) && (
                            <div className={`mt-4 p-2.5 rounded-lg flex items-center gap-2 border ${item.isInvalid ? 'bg-red-50 border-red-100 text-red-600' : 'bg-orange-50 border-orange-100 text-orange-600'}`}>
                              <Info className="w-4 h-4 flex-shrink-0" />
                              <span className="text-[10px] font-bold uppercase tracking-wider">{item.statusMessage}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}

            <Link to="/app/marketplace" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all mt-4">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          {/* Checkout/Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-left sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="text-slate-900 font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 font-medium">Shipping</span>
                    <Info className="w-3 h-3 text-slate-300" />
                  </div>
                  <span className="text-slate-900 font-bold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Estimated Tax</span>
                  <span className="text-slate-900 font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-100 my-2" />
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-base font-bold block mb-[-4px]">Total</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-none">VAT Included</span>
                  </div>
                  <span className="text-3xl font-black text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                disabled={cart.items.some(i => i.isInvalid || i.isPriceStale)}
                onClick={() => navigate('/app/checkout')}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ChevronRight className="w-4 h-4" />
              </button>

              <div className="mt-8">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">Apply</button>
                </div>
              </div>
            </div>

            {/* Trust Features */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100/50 p-6 space-y-4 text-left">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">Secure Checkout</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Your information is protected by 256-bit SSL encryption</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">Shemsu Logistics</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Fast and tracked delivery across all vendors</p>
                </div>
              </div>
            </div>

            {/* Payment Icons Placeholder */}
            <div className="flex justify-center gap-4 opacity-30 grayscale">
               <div className="w-8 h-5 bg-slate-400 rounded-sm" />
               <div className="w-8 h-5 bg-blue-400 rounded-sm" />
               <div className="w-8 h-5 bg-orange-400 rounded-sm" />
               <div className="w-8 h-5 bg-emerald-400 rounded-sm" />
            </div>
          </div>
        </div>
      </main>
      <Footer showNewsletter={false} />
    </div>
  );
};

export default CartPage;
