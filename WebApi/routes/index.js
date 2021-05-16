const { Router } = require('express');

const UserController = require('../Controllers/UserController');
const SessionController = require('../Controllers/SessionController');
const PurchaseController = require('../Controllers/PurchaseController');
const { ensureAuthenticated } = require('../middlewares/AuthMiddleware');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.post('/sessions', SessionController.store);


router.use(ensureAuthenticated);
router.post('/purchases', PurchaseController.store);
router.get('/purchases', PurchaseController.index);
router.get('/purchases/:id', PurchaseController.show);


module.exports = router;