const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().min(20).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).pattern(/[A-Z]/).pattern(/[!@#$%^&*]/).required(),
  address: Joi.string().max(400).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).max(16).pattern(/[A-Z]/).pattern(/[!@#$%^&*]/).required(),
});

module.exports = { signupSchema, loginSchema, updatePasswordSchema };
