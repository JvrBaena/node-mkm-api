'use strict';

module.exports = function(oauth, requestHandler) {
  
  var that = {};
  var baseUrl = requestHandler.getBaseUrl();

  that.getGames = function(callback) {
    var endpoint = baseUrl + 'games';
    var oauthHeaders = oauth.buildPublicOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.getMetaproductById = function(idMetaproduct, callback) {
    var endpoint = baseUrl + 'metaproduct/' + idMetaproduct;
    var oauthHeaders = oauth.buildPublicOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.searchMetaproducts = function(name, idGame, idLanguage, callback) {
    var endpoint = baseUrl + 'metaproducts/' + requestHandler.fixedEncodeURIComponent(name) + '/' + idGame + '/' + idLanguage;
    var oauthHeaders = oauth.buildPublicOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.getProductById = function(idProduct, callback) {
    var endpoint = baseUrl + 'product/' + idProduct;
    var oauthHeaders = oauth.buildPublicOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.searchProducts = function(name, idGame, idLanguage, isExact, start, callback) {
    if (!callback) {
      callback = start;
      start = null;
    }
    var endpoint = baseUrl + 'products/' + requestHandler.fixedEncodeURIComponent(name) + '/' + idGame + '/' + idLanguage + '/' + isExact + (start ? '/' + start : '');
    var oauthHeaders = oauth.buildPublicOauthHeaders('GET', endpoint);
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

  that.getExpansionsByGameId = function(idGame, callback) {
    var endpoint = baseUrl + 'expansion/' + idGame;
    var oauthHeaders = oauth.buildPublicOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.getCardsByExpansion = function(idGame, name, callback) {
    var endpoint = baseUrl + 'expansion/' + idGame + '/' + requestHandler.fixedEncodeURIComponent(name);
    var oauthHeaders = oauth.buildPublicOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.getArticlesByProductId = function(idProduct, start, callback) {
    if (!callback) {
      callback = start;
      start = null;
    }
    var endpoint = baseUrl + 'articles/' + idProduct + (start ? '/' + start : '');
    var oauthHeaders = oauth.buildPublicOauthHeaders('GET', endpoint);
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

  that.getUser = function(idUser, callback) {
    var endpoint = baseUrl + 'user/' + requestHandler.fixedEncodeURIComponent(idUser);
    var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.getArticlesByUserId = function(idUser, start, callback) {
    if (!callback) {
      callback = start;
      start = null;
    }
    var endpoint = baseUrl + 'articles/user/' + requestHandler.fixedEncodeURIComponent(idUser) + (start ? '/' + start : '');
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