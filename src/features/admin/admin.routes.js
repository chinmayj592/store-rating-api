const router = require('express').Router();
const controller = require('./admin.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { createUserSchema } = require('./admin.validation');

router.use(authenticate, authorize('ADMIN'));
router.get('/dashboard', controller.getDashboardStats);
router.post('/users', validate(createUserSchema), controller.createUser);

module.exports = router;
