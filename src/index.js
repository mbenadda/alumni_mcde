'use strict';

var express    = require('express');
var passport   = require('passport');
var bodyParser = require('body-parser');
var logger     = require('./lib/logger');
var User       = require('./models/User');

var app = express();
app.set('port', process.env.PORT || 3000);
// Pass express' logs to our Winston logger
app.use(require('morgan')('dev', { stream: logger.steam }));
// All our API calls will be formatted as JSON. This parses it and populates req.body with their content
app.use(bodyParser.json());
// Necessary initialization of Passport
app.use(passport.initialize());

// Configure passport with passport-local-mongoose
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to the database and get an instance of the connection
require('./lib/db')();

// Decentralize routing to a separate app folder and pass app as that's what the routes are bound to
require('./app')(app);

var server = app.listen(app.get('port'), function () {
  logger.info('Listening on port %d', server.address().port);
});
