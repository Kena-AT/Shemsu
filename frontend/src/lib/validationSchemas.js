import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/\d/, 'Password must contain at least one number'),
});

export const checkoutSchema = z.object({
  city: z.string().min(2, 'City is required'),
  subcity: z.string().min(2, 'Subcity is required'),
  phone: z
    .string()
    .regex(/^(\+251|0)9[0-9]{8}$/, 'Enter a valid Ethiopian phone number (e.g. 0911000000)'),
  woreda: z.string().optional(),
  houseNo: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

/**
 * Parses a Zod schema against data and returns a flat error map.
 * @param {z.ZodSchema} schema
 * @param {object} data
 * @returns {{ success: boolean, errors: Record<string, string> }}
 */
export const validateWithZod = (schema, data) => {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, errors: {} };

  const errors = {};
  // Zod uses .issues for error details, .errors is usually an alias
  const issues = result.error.issues || result.error.errors || [];
  
  issues.forEach(err => {
    const field = err.path[0];
    if (field && !errors[field]) {
      errors[field] = err.message;
    }
  });
  return { success: false, errors };
};
