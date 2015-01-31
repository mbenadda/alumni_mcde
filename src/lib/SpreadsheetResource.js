var _ = require('lodash');
var Q = require('q');
var needle = require('needle');

module.exports = function (resourceUrl) {
  var deferred, requestInProgress, resourceList;

  // Make resourceList a promise to factorize requests to the server. We must scope it and the main deferred outside
  // of fetchList to have them available every time we call fetchList
  deferred = Q.defer();
  resourceList = deferred.promise;

  function fetchList () {
    // Specify additional headers. Spreadsheets API requires an atom+xml accept.
    var headers = {
      Accept: 'application/atom+xml; */*'
    };

    // If resourceList is not fulfilled yet, then we must fulfill it now.
    // requestInProgress allows us to avoid duplicate queries if we are asked for the list again while
    // our own request to the resourceUrl is not answered yet.
    if (resourceList.isPending && resourceList.isPending() && !requestInProgress) {
      requestInProgress = true; // We are about to make a request

      needle.get(resourceUrl, headers, function (err, response) {
        var responseContent;

        requestInProgress = false; // Our request is done, whatever its result, do not block subsequent requests
        if (err) { throw new Error(err); }

        // Make sure the response body is an object so we can pass it through our formatting pipeline
        responseContent = _.isArray(response.body.feed.entry) ?
          response.body.feed.entry :
          [ response.body.feed.entry ];

        // Transform the messy object we got from xml2js into a clean, usable one
        resourceList = _.map(responseContent, function (item, index, array) {
          return _(item)
            .pick(function (value, key, object) {
              return _.startsWith(key, 'gsx:'); // All "real" properties begin with this
            })
            .transform(function (acc, value, key, object) {
              acc[key.substr(4)] = value; // Now remove the gsx: part
            }, {})
            .value();
        });

        deferred.resolve(resourceList);

        // Clean our cache 2 hours after we built it
        setTimeout(function () {
          deferred = Q.defer();
          resourceList = deferred.promise;
        }, 2 * 3600 * 1000);

      });
    }

    return deferred.promise;
  }

  this.query = function (callback) {
    var queryDeferred = Q.defer();

    // Get the promise through fetchList in case it is not fulfilled yet
    fetchList().then(function (list) {
      if (callback) { callback(list) };
      queryDeferred.resolve(list);
    });

    return queryDeferred.promise;
  }

}