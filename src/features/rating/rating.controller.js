const ratingService = require('./rating.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../middleware/asyncHandler');

const submitRating = asyncHandler(async (req, res) => {
  const result = await ratingService.submitRating(req.user.id, req.body);
  ApiResponse.created(res, result, 'Rating submitted');
});

const getUserRatingForStore = asyncHandler(async (req, res) => {
  const result = await ratingService.getUserRatingForStore(req.user.id, req.params.storeId);
  ApiResponse.success(res, result);
});

const deleteRating = asyncHandler(async (req, res) => {
  await ratingService.deleteRating(req.user.id, req.params.storeId);
  ApiResponse.success(res, null, 'Rating deleted');
});

module.exports = { submitRating, getUserRatingForStore, deleteRating };
