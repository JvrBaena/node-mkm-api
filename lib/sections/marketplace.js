var routes = require('../routes.js'),
    marketplaceRoutes = routes.marketplace;

module.exports = function(mkm) {
  return {
    getUser: function(userId, callback) {
      
      if(!userId) return callback(new Error('User id must be provided'));
      mkm._get(marketplaceRoutes['user'] + userId, function(err, res, body) {
        if(err) return callback(err);
        console.log(body)
        mkm._parser.parseString(body, function (err, result) {
          if(err) return callback(err);
          return callback(null, result.user);
        });
      });
    }
  };
};