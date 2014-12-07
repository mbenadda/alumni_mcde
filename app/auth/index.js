var express = require('express');

var router = express.Router();

// Register a new account
router.post('/register', require('./register'));

// Login to an existing account
router.post('/login', require('./login'));

module.exports = router;