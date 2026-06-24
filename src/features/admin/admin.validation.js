const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().min(20).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
      .min(8)
      .max(16)
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])'))
      .message(
          'Password must be 8-16 characters, include one uppercase letter and one special character'
      )
      .required(),
  address: Joi.string().max(400).required(),
  role: Joi.string().valid('ADMIN', 'USER', 'STORE_OWNER').required(),
});

const createStoreSchema = Joi.object({
  name: Joi.string().min(20).max(60).required(),
  email: Joi.string().email().required(),
  address: Joi.string().max(400).required(),
  ownerId: Joi.number().integer().optional(),
});

module.exports = { createUserSchema, createStoreSchema };