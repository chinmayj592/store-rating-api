const storeOwnerService = require('./store-owner.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../middleware/asyncHandler');

const getDashboard = asyncHandler(async (req, res) => {
  ApiResponse.success(res, await storeOwnerService.getOwnerDashboard(req.user.id));
});

module.exports = { getDashboard };
