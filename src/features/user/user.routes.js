const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');

router.use(authenticate, authorize('ADMIN'));

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);

module.exports = router;