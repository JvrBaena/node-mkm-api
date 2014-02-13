var VERSION = '0.0.0',
    request = require('request'),
    xml2js = require('xml2js'),
    routes = require('./routes.js'),
    marketplaceRoutes = routes.marketplace;

    
function Mkm(user, apiKey) {
  if(!(this instanceof Mkm)) return new Mkm(user, apiKey);
  if(!user || !apiKey) throw new Error('User and apiKey must be provided');

  this.user = user;
  this.apiKey = apiKey;
  this._parser = new xml2js.Parser({
    explicitArray: false,
    explicitRoot: false
  });

  this.marketplace = require('./sections/marketplace.js')(this);

};


Mkm.prototype._get = function(url, callback) {
  var self = this;
  console.log(routes['base'] + self.user + '/' + self.apiKey + url);
  request.get(routes['base'] + self.user + '/' + self.apiKey + url, callback);
}

Mkm.prototype._post = function(url, params, callback) {
  var self = this;
  request.post(routes['base'] + self.user + '/' + self.apikey + url, params, callback);
}

module.exports = Mkm;