const { pgTable, uuid, varchar, boolean, timestamp, pgEnum, integer, numeric, jsonb, text, index } = require('drizzle-orm/pg-core');
const { relations, sql } = require('drizzle-orm');

// Enums
const userRoleEnum = pgEnum('user_role', ['buyer', 'seller', 'admin']);
const userStatusEnum = pgEnum('user_status', ['active', 'suspended', 'banned']);
const orderStatusEnum = pgEnum('order_status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'cancelled_due_to_stock', 'failed', 'returned']);
const paymentStatusEnum = pgEnum('payment_status', ['pending', 'paid', 'failed', 'refunded']);
const moderationStatusEnum = pgEnum('moderation_status', ['pending', 'approved', 'rejected']);
const reportStatusEnum = pgEnum('report_status', ['pending', 'reviewed', 'dismissed']);

// Tables
const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').default('buyer').notNull(),
  status: userStatusEnum('status').default('active').notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  verificationCode: varchar('verification_code', { length: 6 }),
  verificationCodeExpiresAt: timestamp('verification_code_expires_at'),
  verificationAttempts: integer('verification_attempts').default(0).notNull(),
  resetTokenHash: varchar('reset_token_hash', { length: 255 }),
  resetTokenExpiresAt: timestamp('reset_token_expires_at'),
  failedLoginAttempts: integer('failed_login_attempts').default(0).notNull(),
  lastLoginAttemptAt: timestamp('last_login_attempt_at'),
  twoFactorEnabled: boolean('two_factor_enabled').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  parentId: uuid('parent_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').notNull().references(() => users.id),
  categoryId: uuid('category_id').notNull().references(() => categories.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  images: jsonb('images').default([]).notNull(), // [{ url, public_id, isPrimary }]
  attributes: jsonb('attributes').default({}).notNull(),
  moderationStatus: moderationStatusEnum('moderation_status').default('pending').notNull(),
  version: integer('version').default(1).notNull(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  sellerIdx: index('seller_idx').on(table.sellerId),
  categoryIdx: index('category_idx').on(table.categoryId),
  isDeletedIdx: index('is_deleted_idx').on(table.isDeleted),
  moderationIdx: index('moderation_idx').on(table.moderationStatus),
  nameSearchIdx: index('name_search_idx').on(table.name),
  priceCheck: sql`check (${table.price} > 0)`,
  stockCheck: sql`check (${table.stock} >= 0)`,
}));

const sellerVerifications = pgTable('seller_verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').notNull().unique().references(() => users.id),
  tin: varchar('tin', { length: 50 }).notNull().unique(),
  chapaMerchantId: varchar('chapa_merchant_id', { length: 255 }).notNull().unique(),
  documents: jsonb('documents').default({}).notNull(),
  status: moderationStatusEnum('status').default('pending').notNull(),
  reviewNotes: text('review_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  sellerIdx: index('verif_seller_idx').on(table.sellerId),
  statusIdx: index('verif_status_idx').on(table.status),
}));

const productReports = pgTable('product_reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  reason: varchar('reason', { length: 100 }).notNull(),
  details: text('details'),
  status: reportStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  productIdx: index('report_product_idx').on(table.productId),
  statusIdx: index('report_status_idx').on(table.status),
}));

const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  adminId: uuid('admin_id').notNull().references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  targetType: varchar('target_type', { length: 50 }).notNull(),
  targetId: uuid('target_id').notNull(),
  changedFields: jsonb('changed_fields'),
  reason: text('reason'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  adminIdx: index('audit_admin_idx').on(table.adminId),
  targetIdx: index('audit_target_idx').on(table.targetType, table.targetId),
}));

const systemSettings = pgTable('system_settings', {
  key: varchar('key', { length: 100 }).primaryKey(),
  value: jsonb('value').notNull(),
  type: varchar('type', { length: 20 }).notNull(), // 'boolean', 'numeric', 'string', 'json'
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

const carts = pgTable('carts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().unique().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

const cartItems = pgTable('cart_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  cartId: uuid('cart_id').notNull().references(() => carts.id),
  productId: uuid('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').default(1).notNull(),
  attributes: jsonb('attributes').default({}).notNull(),
  priceSnapshot: numeric('price_snapshot', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  cartIdx: index('cart_idx').on(table.cartId),
  uniqueCartItem: index('unique_cart_item_idx').on(table.cartId, table.productId, table.attributes),
  compositeUnique: sql`unique(${table.cartId}, ${table.productId}, ${table.attributes})`,
}));

const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  buyerId: uuid('buyer_id').notNull().references(() => users.id),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('ETB').notNull(),
  status: orderStatusEnum('status').default('pending').notNull(),
  paymentStatus: paymentStatusEnum('payment_status').default('pending').notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).default('chapa').notNull(),
  txRef: varchar('tx_ref', { length: 255 }).notNull().unique(),
  chapaTransactionId: varchar('chapa_transaction_id', { length: 255 }),
  shippingAddress: jsonb('shipping_address').notNull(),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  buyerIdx: index('order_buyer_idx').on(table.buyerId),
  statusIdx: index('order_status_idx').on(table.status),
  paymentStatusIdx: index('order_payment_status_idx').on(table.paymentStatus),
  txRefIdx: index('order_tx_ref_idx').on(table.txRef),
}));

const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id),
  sellerId: uuid('seller_id').notNull().references(() => users.id),
  productId: uuid('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  priceAtPurchase: numeric('price_at_purchase', { precision: 10, scale: 2 }).notNull(),
  productNameSnapshot: varchar('product_name_snapshot', { length: 255 }).notNull(),
  attributesSnapshot: jsonb('attributes_snapshot').default({}).notNull(),
  productImageSnapshot: varchar('product_image_snapshot', { length: 500 }),
  status: orderStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orderIdx: index('item_order_idx').on(table.orderId),
  sellerIdx: index('item_seller_idx').on(table.sellerId),
  statusIdx: index('item_status_idx').on(table.status),
}));

// Relations
const usersRelations = relations(users, ({ one, many }) => ({
  products: many(products),
  cart: one(carts, {
    fields: [users.id],
    references: [carts.userId],
  }),
  orders: many(orders),
}));

const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'category_hierarchy',
  }),
  subcategories: many(categories, {
    relationName: 'category_hierarchy',
  }),
  products: many(products),
}));

const productsRelations = relations(products, ({ one, many }) => ({
  seller: one(users, {
    fields: [products.sellerId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  cartItems: many(cartItems),
  orderItems: many(orderItems),
}));

const cartsRelations = relations(carts, ({ one, many }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
  items: many(cartItems),
}));

const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

const ordersRelations = relations(orders, ({ one, many }) => ({
  buyer: one(users, {
    fields: [orders.buyerId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  seller: one(users, {
    fields: [orderItems.sellerId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

module.exports = {
  userRoleEnum,
  userStatusEnum,
  orderStatusEnum,
  paymentStatusEnum,
  moderationStatusEnum,
  reportStatusEnum,
  users,
  categories,
  products,
  sellerVerifications,
  productReports,
  auditLogs,
  systemSettings,
  carts,
  cartItems,
  orders,
  orderItems,
  usersRelations,
  categoriesRelations,
  productsRelations,
  cartsRelations,
  cartItemsRelations,
  ordersRelations,
  orderItemsRelations,
};
