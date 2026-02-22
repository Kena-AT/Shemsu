import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useOrder } from '../../hooks/useOrder';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { MapPin, Phone, User, ShoppingBag, CreditCard, ChevronLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { useGetCart } = useCart();
  const { useCheckout } = useOrder();
  
  const { data: cart, isLoading: cartLoading } = useGetCart();
  const checkoutMutation = useCheckout();

  const [formData, setFormData] = useState({
    city: 'Addis Ababa',
    subcity: '',
    woreda: '',
    houseNo: '',
    phone: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subcity) newErrors.subcity = 'Subcity is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.phone.match(/^(\+251|0)9[0-9]{8}$/)) newErrors.phone = 'Invalid Ethiopian phone number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const orderData = {
        shippingAddress: formData,
        cartId: cart.id
      };

      const result = await checkoutMutation.mutateAsync(orderData);
      
      if (result.checkoutUrl) {
        toast.success('Redirecting to payment...');
        window.location.href = result.checkoutUrl;
      }
    } catch (err) {
      // Error handled by mutation toast
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products before checking out.</p>
        <Button onClick={() => navigate('/products')}>Browse Products</Button>
      </div>
    );
  }

  const subtotal = cart.items.reduce((sum, item) => sum + (parseFloat(item.priceSnapshot) * item.quantity), 0);
  const shipping = 100; // Flat rate for now
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/cart')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Cart
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Forms */}
          <div className="lg:col-span-7 space-y-6">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mr-4">
                  <MapPin size={24} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="City" 
                    name="city" 
                    value={formData.city} 
                    disabled 
                    icon={MapPin}
                  />
                  <Input 
                    label="Subcity" 
                    name="subcity" 
                    placeholder="e.g. Bole"
                    value={formData.subcity} 
                    onChange={handleInputChange}
                    error={errors.subcity}
                    icon={MapPin}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Woreda (Optional)" 
                    name="woreda" 
                    placeholder="e.g. 03"
                    value={formData.woreda} 
                    onChange={handleInputChange}
                  />
                  <Input 
                    label="House No. (Optional)" 
                    name="houseNo" 
                    placeholder="e.g. 1234"
                    value={formData.houseNo} 
                    onChange={handleInputChange}
                  />
                </div>

                <Input 
                  label="Phone Number" 
                  name="phone" 
                  placeholder="0911..."
                  value={formData.phone} 
                  onChange={handleInputChange}
                  error={errors.phone}
                  icon={Phone}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Additional Instructions (Optional)</label>
                  <textarea 
                    name="additionalInfo"
                    rows="3"
                    className="w-full rounded-lg border border-gray-200 p-4 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none placeholder:text-gray-400"
                    placeholder="Directions, preferred delivery time, etc."
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-green-50 p-2 rounded-lg text-green-600 mr-4">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
              </div>
              
              <div className="flex items-center justify-between p-4 border-2 border-blue-600 rounded-xl bg-blue-50/50">
                <div className="flex items-center">
                  <img 
                    src="https://chapa.co/favicon.png" 
                    alt="Chapa" 
                    className="h-8 w-8 object-contain mr-3" 
                  />
                  <div>
                    <span className="font-bold text-gray-900">Chapa</span>
                    <p className="text-xs text-gray-500">Pay securely with local cards/apps</p>
                  </div>
                </div>
                <div className="h-5 w-5 rounded-full border-4 border-blue-600 bg-white shadow-inner"></div>
              </div>
            </section>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                      {item.product?.images?.[0]?.url ? (
                        <img 
                          src={item.product.images[0].url} 
                          alt={item.product.name} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                          <ShoppingBag size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 font-medium truncate">{item.product?.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-blue-600 font-semibold mt-1">
                        ETB {parseFloat(item.priceSnapshot).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>ETB {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>ETB {shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-blue-600">ETB {total.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                className="w-full mt-8 h-14 text-lg"
                onClick={handleCheckout}
                isLoading={checkoutMutation.isPending}
              >
                Place Order & Pay
              </Button>
              
              <p className="text-center text-xs text-gray-500 mt-4 px-4">
                By placing your order, you agree to Shemsu's Terms of Use and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
