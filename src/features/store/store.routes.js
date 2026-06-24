const express = require('express');
const router = express.Router();
const storeController = require('./store.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');

// Both normal users and admin can view stores; even unauthenticated? Spec says normal users must see list after login.
// So we protect the route but allow USER, ADMIN, STORE_OWNER (store owner might want to see other stores? Not specified, but safe).
router.get('/', authenticate, authorize('USER', 'ADMIN', 'STORE_OWNER'), storeController.getStores);
router.get('/:id', authenticate, authorize('USER', 'ADMIN', 'STORE_OWNER'), storeController.getStore);

module.exports = router;