'use strict';

var express = require('express');

var router = express.Router();

// Get a list of articles
router.get('/', require('./get_list'));

// If the article parameter is present, use this middleware
router.param('article', function (req, res, next, id) {

});

// Get a single article
router.get('/:article', require('./get_single'));

// Verify that the requesting user is authorized before going any further
router.use(function (req, res, next) {

});

// Create a new article
router.post('/', require('./create'));

// Edit an existing article
router.put('/:article', require('./edit'));

module.exports = router;
