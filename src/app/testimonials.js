'use strict';

var express = require('express');
var inspect = require('eyes').inspector({ maxLength: false });
var SpreadsheetResource = require('../lib/SpreadsheetResource');
var router = express.Router();

// Use an object stored in src to keep all the speadsheets URLs in one place
var Testimonials = new SpreadsheetResource(require('../spreadsheets').testimonials);

router.get('/', function (req, res, next) {
  Testimonials.query().then(function (testimonials) {
    res.status(200)
       .json(testimonials)
       .end();
  });
});

module.exports = router;