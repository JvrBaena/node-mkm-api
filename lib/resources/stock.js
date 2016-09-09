'use strict';

module.exports = function(oauth, requestHandler) {
  
  var that = {};
  var baseUrl = requestHandler.getBaseUrl();

  that.getMyStock = function(start, callback) {
    if (!callback) {
      callback = start;
      start = null;
    }
    var endpoint = baseUrl + 'stock' + (start ? '/' + start : '');
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

  that.addArticles = function(articles, callback) {
    if (!(articles instanceof Array)) articles = [articles];

    var endpoint = baseUrl + 'stock';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('POST', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.post(endpoint, {
      article: articles
    }, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.editArticles = function(articles, callback) {
    if (!(articles instanceof Array)) articles = [articles];

    var endpoint = baseUrl + 'stock';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, {
      article: articles
    }, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.removeArticles = function(articles, callback) {
    if (!(articles instanceof Array)) articles = [articles];

    var endpoint = baseUrl + 'stock';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('DELETE', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.delete(endpoint, {
      article: articles
    }, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.increaseStock = function(articles, callback) {
    if (!(articles instanceof Array)) articles = [articles];

    var endpoint = baseUrl + 'stock/increase';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, {
      article: articles
    }, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.decreaseStock = function(articles, callback) {
    if (!(articles instanceof Array)) articles = [articles];

    var endpoint = baseUrl + 'stock/decrease';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, {
      article: articles
    }, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.getArticlesInShoppingCarts = function(callback) {
    var endpoint = baseUrl + 'stock/shoppingcart-articles';
    var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.getArticle = function(idArticle, callback) {
    var endpoint = baseUrl + 'stock/' + idArticle;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  that.getArticlesByNameAndGame = function(name, idGame, callback) {
    var endpoint = baseUrl + 'stock/' + name + '/' + idGame;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);
  };

  return that;
};