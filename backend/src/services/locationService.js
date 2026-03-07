const axios = require('axios');
const logger = require('../config/logger');

class LocationService {
  constructor() {
    this.apiKey = process.env.OPENROUTE_SERVICE_KEY;
    this.baseUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';
    this.baseShippingFee = 100; // ETB
    this.ratePerKm = parseFloat(process.env.SHIPPING_RATE_PER_KM) || 10; // ETB
  }

  /**
   * Calculate distance between two points using OpenRouteService
   * @param {Object} origin { lat, lng }
   * @param {Object} destination { lat, lng }
   * @returns {Object} { distanceKm, shippingFee, durationMinutes }
   */
  async calculateShipping(origin, destination) {
    if (!origin.lat || !origin.lng || !destination.lat || !destination.lng) {
      logger.warn('Invalid coordinates provided to LocationService', { origin, destination });
      return { distanceKm: 0, shippingFee: this.baseShippingFee, durationMinutes: 0 };
    }

    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          api_key: this.apiKey,
          start: `${origin.lng},${origin.lat}`,
          end: `${destination.lng},${destination.lat}`
        }
      });

      const { summary } = response.data.features[0].properties;
      const distanceKm = summary.distance / 1000; // ORS returns distance in meters
      const durationMinutes = summary.duration / 60; // ORS returns duration in seconds

      const variableFee = distanceKm * this.ratePerKm;
      const shippingFee = Math.ceil(this.baseShippingFee + variableFee);

      logger.info('Shipping calculated successfully', { distanceKm, shippingFee });

      return {
        distanceKm: parseFloat(distanceKm.toFixed(2)),
        shippingFee: parseFloat(shippingFee.toFixed(2)),
        durationMinutes: Math.ceil(durationMinutes)
      };
    } catch (error) {
      logger.error('Error calculating shipping via OpenRouteService', { 
        error: error.response?.data || error.message,
        origin,
        destination
      });
      // Fallback: estimate using Haversine if API fails or just return base fee?
      // For now, let's return base fee or a reasonable default to not block checkout
      return { distanceKm: 0, shippingFee: this.baseShippingFee, durationMinutes: 0, error: true };
    }
  }
}

module.exports = new LocationService();
