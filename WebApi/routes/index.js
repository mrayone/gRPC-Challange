const { Router } = require('express');

const UserController = require('../Controllers/UserController');
const SessionController = require('../Controllers/SessionController');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.post('/sessions', SessionController.store);

module.exports = router;