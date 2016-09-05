'use strict';

module.exports = function(oauth, requestHandler) {

	var that = {};
  var baseUrl = requestHandler.getBaseUrl();

  that.getAccount = function(callback) {
    var endpoint = baseUrl + 'account';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.setIsOnVacation = function(isOnVacation, callback) {
    var endpoint = baseUrl + 'account/vacation/' + isOnVacation;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, {}, {
      Authorization: authorizationHeader
    }, callback);    
  };

  that.setLanguage = function(idLanguage, callback) {
    var endpoint = baseUrl + 'account/language/' + idLanguage;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, {}, {
      Authorization: authorizationHeader
    }, callback);    
  };

  that.getMessageThreadOverview = function(callback) {
    var endpoint = baseUrl + 'account/messages';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);    
  };

  that.postMessageTo = function(idOtherUser, message, callback) {
    var endpoint = baseUrl + 'account/messages/' + idOtherUser;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('POST', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.post(endpoint, {
      message: message
    }, {
      Authorization: authorizationHeader
    }, callback);    
  };

  that.deleteMessageThreadWith = function(idOtherUser, callback) {
    var endpoint = baseUrl + 'account/messages/' + idOtherUser;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('DELETE', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.delete(endpoint, {}, {
      Authorization: authorizationHeader
    }, callback);    
  };

  that.deleteMessageWith = function(idOtherUser, idMessage, callback) {
    var endpoint = baseUrl + 'account/messages/' + idOtherUser + '/' + idMessage;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('DELETE', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.delete(endpoint, {}, {
      Authorization: authorizationHeader
    }, callback);    
  };

	return that;
};