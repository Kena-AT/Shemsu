const { db } = require('../config/db');
const { reviews, products, orderItems, orders } = require('../models/schema');
const { eq, and, sql, avg, count } = require('drizzle-orm');
const logger = require('../config/logger');

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id: productId } = req.params;
    const userId = req.user.id;

    // 1. Verify user actually bought the product and it was delivered
    const [purchase] = await db.select()
      .from(orderItems)
      .innerJoin(orders, eq(orderItems.orderId, orders.id))
      .where(and(
        eq(orders.buyerId, userId),
        eq(orderItems.productId, productId),
        eq(orderItems.status, 'delivered')
      ))
      .limit(1);

    if (!purchase) {
      return res.status(403).json({ 
        message: 'You can only review products you have purchased and received.' 
      });
    }

    // 2. Check if user already reviewed this product
    const [existing] = await db.select()
      .from(reviews)
      .where(and(
        eq(reviews.userId, userId),
        eq(reviews.productId, productId)
      ))
      .limit(1);

    if (existing) {
      return res.status(400).json({ message: 'You have already reviewed this product.' });
    }

    // 3. Insert review
    const [newReview] = await db.insert(reviews).values({
      productId,
      userId,
      rating,
      comment,
    }).returning();

    res.status(201).json(newReview);
  } catch (err) {
    logger.error('Error adding review', err);
    res.status(500).json({ message: 'Error adding review' });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    const items = await db.query.reviews.findMany({
      where: eq(reviews.productId, productId),
      with: {
        user: {
          columns: {
            fullName: true,
          }
        }
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      orderBy: (reviews, { desc }) => [desc(reviews.createdAt)]
    });

    res.json(items);
  } catch (err) {
    logger.error('Error fetching reviews', err);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};
