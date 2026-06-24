const ratingService = require('./rating.service');
const asyncHandler = require('../../middleware/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');

const createRating = asyncHandler(async (req, res) => {
  const storeId = parseInt(req.params.storeId, 10);
  const rating = await ratingService.submitRating(
      storeId,
      req.user.id,
      req.body.rating
  );
  return ApiResponse.success(rating, 'Rating submitted', 201)(req, res);
});

const updateRating = asyncHandler(async (req, res) => {
  const ratingId = parseInt(req.params.ratingId, 10);
  const rating = await ratingService.modifyRating(
      ratingId,
      req.user.id,
      req.body.rating
  );
  return ApiResponse.success(rating, 'Rating updated')(req, res);
});

module.exports = { createRating, updateRating };