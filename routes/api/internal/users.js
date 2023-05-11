const express = require('express');
const router = express.Router();

const usersCtrl = require('../../../controllers/api/internal/users');
const ensureLoggedIn = require('../../../config/ensureLoggedIn');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);

router.post('/profile/update', ensureLoggedIn, usersCtrl.updateProfile);

router.get('/profile', ensureLoggedIn, usersCtrl.getProfile);

module.exports = router;