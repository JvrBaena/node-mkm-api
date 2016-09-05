'use strict';

var async = require('async');

module.exports = function(crypto, querystring) {
	return function(options) {
		var that = {};

    var appToken = options.appToken;
    var appSecret = options.appSecret;
    var accessToken = options.accessToken;
    var accessTokenSecret = options.accessTokenSecret;

    /**
     * Sets the accessToken and accessTokenSecret values
     * so we can act in behalf of other user
     * @param  {String} accessToken       - New user access token
     * @param  {String} accessTokenSecret - New user access token secret
     */
    that.changeUser = function(accessToken, accessTokenSecret) {
      accessToken = accessToken;
      accessTokenSecret = accessTokenSecret;
    };

    that.getAppToken = function() {
      return appToken;
    };

    /**
     * Creates the authentication headers needed for 
     * a particular url and method
     * @param  {String} method - Http method of this request
     * @param  {String} url    - Api endpoint
     * @return {Object}        [description]
     */
    that.buildPublicOauthHeaders = function(method, url) {
      var self = this;

      var baseHeaders = _buildBaseOauthHeaders(url);
      baseHeaders.oauth_token = '';
      _buildPublicSignature(method, baseHeaders);
      return baseHeaders;
    };

    that.buildProtectedOauthHeaders = function(method, url) {
      var self = this;

      var baseHeaders = _buildBaseOauthHeaders(url);
      baseHeaders.oauth_token = accessToken;
      _buildProtectedSignature(method, baseHeaders);
      return baseHeaders;
    };

    that.buildAuthorizationHeader = function(headers) {
      var authString = 'OAuth ';
      var params = Object.keys(headers).map(function(key) {
        return key + '="' + headers[key] + '"';
      });
      return authString + params.join(',');
    };

    var _buildBaseOauthHeaders = function(url) {
      var self = this;

      var oauthHeaders = {
        realm: url,
        oauth_consumer_key: appToken,
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_nonce: crypto.randomBytes(16).toString('hex'),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0'
      };

      return oauthHeaders;
    };

     var _buildPublicSignature = function(method, headers) {
      var baseString = method.toUpperCase() + '&' + querystring.escape(headers.realm) + '&';
      var key = querystring.escape(appSecret) + '&';

      var paramsString = Object.keys(headers).sort().reduce(function(accum, key, index) {
        if (key === 'realm') return accum;
        if (index === 0) return key + '=' + headers[key];
        else return accum + '&' + key + '=' + headers[key];
      }, '');

      var signatureString = baseString + querystring.escape(paramsString);

      headers.oauth_signature = crypto.createHmac('sha1', key).update(signatureString).digest('base64');
    };

    var _buildProtectedSignature = function(method, headers) {
      var baseString = method.toUpperCase() + '&' + querystring.escape(headers.realm) + '&';
      var key = querystring.escape(appSecret) + '&' + querystring.escape(accessTokenSecret);

      var paramsString = Object.keys(headers).sort().reduce(function(accum, key, index) {
        if (key === 'realm') return accum;
        if (index === 0) return key + '=' + headers[key];
        else return accum + '&' + key + '=' + headers[key];
      }, '');

      var signatureString = baseString + querystring.escape(paramsString);

      headers.oauth_signature = crypto.createHmac('sha1', key).update(signatureString).digest('base64');
    };
    
    return that;
	};
};