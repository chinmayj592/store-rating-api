const express = require('express');
const router = express.Router();
const ratingController = require('./rating.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { createRatingSchema, updateRatingSchema } = require('./rating.validation');

router.use(authenticate, authorize('USER'));

router.post(
    '/stores/:storeId/ratings',
    validate(createRatingSchema),
    ratingController.createRating
);

router.put(
    '/ratings/:ratingId',
    validate(updateRatingSchema),
    ratingController.updateRating
);

module.exports = router;