const storeService = require('./store.service');
const asyncHandler = require('../../middleware/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');

const getStores = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.id : null; // might be used by admin too
  const result = await storeService.listStores(req.query, userId);
  return ApiResponse.paginated(result.stores, result.pagination)(req, res);
});

const getStore = asyncHandler(async (req, res) => {
  const storeId = parseInt(req.params.id, 10);
  const userId = req.user ? req.user.id : null;
  const store = await storeService.getStoreById(storeId, userId);
  return ApiResponse.success(store)(req, res);
});

module.exports = { getStores, getStore };