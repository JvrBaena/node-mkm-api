'use strict';

module.exports = function(oauth, requestHandler) {
  
  var that = {};
  var baseUrl = requestHandler.getBaseUrl();

  that.getOrderById = function(idOrder, callback) {
    var endpoint = baseUrl + 'order/' + idOrder;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.markOrderAsSent = function(idOrder, callback) {
    var endpoint = baseUrl + 'order/' + idOrder;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, {
      action: 'send'
    }, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.confirmOrderReception = function(idOrder, callback) {
    var endpoint = baseUrl + 'order/' + idOrder;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, {
      action: 'confirmReception'
    }, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.cancelOrder = function(idOrder, callback) {
    var endpoint = baseUrl + 'order/' + idOrder;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, {
      action: 'cancel'
    }, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.requestOrderCancellation = function(idOrder, reason, relistItems, callback) {
    if (!callback) {
      callback = relistItems;
      relistItems = null;
    }
    var endpoint = baseUrl + 'order/' + idOrder;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    var params = {
      action: 'requestCancellation',
      reason: reason
    };

    if (relistItems) options.relistItems = true;

    requestHandler.put(endpoint, params, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.acceptOrderCancellation = function(idOrder, relistItems, callback) {
    if (!callback) {
      callback = relistItems;
      relistItems = null;
    }
    var endpoint = baseUrl + 'order/' + idOrder;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    var params = {
      action: 'acceptCancellation'
    };

    if (relistItems) options.relistItems = true;

    requestHandler.put(endpoint, params, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.evaluateOrder = function(idOrder, evaluation, callback) {
    var endpoint = baseUrl + 'order/' + idOrder + '/evaluation';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('POST', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.post(endpoint, evaluation, {
      Authorization: authorizationHeader
    }, callback);
  };
  
  that.getOrdersByActorAndState = function(actor, state, start, callback) {
    if (!callback) {
      callback = start;
      start = null;
    }
    var endpoint = baseUrl + 'orders/' + actor + '/' + state + (start ? '/' + start : '');
    var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, function(err, res, rawResponse) {
      if (err) return callback(err);
      if (rawResponse.statusCode === 206) {
        res.pagination = {
          current: rawResponse.headers['content-range']
        };
      }
      return callback(null, res, rawResponse);
    });
  };
  
  return that;
};