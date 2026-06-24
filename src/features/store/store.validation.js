const Joi = require('joi');

const createStoreSchema = Joi.object({
  name: Joi.string().min(20).max(60).required(),
  email: Joi.string().email().required(),
  address: Joi.string().max(400).required(),
  ownerId: Joi.number().integer().optional(),
});

const updateStoreSchema = Joi.object({
  name: Joi.string().min(20).max(60).optional(),
  email: Joi.string().email().optional(),
  address: Joi.string().max(400).optional(),
  ownerId: Joi.number().integer().optional(),
});

module.exports = { createStoreSchema, updateStoreSchema };
