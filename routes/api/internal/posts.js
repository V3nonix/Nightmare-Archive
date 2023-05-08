const express = require('express');
const router = express.Router();

const uploadMiddleware = require('../../../config/uploadMiddlware');

const postsCtrl = require('../../../controllers/api/internal/posts');

router.post('/create', uploadMiddleware, postsCtrl.create);

router.get('/user', postsCtrl.getUserPosts)

module.exports = router;