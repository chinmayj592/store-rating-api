const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().min(20).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).pattern(/[A-Z]/).pattern(/[!@#$%^&*]/).required(),
  address: Joi.string().max(400).optional(),
  role: Joi.string().valid('ADMIN', 'USER', 'STORE_OWNER').required(),
});

module.exports = { createUserSchema };
