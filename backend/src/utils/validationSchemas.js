const { z } = require('zod');

// Auth Schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  role: z.enum(['buyer', 'seller'], {
    errorMap: () => ({ message: 'Role must be either buyer or seller' }),
  }),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const verifyEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  token: z.string().min(1, 'Token is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

// Product Schemas
const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  salePrice: z.preprocess((val) => val === '' ? undefined : val, z.coerce.number().positive().optional()),
  stock: z.coerce.number().int().nonnegative('Stock cannot be negative'),
  categoryId: z.string().uuid('Invalid category ID'),
  attributes: z.string().optional().transform((val) => {
    if (!val) return {};
    try {
      return JSON.parse(val);
    } catch (e) {
      return {};
    }
  }),
  version: z.coerce.number().int().optional(),
});

const cartItemSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  quantity: z.coerce.number().int().positive('Quantity must be at least 1'),
  attributes: z.record(z.any()).optional().default({}),
});

const checkoutSchema = z.object({
  shippingAddress: z.object({
    city: z.string().min(2, 'City is required'),
    subcity: z.string().min(2, 'Subcity is required'),
    woreda: z.string().optional(),
    houseNo: z.string().optional(),
    phone: z.string().regex(/^(\+251|0)9[0-9]{8}$/, 'Enter a valid Ethiopian phone number'),
    additionalInfo: z.string().optional(),
  }),
  cartId: z.string().uuid().optional(),
});

const updateOrderItemStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'], {
    errorMap: () => ({ message: 'Invalid order status' }),
  }),
});

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

module.exports = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  productSchema,
  cartItemSchema,
  checkoutSchema,
  updateOrderItemStatusSchema,
  contactFormSchema
};
