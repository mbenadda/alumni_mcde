var express = require('express');
var Offer = require('../../models/Offer.js').model;

var router = express.Router();

// Get a list of offers
router.get('/', require('get_list'));

// If the offer parameter is present, use this middleware
router.param('offer', function (req, res, next, id) {
  Offer.findById(id)
    .populate('author')
    .exec(function (err, docs) {
      if (err) {
        throw new Error(err);
      }
      if (!docs) {
        return res.status(404)
                  .send('Failed to find an offer with ID ' + id);
      }
      req.offer = docs;
      return next();
    });
});

// Get a single offer
router.get('/:offer', require('get_single'));

// Verify that the requesting user is authorized before going any further
router.use(function (req, res, next) {

});

// Create a new offer
router.post('/', require('create'));

// Edit an existing offer
router.put('/:offer', require('edit'));

module.exports = router;