'use strict';


module.exports = function(oauth, requestHandler) {
	var that = {};

  var baseUrl = requestHandler.getBaseUrl();
  
  that.getAuthorizationUrl = function() {
    return baseUrl + 'authenticate/' + oauth.getAppToken();
  };

  that.requestAccessToken = function(requestToken, callback) {
    var endpoint = baseUrl + 'access';
    var oauthHeaders = oauth.buildPublicOauthHeaders('POST', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.post(endpoint, {
      app_key: oauth.getAppToken(),
      request_token: requestToken
    }, {
      Authorization: authorizationHeader
    }, callback);
  };

  return that;
};