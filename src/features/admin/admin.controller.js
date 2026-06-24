const adminService = require('./admin.service');
const asyncHandler = require('../../middleware/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');

const getDashboard = asyncHandler(async (req, res) => {
  const stats = await adminService.getDashboardStats();
  return ApiResponse.success(stats)(req, res);
});

const addUser = asyncHandler(async (req, res) => {
  const user = await adminService.createUser(req.body);
  return ApiResponse.success(user, 'User created', 201)(req, res);
});

const addStore = asyncHandler(async (req, res) => {
  const store = await adminService.createStore(req.body);
  return ApiResponse.success(store, 'Store created', 201)(req, res);
});

module.exports = { getDashboard, addUser, addStore };