var routes = require('../routes.js'),
    wantsRoutes = routes.wants,
    ACTORS = [1, 2],
    STATUSES = [1, 2, 4, 8, 32, 128],
    ACTIONS = ['send', 'confirmReception', 'cancel', 'requestCancellation', 'acceptCancellation'];

module.exports = function(mkm) {
  return {

    getWantsLists: function(callback) {
      mkm._get(wantsRoutes['wantslist'], function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.wantsList);
        });
      });
    },

    getWantsListById: function(listId, callback) {
      mkm._get(wantsRoutes['wantslist'] + '/' + listId, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.want);
        });
      });
    },

    createWantsList: function(idGame, name, callback) {
      if(!idGame) return callback(new Error('WantsList id Game must be provided'));
      if(!name) return callback(new Error('WantsList name must be provided'));
      var req = '<request><wantsList><idGame>' + idGame + '</idGame><name>' + name + '</name></wantsList></request>';
      mkm._post(wantsRoutes['wantslist'], {body: new Buffer(req)}, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.wantsList);
        });
      });
    },

    deleteWantsList: function(listId, callback) {
      if(!listId) return callback(new Error('List Id must be provided'));
      mkm._delete(wantsRoutes['wantslist'] + '/' + listId, {}, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          if(res.statusCode !== 200) return callback(new Error('Error ' + res.statusCode + ' deleting WantsList'));
          //We have to do this as this resource does return NOTHING if successful :S
          return callback(null, { deleted: { listId: listId, success: true } });
        });
      });
    }
  };
}