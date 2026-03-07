const logger = require('../config/logger');

class LocationService {
  constructor() {
    this.baseShippingFee = 50; // ETB minimum
    this.ratePerKm = parseFloat(process.env.SHIPPING_RATE_PER_KM) || 10; // ETB
  }

  calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return 0;
    
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  /**
   * Calculate distance between two points using Haversine formula
   * @param {Object} origin { lat, lng }
   * @param {Object} destination { lat, lng }
   * @returns {Object} { distanceKm, shippingFee, durationMinutes }
   */
  async calculateShipping(origin, destination) {
    if (!origin.lat || !origin.lng || !destination.lat || !destination.lng) {
      logger.warn('Invalid coordinates provided to LocationService', { origin, destination });
      return { distanceKm: 0, shippingFee: 100, durationMinutes: 0 };
    }

    try {
      const distanceKm = this.calculateHaversineDistance(
        parseFloat(origin.lat),
        parseFloat(origin.lng),
        parseFloat(destination.lat),
        parseFloat(destination.lng)
      );

      // Same logic as frontend `calculateOrderSummary`
      // Fee is max of 50 or (distance * 10)
      const shippingFee = Math.max(this.baseShippingFee, Math.round(distanceKm * this.ratePerKm));

      // Rough estimation of duration (assuming 30km/h average in city traffic)
      const durationMinutes = Math.ceil((distanceKm / 30) * 60);

      logger.info('Shipping calculated successfully', { distanceKm, shippingFee });

      return {
        distanceKm: parseFloat(distanceKm.toFixed(2)),
        shippingFee: shippingFee,
        durationMinutes: durationMinutes
      };
    } catch (error) {
      logger.error('Error calculating shipping', { 
        error: error.message,
        origin,
        destination
      });
      return { distanceKm: 0, shippingFee: 100, durationMinutes: 0, error: true };
    }
  }
}

module.exports = new LocationService();
