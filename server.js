var config    = require('./config');
var knexfile  = require('./knexfile');
var express   = require('express');
var knex      = require('knex')(knexfile.development);
var bookshelf = require('bookshelf')(knex);

var app       = express();
var apiRoutes = require('./routes/api')(app, express, knex);

app.use('/api', apiRoutes);

app.listen(config.port);
