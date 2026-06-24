const AppError = require('../utils/AppError');

// Middleware factory that validates request data against a Joi schema
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      throw new AppError(message, 400);
    }
    req[property] = value; // replace with sanitized values
    next();
  };
};

module.exports = validate;