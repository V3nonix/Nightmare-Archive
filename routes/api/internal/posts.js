const express = require('express');
const router = express.Router();

const uploadMiddleware = require('../../../config/uploadMiddlware');

const postsCtrl = require('../../../controllers/api/internal/posts');

router.post('/new', uploadMiddleware, postsCtrl.create);