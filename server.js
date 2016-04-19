var config    = require('./config');
var express   = require('express');
var knex      = require('knex')(config.db);
var bookshelf = require('bookshelf')(knex);

var app       = express();
var apiRoutes = require('./routes/api')(app, express);

app.use('/api', apiRoutes);

app.listen(config.port);
