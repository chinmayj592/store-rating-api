const router = require('express').Router();
const controller = require('./auth.controller');
const validate = require('../../middleware/validate');
const authenticate = require('../../middleware/authenticate');
const { signupSchema, loginSchema, updatePasswordSchema } = require('./auth.validation');

router.post('/signup', validate(signupSchema), controller.signup);
router.post('/login', validate(loginSchema), controller.login);
router.patch('/password', authenticate, validate(updatePasswordSchema), controller.updatePassword);

module.exports = router;
