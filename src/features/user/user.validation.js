const Joi = require('joi');

const listUsersSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  role: Joi.string().valid('ADMIN', 'USER', 'STORE_OWNER').optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  sortBy: Joi.string().optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
});

module.exports = { listUsersSchema };
