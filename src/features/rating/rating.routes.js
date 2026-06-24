const router = require('express').Router();
const controller = require('./rating.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { ratingSchema } = require('./rating.validation');

router.use(authenticate, authorize('USER'));
router.post('/', validate(ratingSchema), controller.submitRating);
router.get('/store/:storeId', controller.getUserRatingForStore);
router.delete('/store/:storeId', controller.deleteRating);

module.exports = router;
