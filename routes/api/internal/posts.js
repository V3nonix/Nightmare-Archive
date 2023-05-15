const express = require('express');
const router = express.Router();

const uploadMiddleware = require('../../../config/uploadMiddlware');

const postsCtrl = require('../../../controllers/api/internal/posts');

router.post('/create', uploadMiddleware, postsCtrl.create);

router.delete('/delete/:id', postsCtrl.checkAccess, postsCtrl.delete);

router.put('/update/:id', postsCtrl.checkAccess, postsCtrl.update);

router.get('/public', postsCtrl.getPublicPosts);
router.get('/user', postsCtrl.getUserPosts);
router.get('/:id', postsCtrl.getPost);

module.exports = router;