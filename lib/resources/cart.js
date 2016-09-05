'use strict';

module.exports = function(oauth, requestHandler) {

	var that = {};
  var baseUrl = requestHandler.getBaseUrl();

  that.getShoppingCart = function(callback) {
    var endpoint = baseUrl + 'shoppingcart';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.addArticles = function(idArticle, amount, callback) {
    var endpoint = baseUrl + 'shoppingcart';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    var params = {
      action: 'add',
      article: {
        idArticle: idArticle,
        amount: amount
      }
    };

    requestHandler.put(endpoint, params, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.removeArticles = function(idArticle, amount, callback) {
    var endpoint = baseUrl + 'shoppingcart';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    var params = {
      action: 'remove',
      article: {
        idArticle: idArticle,
        amount: amount
      }
    };

    requestHandler.put(endpoint, params, {
      Authorization: authorizationHeader
    }, callback);
  };
  
  that.emptyShoppingCart = function(callback) {
    var endpoint = baseUrl + 'shoppingcart';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('DELETE', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.delete(endpoint, {}, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.checkout = function(callback) {
    var endpoint = baseUrl + 'shoppingcart/checkout';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, {}, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.changeShippingAddress = function(shippingAddress, callback) {
    var endpoint = baseUrl + 'shoppingcart/shippingaddress';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, shippingAddress, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.getShippingMethodsForReservation = function(idReservation, callback) {
    var endpoint = baseUrl + 'shoppingcart/shippingmethod/' + idReservation;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  return that;
};