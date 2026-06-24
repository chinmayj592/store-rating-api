const authService = require('./auth.service');
const asyncHandler = require('../../middleware/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');

const signup = asyncHandler(async (req, res) => {
  const user = await authService.signup(req.body);
  return ApiResponse.success(user, 'User registered successfully', 201)(req, res);
});

const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body.email, req.body.password);
  return ApiResponse.success(data, 'Login successful')(req, res);
});

const logout = (req, res) => {
  // JWT is stateless; client must discard the token
  return ApiResponse.success(null, 'Logged out successfully')(req, res);
};

const updatePassword = asyncHandler(async (req, res) => {
  await authService.updatePassword(
      req.user.id,
      req.body.oldPassword,
      req.body.newPassword
  );
  return ApiResponse.success(null, 'Password updated successfully')(req, res);
});

module.exports = { signup, login, logout, updatePassword };