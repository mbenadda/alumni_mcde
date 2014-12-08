var express  = require('express');
var passport = require('passport');
var router   = express.Router();

// Register a new account
router.post('/register', require('./register'));

// Login to an existing account
router.post('/login', passport.authenticate('local', { session: false }), require('./login'));

module.exports = router;