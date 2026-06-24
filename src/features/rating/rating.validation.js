const Joi = require('joi');

const ratingSchema = Joi.object({
  value: Joi.number().integer().min(1).max(5).required(),
  storeId: Joi.number().integer().required(),
});

const updateRatingSchema = Joi.object({
  value: Joi.number().integer().min(1).max(5).required(),
});

module.exports = { ratingSchema, updateRatingSchema };
