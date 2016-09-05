'use strict';

var _BASE_URL           = 'https://mkmapi.eu/ws/v1.1/';
var _SANDBOX_BASE_URL   = 'https://sandbox.mkmapi.eu/ws/v1.1/';

module.exports = function(request, xml2js) {
  return function(sandbox, output) {
    var that = {};
    var baseUrl = sandbox ? _SANDBOX_BASE_URL : _BASE_URL;
    var skipXmlParse = false;
    
    if (output && output === 'json') {
      baseUrl += 'output.json/';
      skipXmlParse = true;
    }

    var xmlBuilder = new xml2js.Builder({rootName: 'request'});
    var xmlParser = new xml2js.Parser({
      explicitArray: false,
      explicitRoot: false
    });

    that.get = function(endpoint, headers, callback) {
      var self = this;

      request.get(endpoint, { headers: headers }, function(err, res, body) {
        if (err) return callback(err);
        if (res.statusCode < 200 || res.statusCode > 299) {
          var errorResponse = {
            statusCode: res.statusCode,
            statusMessage: res.statusMessage
          };
          if (body && typeof body === 'string') {
            var error = '';
            var errorBody;
            try {
              errorBody = JSON.parse(body);
              error = errorBody.error;
            } catch(e) {
              error = body;
            }
            errorResponse.errorMessage = error;
          }
          return callback(errorResponse);
        }
        if (skipXmlParse) return callback(null, body === '' ? {} : JSON.parse(body), res);

        xmlParser.parseString(body, function(err, result) {
          if (err) return callback(err);
          return callback(null, result, res);
        });
      });
    };

    that.post = function(endpoint, params, headers, callback) {
      var self = this;
      var options = {
        body: new Buffer(xmlBuilder.buildObject(params)),
        headers: headers
      };

      request.post(endpoint, options, function(err, res, body) {
        if (err) return callback(err);
        if (res.statusCode < 200 || res.statusCode > 299) {
          var errorResponse = {
            statusCode: res.statusCode,
            statusMessage: res.statusMessage
          };
          if (body && typeof body === 'string') {
            var error = '';
            var errorBody;
            try {
              errorBody = JSON.parse(body);
              error = errorBody.error;
            } catch(e) {
              error = body;
            }
            errorResponse.errorMessage = error;
          }
          return callback(errorResponse);
        }
        if (skipXmlParse) return callback(null, body === '' ? {} : JSON.parse(body), res);

        xmlParser.parseString(body, function(err, result) {
          if (err) return callback(err);
          return callback(null, result, res);
        });
      });
    };

    that.put = function(endpoint, params, headers, callback) {
      var self = this;
      var options = {
        body: new Buffer(xmlBuilder.buildObject(params)),
        headers: headers
      };
      request.put(endpoint, options, function(err, res, body) {
        if (err) return callback(err);
        if (res.statusCode < 200 || res.statusCode > 299) {
          var errorResponse = {
            statusCode: res.statusCode,
            statusMessage: res.statusMessage
          };
          if (body && typeof body === 'string') {
            var error = '';
            var errorBody;
            try {
              errorBody = JSON.parse(body);
              error = errorBody.error;
            } catch(e) {
              error = body;
            }
            errorResponse.errorMessage = error;
          }
          return callback(errorResponse);
        }
        if (skipXmlParse) return callback(null, body === '' ? {} : JSON.parse(body), res);

        xmlParser.parseString(body, function(err, result) {
          if (err) return callback(err);
          return callback(null, result, res);
        });
      });
    };

    that.delete = function(endpoint, params, headers, callback) {
      var self = this;
      var options = {
        body: new Buffer(xmlBuilder.buildObject(params)),
        headers: headers
      };
      request.del(endpoint, options, function(err, res, body) {
        if (err) return callback(err);
        if (res.statusCode < 200 || res.statusCode > 299) {
          var errorResponse = {
            statusCode: res.statusCode,
            statusMessage: res.statusMessage
          };
          if (body && typeof body === 'string') {
            var error = '';
            var errorBody;
            try {
              errorBody = JSON.parse(body);
              error = errorBody.error;
            } catch(e) {
              error = body;
            }
            errorResponse.errorMessage = error;
          }
          return callback(errorResponse);
        }
        if (skipXmlParse) return callback(null, body === '' ? {} : JSON.parse(body), res);

        xmlParser.parseString(body, function(err, result) {
          if (err) return callback(err);
          return callback(null, result, res);
        });
      });
    };

    that.getBaseUrl = function() {
      return baseUrl;
    };

    /*
      http://stackoverflow.com/questions/18251399/why-doesnt-encodeuricomponent-encode-single-quotes-apostrophes
     */
    
    that.fixedEncodeURIComponent = function(str) {  
      return encodeURIComponent(str).replace(/[!'()*]/g, escape);  
    };
    return that;
  };
};