'use strict';

var express = require('express');

module.exports = function (app) {

  app.use('/api/auth', require('./auth'));

  app.use('/api/testimonials', require('./testimonials'));

  app.use('/api/articles', require('./articles'));

  app.use('/api/offers', require('./offers'));

};
