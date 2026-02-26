const crypto = require('crypto');

/**
 * Chapa Payment Service
 * Handles interaction with the Chapa API for Ethiopian payments.
 */
class ChapaService {
  constructor() {
    this.secretKey = process.env.CHAPA_SECRET_KEY;
    this.publicKey = process.env.CHAPA_PUBLIC_KEY;
    this.baseUrl = 'https://api.chapa.co/v1';
  }

  /**
   * Initialize a transaction with Chapa
   * @param {Object} data Payment details
   * @returns {Promise<Object>} Chapa response data including checkout_url
   */
  async initializePayment(data) {
    if (!this.secretKey) throw new Error('CHAPA_SECRET_KEY is not configured');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const response = await fetch(`${this.baseUrl}/transaction/initialize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          amount: data.amount,
          currency: data.currency || 'ETB',
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          tx_ref: data.tx_ref,
          callback_url: data.callback_url,
          return_url: data.return_url,
          customization: {
            title: 'Shemsu Market',
            description: `Payment for Order ${data.tx_ref}`,
            logo: data.logo || '', // Optional
          },
        }),
      });

      clearTimeout(timeoutId);
      const result = await response.json();
      
      if (!response.ok) {
        console.error('Chapa Initialization Error:', result);
        const errorMessage = typeof result.message === 'string' 
          ? result.message 
          : JSON.stringify(result.message);
        throw new Error(errorMessage || 'Failed to initialize Chapa payment');
      }

      return result.data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Chapa API request timed out after 10 seconds. Please try again.');
      }
      throw error;
    }
  }

  /**
   * Verify a transaction status
   * @param {string} txRef transaction reference
   * @returns {Promise<Object>} transaction details
   */
  async verifyPayment(txRef) {
    const response = await fetch(`${this.baseUrl}/transaction/verify/${txRef}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
      },
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to verify payment with Chapa');
    }

    return result.data;
  }

  /**
   * Initiate a refund for a transaction
   * @param {string} txRef Transaction reference to refund
   * @returns {Promise<Object>} refund response
   */
  async refundPayment(txRef) {
    // Note: Chapa Refund API often requires the transaction reference or transaction ID.
    // Based on Chapa documentation, refunds might be handled via a specific endpoint.
    const response = await fetch(`${this.baseUrl}/transaction/refund/${txRef}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Minimal refund body, usually amount is required if partial
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Chapa Refund Error:', result);
      const errorMessage = typeof result.message === 'string'
        ? result.message
        : JSON.stringify(result.message);
      throw new Error(errorMessage || 'Failed to initiate refund on Chapa');
    }

    return result.data;
  }

  /**
   * Verify Chapa Webhook Signature
   * @param {Object} payload The raw body of the webhook request
   * @param {string} signature The signature from x-chapa-signature header
   * @returns {boolean}
   */
  verifyWebhookSignature(payload, signature) {
    if (!signature) return false;
    
    const hash = crypto
      .createHmac('sha256', this.secretKey)
      .update(JSON.stringify(payload))
      .digest('hex');
    
    // Use timingSafeEqual to prevent timing attacks
    const hbuf = Buffer.from(hash);
    const sbuf = Buffer.from(signature);
    
    if (hbuf.length !== sbuf.length) return false;
    return crypto.timingSafeEqual(hbuf, sbuf);
  }
}

module.exports = new ChapaService();
