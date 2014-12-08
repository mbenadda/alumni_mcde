var _      = require('lodash');
var User   = require('../../../models/User.js');
var logger = require('../../../lib/logger');

module.exports = function (req, res, next) {
  var explicitUser;

  console.log('req.body', req.body);

  explicitUser = {
    email: req.body.email,
    name: req.body.name
  }

  User.register(new User(explicitUser), req.body.password,
    function (err, user) {
      if (err) {
        logger.error(err);
        return res.status(400)
                  .send(err);
      }
      return res.status(200)
                .json(user)
                .end();
    });
}