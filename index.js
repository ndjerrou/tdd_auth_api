const express = require('express');
const routerAuth = require('./users/users.route');

const app = express();

app.use(express.json());

app.use('/auth', routerAuth);

module.exports = app;
