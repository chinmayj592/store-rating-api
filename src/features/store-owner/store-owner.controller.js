const storeOwnerService = require('./store-owner.service');
const asyncHandler = require('../../middleware/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');

const dashboard = asyncHandler(async (req, res) => {
  const data = await storeOwnerService.getDashboard(req.user.id);
  return ApiResponse.success(data)(req, res);
});

module.exports = { dashboard };