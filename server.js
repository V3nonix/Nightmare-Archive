const express = require('express');
const path = require('path');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('./config/checkToken'));

const ensureLoggedIn = require('./config/ensureLoggedIn');

app.use('/server/users/', require('./routes/server/users'));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});