const express = require('express');
const router = express.Router();
const storeOwnerController = require('./store-owner.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');

router.get(
    '/dashboard',
    authenticate,
    authorize('STORE_OWNER'),
    storeOwnerController.dashboard
);

module.exports = router;