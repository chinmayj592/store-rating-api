const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validate = require('../../middleware/validate');
const authenticate = require('../../middleware/authenticate');
const {
    signupSchema,
    loginSchema,
    updatePasswordSchema,
} = require('./auth.validation');

router.post('/signup', validate(signupSchema), authController.signup);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authenticate, authController.logout);
router.put(
    '/password',
    authenticate,
    validate(updatePasswordSchema),
    authController.updatePassword
);

module.exports = router;