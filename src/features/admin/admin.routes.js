const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { createUserSchema, createStoreSchema } = require('./admin.validation');

router.use(authenticate, authorize('ADMIN'));

router.get('/dashboard', adminController.getDashboard);
router.post('/users', validate(createUserSchema), adminController.addUser);
router.post('/stores', validate(createStoreSchema), adminController.addStore);

module.exports = router;