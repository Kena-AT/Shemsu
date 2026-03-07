import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useOrder } from '../../hooks/useOrder';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { MapPin, Phone, User, ShoppingBag, CreditCard, ChevronLeft, Loader2, Map as MapIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { checkoutSchema, validateWithZod } from '../../lib/validationSchemas';
import { formatPrice } from '../../lib/utils';
import { calculateOrderSummary } from '../../lib/pricing';
import LocationPicker from '../../components/common/LocationPicker';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { useGetCart } = useCart();
  const { useCheckout } = useOrder();
  
  const { data: cart, isLoading: cartLoading } = useGetCart();
  const checkoutMutation = useCheckout();

  React.useEffect(() => {
    // trackPageView removed
  }, []);

  const [formData, setFormData] = useState({
    city: 'Addis Ababa',
    subcity: '',
    woreda: '',
    houseNo: '',
    phone: '',
    additionalInfo: '',
    lat: 9.03,
    lng: 38.74
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear only this specific field's error when the user starts typing
    if (errors && errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const { success, errors: validationErrors } = validateWithZod(checkoutSchema, formData);
    console.log('Validation results:', { success, validationErrors });
    setErrors(validationErrors);
    if (!success) {
      toast.error('Please check your shipping details');
    }
    return success;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    console.log('Attempting checkout with data:', formData);
    
    if (!validate()) {
      console.warn('Checkout aborted: Validation failed');
      return;
    }

    // trackEvent removed

    try {
      const orderData = {
        shippingAddress: formData,
        cartId: cart.id
      };

      console.log('Sending order data to API:', orderData);
      const result = await checkoutMutation.mutateAsync(orderData);
      console.log('Order result:', result);
      
      if (result.checkoutUrl) {
        toast.success('Redirecting to payment...');
        window.location.href = result.checkoutUrl;
      } else {
        console.error('No checkout URL returned from server');
        toast.error('Unexpected response from server. No payment link found.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error(err.response?.data?.message || 'Checkout failed. Please try again.');
    }
  };

  const summary = useMemo(() => {
    return calculateOrderSummary(cart?.items || [], { lat: formData.lat, lng: formData.lng });
  }, [cart, formData.lat, formData.lng]);

  const { subtotal, shipping, serviceFee, total } = summary;

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

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/app/cart')}
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
                    error={errors?.subcity}
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

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin size={16} className="text-blue-600" /> Exact Delivery Location
                  </label>
                  <LocationPicker 
                    initialPosition={{ lat: formData.lat, lng: formData.lng }}
                    onLocationSelect={(pos) => setFormData(prev => ({ ...prev, lat: pos.lat, lng: pos.lng }))}
                  />
                  <p className="text-[10px] text-gray-400">Shipping cost is calculated based on the distance between you and the seller.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Additional Instructions (Optional)</label>
                  <textarea 
                    name="additionalInfo"
                    rows="2"
                    className="w-full rounded-lg border border-gray-200 p-4 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none placeholder:text-gray-400 text-sm"
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
                    src="https://chapa.co/favicon.ico" 
                    alt="Chapa" 
                    className="h-8 w-8 object-contain mr-3" 
                    onError={(e) => {
                      e.target.src = 'https://chapa.co/assets/logos/chapa_logo_only.png'; // Attempt common alternative
                      e.target.onerror = () => {
                        e.target.style.display = 'none'; // Hide if both fail
                      };
                    }}
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
                        {formatPrice(parseFloat(item.priceSnapshot))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Cost</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee (2%)</span>
                  <span>{formatPrice(serviceFee)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-blue-600">{formatPrice(total)}</span>
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
