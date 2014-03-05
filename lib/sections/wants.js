var routes = require('../routes.js'),
    wantsRoutes = routes.wants,
    ACTORS = [1, 2],
    STATUSES = [1, 2, 4, 8, 32, 128],
    ACTIONS = ['send', 'confirmReception', 'cancel', 'requestCancellation', 'acceptCancellation'];

module.exports = function(mkm) {
  return {

    getWantsList: function(callback) {
      mkm._get(wantsRoutes['wantslist'], function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.wantsList);
        });
      });
    }
    
  };
}