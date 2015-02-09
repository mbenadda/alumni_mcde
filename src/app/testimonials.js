'use strict';

var _ = require('lodash');
var express = require('express');
var inspect = require('eyes').inspector({ maxLength: false });
var SpreadsheetResource = require('../lib/SpreadsheetResource');
var router = express.Router();

// Use an object stored in src to keep all the speadsheets URLs in one place
var Testimonials = new SpreadsheetResource(require('../spreadsheets').testimonials);

router.get('/', function (req, res, next) {
  Testimonials.query().then(function (testimonials) {

    // Keywords should be an array. So we make it so here.
    var response = _(testimonials)
    .map(function (item, index, array) {
      return _.mapValues(item, function (value, key, object) {
        if (key === 'keywords') {
          return _.map(value.split(','), function (item, index, array) {
            return item.trim();
          });
        }
        return value;
      });
    })
    .reverse()
    .value();

    res.status(200)
       .json(response)
       .end();
  });
});

module.exports = router;