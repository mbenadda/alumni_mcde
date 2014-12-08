'use strict';

module.exports = function (req, res, next) {

  // Check that offer is correctly filled in, otherwise throw as this should not happen
  if (!req.offer) {
    throw new Error('req.offer undefined in the get_single request handler');
  }

  // Send back the offer
  return res.status(200)
            .json(req.offer)
            .end();

};
