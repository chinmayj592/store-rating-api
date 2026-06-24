const adminService = require('./admin.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../middleware/asyncHandler');

const getDashboardStats = asyncHandler(async (req, res) => {
  ApiResponse.success(res, await adminService.getDashboardStats());
});

const createUser = asyncHandler(async (req, res) => {
  ApiResponse.created(res, await adminService.createUser(req.body), 'User created');
});

module.exports = { getDashboardStats, createUser };
