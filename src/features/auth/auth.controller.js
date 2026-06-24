const authService = require('./auth.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../middleware/asyncHandler');

const signup = asyncHandler(async (req, res) => {
  const result = await authService.signup(req.body);
  ApiResponse.created(res, result, 'Account created');
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  ApiResponse.success(res, result, 'Login successful');
});

const updatePassword = asyncHandler(async (req, res) => {
  await authService.updatePassword(req.user.id, req.body);
  ApiResponse.success(res, null, 'Password updated');
});

module.exports = { signup, login, updatePassword };
