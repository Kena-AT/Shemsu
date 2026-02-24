const { ZodError } = require('zod');

/**
 * Middleware to validate request data against a Zod schema
 * @param {ZodSchema} schema - The Zod schema to validate against
 * @param {string} source - Where to find the data (body, query, params) - defaults to 'body'
 */
const validate = (schema, source = 'body') => (req, res, next) => {
  try {
    const data = req[source];
    schema.parse(data);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }
    next(error);
  }
};

module.exports = validate;
