var routes = require('../routes.js'),
    orderRoutes = routes.orders,
    ACTORS = [1, 2],
    STATUSES = [1, 2, 4, 8, 32, 128],
    ACTIONS = ['send', 'confirmReception', 'cancel', 'requestCancellation', 'acceptCancellation'];

module.exports = function(mkm) {
  return {

    getOrders: function(actor, status, start, callback) {
      if('function' === typeof start) {
        callback = start;
        start = null;
      }
      if(!actor || ACTORS.indexOf(actor) === -1) return callback(new Error('Actor must be provided and one of ' + ACTORS));
      if(!status || STATUSES.indexOf(status) === -1) return callback(new Error('Status must be provided and one of ' + STATUSES));
      mkm._get(orderRoutes['orders'] + actor + '/' + status + (start ? '/' + start : ''), function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, {
            orders: result.order,
            hasMore: res.statusCode === 206
          });
        });
      });
    },

    getOrder: function(orderId, callback) {
      if(!orderId) return callback(new Error('Order Id must be provided'));
      mkm._get(orderRoutes['order'] + orderId, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.order);
        });
      });
    },

    setOrderStatus: function(orderId, orderOptions, callback) {
      if(!orderId) return callback(new Error('Order Id must be provided'));
      if(!orderOptions.action || ACTIONS.indexOf(orderOptions.action) === -1) return callback(new Error('Action must be provided and one of ' + ACTIONS));
      if(orderOptions.action === 'cancel' && !orderOptions.reason) return callback(new Error('If action is cancel, reason must be provided'));

      var req = '<request><action>' + orderOptions.action + '</action>' + (orderOptions.reason ? '<reason>' + orderOptions.reason + '</reason>' : '') + '</request>';
      mkm._put(orderRoutes['order'] + orderId, {body: new Buffer(req)}, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result);
        });
      });
    }
    
  };
}