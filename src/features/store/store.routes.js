const router = require('express').Router();
const controller = require('./store.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { createStoreSchema, updateStoreSchema } = require('./store.validation');

router.get('/', authenticate, controller.listStores);
router.get('/:id', authenticate, controller.getStoreById);
router.post('/', authenticate, authorize('ADMIN'), validate(createStoreSchema), controller.createStore);
router.patch('/:id', authenticate, authorize('ADMIN'), validate(updateStoreSchema), controller.updateStore);
router.delete('/:id', authenticate, authorize('ADMIN'), controller.deleteStore);

module.exports = router;
