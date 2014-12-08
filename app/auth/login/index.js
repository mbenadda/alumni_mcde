module.exports = function (req, res, next) {
  console.log('Through login middleware');
  res.status(200).end();
}