module.exports = function (app) {

  app.use('/articles', require('./articles'));

}