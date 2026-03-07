export const SHIPPING_BASE_FEE = 100;
export const SHIPPING_RATE_PER_KM = 10;
export const SERVICE_FEE_RATE = 0.02; // 2% Buyer Fee
export const PLATFORM_FEE_RATE = 0.02; // 2% Seller Fee

/**
 * Calculate Haversine distance between two points (crow-flies)
 * This is used for frontend estimation when full routing isn't available or necessary
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return 0;
  
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

/**
 * Calculate order summary breakdown
 * @param {Array} items Cart items
 * @param {Object} buyerLocation { lat, lng }
 */
export const calculateOrderSummary = (items, buyerLocation = null) => {
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.priceSnapshot) * item.quantity), 0);
  
  // Group items by vendor to calculate shipping per vendor
  const vendorGroups = items.reduce((acc, item) => {
    if (!acc[item.vendorId]) {
      acc[item.vendorId] = {
        lat: item.vendorLat ? parseFloat(item.vendorLat) : null,
        lng: item.vendorLng ? parseFloat(item.vendorLng) : null,
      };
    }
    return acc;
  }, {});

  let totalShipping = 0;
  if (buyerLocation && buyerLocation.lat != null && buyerLocation.lng != null) {
    Object.values(vendorGroups).forEach(vendor => {
      if (vendor.lat && vendor.lng) {
        const distance = calculateDistance(vendor.lat, vendor.lng, buyerLocation.lat, buyerLocation.lng);
        // Estimate routing distance as 1.3x straight line distance for better accuracy
        const estimatedRoutingDistance = distance * 1.3;
        totalShipping += SHIPPING_BASE_FEE + (estimatedRoutingDistance * SHIPPING_RATE_PER_KM);
      } else {
        totalShipping += SHIPPING_BASE_FEE;
      }
    });
  } else {
    // Default/Estimated shipping (Base fee per vendor)
    totalShipping = Object.keys(vendorGroups).length * SHIPPING_BASE_FEE;
  }

  const serviceFee = subtotal * SERVICE_FEE_RATE;
  const total = subtotal + totalShipping + serviceFee;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping: parseFloat(totalShipping.toFixed(2)),
    serviceFee: parseFloat(serviceFee.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    isEstimated: !buyerLocation
  };
};
