var config    = require('./config');
var express   = require('express');
var bodyParser = require('body-parser');

var app       = express();
var apiRoutes = require('./routes/api')(app, express);

// Set up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Bookie API
app.use('/api', apiRoutes);

// Use the port in the config file
app.listen(process.env.PORT || config.port);

// Export app for tests
module.exports = app;
