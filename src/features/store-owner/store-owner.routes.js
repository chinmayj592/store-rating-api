const router = require('express').Router();
const controller = require('./store-owner.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');

router.get('/dashboard', authenticate, authorize('STORE_OWNER'), controller.getDashboard);

module.exports = router;
