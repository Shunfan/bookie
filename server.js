var config    = require('./config');
var express   = require('express');
var bodyParser = require('body-parser');

var app       = express();
var apiRoutes = require('./routes/api')(app, express);

// Set up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(config.port);
