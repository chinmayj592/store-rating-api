const storeService = require('./store.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../middleware/asyncHandler');

const listStores = asyncHandler(async (req, res) => {
  ApiResponse.success(res, await storeService.listStores(req.query));
});

const getStoreById = asyncHandler(async (req, res) => {
  ApiResponse.success(res, await storeService.getStoreById(req.params.id));
});

const createStore = asyncHandler(async (req, res) => {
  ApiResponse.created(res, await storeService.createStore(req.body), 'Store created');
});

const updateStore = asyncHandler(async (req, res) => {
  ApiResponse.success(res, await storeService.updateStore(req.params.id, req.body), 'Store updated');
});

const deleteStore = asyncHandler(async (req, res) => {
  await storeService.deleteStore(req.params.id);
  ApiResponse.success(res, null, 'Store deleted');
});

module.exports = { listStores, getStoreById, createStore, updateStore, deleteStore };
