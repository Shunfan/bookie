var config     = require('./config');
var bodyParser = require('body-parser');
var express    = require('express');
var morgan     = require('morgan');

var app       = express();
var apiRoutes = require('./routes/api')(app, express);

// Set up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up morgan for development
// app.use(morgan('dev'));

// HTTP access control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
});

// Set the public folder to serve public assets
app.use(express.static(__dirname + '/public'));

// Serve Bookie API
app.use('/api', apiRoutes);

// Use angular application
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/app/views/index.html');
});

// Use the port in the config file
app.listen(process.env.PORT || config.port);

// Export app for tests
module.exports = app;
