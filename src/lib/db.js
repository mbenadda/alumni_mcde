'use strict';

var mongoose = require('mongoose');
var logger   = require('./logger');

module.exports = function () {
  var db;

  // Connect to the database
  mongoose.connect('mongodb://localhost:27017');

  // Bind the connection
  db = mongoose.connection;

  // Log on errors. TODO: we probably want to stop and restart the process
  db.on('error', function (error) {
    logger.error('Mongoose Connection ' + error.toString());
  });

  db.once('open', function () {
    logger.info('Connection to MongoDB database successfully established.');
  });
};
