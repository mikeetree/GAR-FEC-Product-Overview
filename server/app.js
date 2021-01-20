const app = require('express')();
const api = require('./api');

app.use('/api', api);

module.exports = app;
