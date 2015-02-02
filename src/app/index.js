'use strict';

module.exports = function (app) {

  app.use('/auth', require('./auth'));

  app.use('/testimonials', require('./testimonials'));

  app.use('/articles', require('./articles'));

  app.use('/offers', require('./offers'));

};
