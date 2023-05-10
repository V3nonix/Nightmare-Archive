const express = require('express');
const path = require('path');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

const { checkS3Bucket } = require('./config/awsClientS3');

require('dotenv').config();
require('./config/database');

checkS3Bucket();

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('./config/checkToken'));

const ensureLoggedIn = require('./config/ensureLoggedIn');

app.use('/api/internal/users', require('./routes/api/internal/users'));
app.use('/api/internal/posts', ensureLoggedIn, require('./routes/api/internal/posts'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});