'use strict';

var crypto = require('crypto');
var request = require('request');
var xml2js = require('xml2js');
var querystring = require('querystring');
var createOauthHandler = require('./lib/utils/oauth')(crypto, querystring);
var createRequestHandler = require('./lib/utils/requestHandler')(request, xml2js);
/** routes **/
var createAuthorizationRoutes = require('./lib/resources/authorization');
var createAccountRoutes = require('./lib/resources/account');
var createMarketplaceRoutes = require('./lib/resources/marketplace');
var createOrdersRoutes = require('./lib/resources/orders');
var createCartRoutes = require('./lib/resources/cart');
var createStockRoutes = require('./lib/resources/stock');
var createWantsListRoutes = require('./lib/resources/wants');


module.exports = function(options) {

  var that = {};

  var oauth = createOauthHandler(options);
  var requestHandler = createRequestHandler(options.sandbox, options.output);

  that.authorization = createAuthorizationRoutes(oauth, requestHandler);
  that.account = createAccountRoutes(oauth, requestHandler);
  that.marketplace = createMarketplaceRoutes(oauth, requestHandler);
  that.orders = createOrdersRoutes(oauth, requestHandler);
  that.cart = createCartRoutes(oauth, requestHandler);
  that.stock = createStockRoutes(oauth, requestHandler);
  that.wants = createWantsListRoutes(oauth, requestHandler);

  return that;
};