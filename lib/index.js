var VERSION = '0.0.0',
    request = require('request'),
    xml2js = require('xml2js');


function Mkm(user, apiKey) {
  if(!(this instanceof Mkm)) return new Mkm(user, apiKey);
  if(!user || !apiKey) throw new Error('User and apiKey must be provided');

  this.user = user;
  this.apiKey = apiKey;
  this.baseApi = 'https://www.mkmapi.eu/ws';

};

Mkm.prototype._get = function(url, callback) {
  var self = this;
  request.get(self.baseApi + '/' + self.user + '/' + self.apikey + url, callback);
}

Mkm.prototype._post = function(url, params, callback) {
  var self = this;
  request.post(self.baseApi + '/' + self.user + '/' + self.apikey + url, params, callback);
}

Mkm.prototype.getUser = function(userId, callback) {
  var self = this;
  
  if(!userId) return callback(new Error('User id must be provided'));
  
  request.get(self.baseApi + '/users/' + userId, function(err, res, body) {
    if(err) return callback(err);
    xml2js.parseString(body, function (err, result) {
      if(err) return callback(err);
      return callback(null, result);
    });

  });

}

module.exports = Mkm;