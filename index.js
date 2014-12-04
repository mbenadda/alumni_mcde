var express = require('express');
var morgan = require('morgan');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev')); // Logs requests to console

// Decentralize routing to a separate app folder and pass app as that's what the routes are bound to
var routes = require('./app')(app);

var server = app.listen(app.get('port'), function () {
  console.log('Listining on port %d', server.address().port);
});