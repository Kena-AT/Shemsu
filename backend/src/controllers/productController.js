const { db, pool } = require('../config/db');
const { products, categories, users, sellerVerifications, reviews, orderItems } = require('../models/schema');
const { eq, and, ilike, desc, sql } = require('drizzle-orm');
const logger = require('../config/logger');

// Get all products (Public/Buyer search)
// Rules: isDeleted=false AND moderationStatus=approved AND seller is active/not deleted
exports.getProducts = async (req, res) => {
  try {
    const { search, categoryId, limit = 20, offset = 0 } = req.query;

    const filters = [
      eq(products.isDeleted, false),
      eq(products.moderationStatus, 'approved'),
      eq(users.status, 'active'),
      eq(users.isDeleted, false)
    ];

    if (search) filters.push(ilike(products.name, `%${search}%`));
    if (categoryId) filters.push(eq(products.categoryId, categoryId));

    const items = await db.select({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      stock: products.stock,
      images: products.images,
      attributes: products.attributes,
      createdAt: products.createdAt,
      category: {
        id: categories.id,
        name: categories.name
      },
      seller: {
        fullName: users.fullName
      },
      rating: sql`(SELECT coalesce(avg(rating), 0)::numeric(10,1) FROM reviews WHERE product_id = products.id)`,
      reviewCount: sql`(SELECT count(id)::integer FROM reviews WHERE product_id = products.id)`
    })
    .from(products)
    .innerJoin(users, eq(products.sellerId, users.id))
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(and(...filters))
    .limit(parseInt(limit))
    .offset(parseInt(offset))
    .orderBy(desc(products.createdAt));

    res.json(items);
  } catch (err) {
    logger.error('Error fetching products', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get single product (Public/Buyer view)
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const items = await db.select({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      stock: products.stock,
      images: products.images,
      attributes: products.attributes,
      createdAt: products.createdAt,
      categoryId: products.categoryId,
      category: categories,
      seller: {
        id: users.id,
        fullName: users.fullName,
        email: users.email
      }
    })
    .from(products)
    .innerJoin(users, eq(products.sellerId, users.id))
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(and(
      eq(products.id, productId),
      eq(products.isDeleted, false),
      eq(products.moderationStatus, 'approved'),
      eq(users.status, 'active'),
      eq(users.isDeleted, false)
    ));

    if (items.length === 0) return res.status(404).json({ message: 'Product not found' });
    const item = items[0];

    // 1. Get average rating and count
    const [ratingStats] = await db.select({
      avgRating: sql`avg(${reviews.rating})::numeric(10,1)`,
      reviewCount: sql`count(${reviews.id})::integer`
    })
    .from(reviews)
    .where(eq(reviews.productId, productId));

    // 2. Get seller total items sold (for "Top Rated Vendor" badge)
    // A vendor is Top Rated if they sold 30+ items
    const [salesStats] = await db.select({
      totalItemsSold: sql`sum(${orderItems.quantity})::integer`
    })
    .from(orderItems)
    .where(and(
      eq(orderItems.sellerId, item.seller.id),
      eq(orderItems.status, 'delivered')
    ));

    res.json({
      ...item,
      rating: parseFloat(ratingStats.avgRating || 0),
      reviewCount: ratingStats.reviewCount || 0,
      seller: {
        ...item.seller,
        totalItemsSold: parseInt(salesStats.totalItemsSold || 0)
      }
    });
  } catch (err) {
    logger.error('Error fetching product by ID', err);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Create product (Seller only + Verification Lock)
exports.createProduct = async (req, res) => {
  try {
    // 1. Check Seller Verification Status
    const [verification] = await db.select()
      .from(sellerVerifications)
      .where(eq(sellerVerifications.sellerId, req.user.id))
      .limit(1);

    if (!verification || verification.status !== 'approved') {
      return res.status(403).json({ 
        message: 'Product creation is restricted until your seller verification is approved.' 
      });
    }

    const { name, description, price, stock, categoryId, attributes } = req.body;
    
    // Process uploaded images
    const images = req.files ? req.files.map((file, idx) => ({
      url: file.path,
      public_id: file.filename,
      isPrimary: idx === 0
    })) : [];

    const [newProduct] = await db.insert(products).values({
      sellerId: req.user.id,
      categoryId,
      name,
      description,
      price,
      stock,
      images,
      attributes: attributes ? JSON.parse(attributes) : {},
      moderationStatus: 'pending', // Reset to pending for new products
    }).returning();

    res.status(201).json(newProduct);
  } catch (err) {
    logger.error('Error creating product', err);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Update product (Seller only + Verification Lock + Optimistic Concurrency)
exports.updateProduct = async (req, res) => {
  try {
    // 1. Check Seller Verification Status
    const [verification] = await db.select()
      .from(sellerVerifications)
      .where(eq(sellerVerifications.sellerId, req.user.id))
      .limit(1);

    if (!verification || verification.status !== 'approved') {
      return res.status(403).json({ 
        message: 'Product updates are restricted until your seller verification is approved.' 
      });
    }

    const { name, description, price, stock, categoryId, attributes, version } = req.body;
    const { id } = req.params;

    const result = await db.update(products)
      .set({
        name,
        description,
        price,
        stock,
        categoryId,
        attributes: attributes ? JSON.parse(attributes) : undefined,
        version: sql`${products.version} + 1`,
        moderationStatus: 'pending', // Require re-approval on major update? Or just maintain?
        updatedAt: new Date(),
      })
      .where(and(
        eq(products.id, id),
        eq(products.sellerId, req.user.id),
        eq(products.version, parseInt(version))
      ))
      .returning();

    if (result.length === 0) {
      return res.status(409).json({ message: 'Update failed: Product modified by another process or access denied' });
    }

    res.json(result[0]);
  } catch (err) {
    logger.error('Error updating product', err);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Soft delete product (Seller only)
exports.deleteProduct = async (req, res) => {
  try {
    const result = await db.update(products)
      .set({ isDeleted: true })
      .where(and(
        eq(products.id, req.params.id),
        eq(products.sellerId, req.user.id)
      ))
      .returning();

    if (result.length === 0) return res.status(404).json({ message: 'Product not found or access denied' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// Get products for the logged-in seller
exports.getSellerProducts = async (req, res) => {
  try {
    const items = await db.query.products.findMany({
      where: and(eq(products.sellerId, req.user.id), eq(products.isDeleted, false)),
      with: {
        category: true,
      },
      orderBy: [desc(products.createdAt)],
    });

    res.json(items);
  } catch (err) {
    logger.error('Error fetching seller products', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Seller Dashboard Stats
exports.getSellerStats = async (req, res) => {
  try {
    const sellerId = req.user.id;
    
    // Total products
    const all = await db.select({ count: sql`count(*)` }).from(products)
      .where(and(eq(products.sellerId, sellerId), eq(products.isDeleted, false)));
      
    // Active products (stock > 0)
    const active = await db.select({ count: sql`count(*)` }).from(products)
      .where(and(
        eq(products.sellerId, sellerId), 
        eq(products.isDeleted, false),
        sql`${products.stock} > 0`
      ));
      
    // Low stock count (stock < 5)
    const lowStock = await db.select({ count: sql`count(*)` }).from(products)
      .where(and(
        eq(products.sellerId, sellerId), 
        eq(products.isDeleted, false),
        sql`${products.stock} < 5`
      ));

    res.json({
      total: parseInt(all[0].count),
      active: parseInt(active[0].count),
      lowStock: parseInt(lowStock[0].count),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};
