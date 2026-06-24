const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().min(20).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
      .min(8)
      .max(16)
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])'))
      .message(
          'Password must be 8-16 characters, include at least one uppercase letter and one special character'
      )
      .required(),
  address: Joi.string().max(400).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string()
      .min(8)
      .max(16)
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])'))
      .message(
          'New password must be 8-16 characters, include at least one uppercase letter and one special character'
      )
      .required(),
});

module.exports = { signupSchema, loginSchema, updatePasswordSchema };