const router = require('express').Router();
const controller = require('./user.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');

router.use(authenticate, authorize('ADMIN'));
router.get('/', controller.listUsers);
router.get('/:id', controller.getUserById);

module.exports = router;
