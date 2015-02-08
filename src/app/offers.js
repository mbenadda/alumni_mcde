'use strict';

var _ = require('lodash');
var express = require('express');
var inspect = require('eyes').inspector({ maxLength: false });
var SpreadsheetResource = require('../lib/SpreadsheetResource');
var router = express.Router();

// Use an object stored in src to keep all the speadsheets URLs in one place
var Offers = new SpreadsheetResource(require('../spreadsheets').offers);

router.get('/', function (req, res, next) {
  Offers.query().then(function (offers) {

    offers = _(offers)
    .reverse()
    .value();

    res.status(200)
       .json(offers)
       .end();
  });
});

module.exports = router;