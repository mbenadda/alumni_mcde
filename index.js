var express = require('express');
var logger  = require('./lib/logger');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(require('morgan')('default', { stream: logger.steam })); // Pass express' logs to our logger

// Connect to the database and get an instance of the connection
var db = require('./lib/db')();

// Decentralize routing to a separate app folder and pass app as that's what the routes are bound to
var routes = require('./app')(app);

var server = app.listen(app.get('port'), function () {
  console.log('Listining on port %d', server.address().port);
});