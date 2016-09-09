'use strict';

module.exports = function(oauth, requestHandler) {
  
  var that = {};
  var baseUrl = requestHandler.getBaseUrl();

  that.getAllWantsLists = function(callback) {
  	var endpoint = baseUrl + 'wantslist';
  	var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
  	var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

  	requestHandler.get(endpoint, {
  	  Authorization: authorizationHeader
  	}, callback);  	
  };

  that.getWantsList = function(idWantsList, callback) {
    var endpoint = baseUrl + 'wantslist/' + idWantsList;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('GET', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.get(endpoint, {
      Authorization: authorizationHeader
    }, callback);   
  };

  that.deleteWantsList = function(idWantsList, callback) {
    var endpoint = baseUrl + 'wantslist/' + idWantsList;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('DELETE', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.delete(endpoint, {}, {
      Authorization: authorizationHeader
    }, callback);   
  };

  that.createWantsList = function(idGame, name, callback) {
  	var endpoint = baseUrl + 'wantslist';
  	var oauthHeaders = oauth.buildProtectedOauthHeaders('POST', endpoint);
  	var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

  	requestHandler.post(endpoint, {
      wantslist: {
        idGame: idGame,
        name: name
      }
    }, {
  	  Authorization: authorizationHeader
  	}, callback);  	
  };

  that.addToWantsList = function(idWantsList, products, metaproducts, callback) {
  	if (!(products instanceof Array)) products = [products];
  	if (!(metaproducts instanceof Array)) metaproducts = [metaproducts];

  	var endpoint = baseUrl + 'wantslist/' + idWantsList;
  	var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
  	var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

  	requestHandler.put(endpoint, {
      action: 'add',
  	  product: products,
      metaproduct: metaproducts
  	}, {
  	  Authorization: authorizationHeader
  	}, callback);  	
  };

  that.editWants = function(idWantsList, wants, callback) {
    if (!(wants instanceof Array)) wants = [wants];
    
    var endpoint = baseUrl + 'wantslist/' + idWantsList;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, {
      action: 'edit',
      want: wants
    }, {
      Authorization: authorizationHeader
    }, callback);   
  };

  that.deleteWants = function(idWantsList, wants, callback) {
    if (!(wants instanceof Array)) wants = [wants];

    var endpoint = baseUrl + 'wantslist/' + idWantsList;
    var oauthHeaders = oauth.buildProtectedOauthHeaders('PUT', endpoint);
    var authorizationHeader = oauth.buildAuthorizationHeader(oauthHeaders);

    requestHandler.put(endpoint, {
      action: 'remove',
      want: wants
    }, {
      Authorization: authorizationHeader
    }, callback);   
  };

  return that;
};