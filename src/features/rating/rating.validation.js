const Joi = require('joi');

const createRatingSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
});

const updateRatingSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
});

module.exports = { createRatingSchema, updateRatingSchema };