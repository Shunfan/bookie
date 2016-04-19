var express   = require('express');
var config    = require('./config');
var knex      = require('knex')(config.db);
var bookshelf = require('bookshelf')(knex);

var app = express();

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(config.port);
