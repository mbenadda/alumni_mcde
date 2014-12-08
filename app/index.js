module.exports = function (app) {

  app.use('/auth', require('./auth'));

  app.use('/articles', require('./articles'));

  app.use('/offers', require('./offers'));

}