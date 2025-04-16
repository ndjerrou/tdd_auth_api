const express = require('express');
const routerAuth = require('./users/users.route');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/auth', routerAuth);

module.exports = app;
