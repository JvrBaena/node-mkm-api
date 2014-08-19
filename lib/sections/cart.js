var routes = require('../routes.js'),
    cartRoutes = routes.cart;

module.exports = function(mkm) {
  return {

    getCart: function(callback) {
      mkm._get(cartRoutes['shoppingcart'], function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.shoppingCart);
        });
      });
    },

    addToCart: function(articleId, amount, callback) {
      if(!articleId) return callback(new Error('Article Id must be provided'));
      var req = '<request><action>add</action><article><idArticle>' + articleId + '</idArticle><amount>' + amount + '</amount></article></request>';
      mkm._put(cartRoutes['shoppingcart'], {body: new Buffer(req)}, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.shoppingCart);
        });
      });
    },

    removeFromCart: function(articleId, amount, callback) {
      if(!articleId) return callback(new Error('Article Id must be provided'));
      var req = '<request><action>remove</action><article><idArticle>' + articleId + '</idArticle><amount>' + amount + '</amount></article></request>';
      mkm._put(cartRoutes['shoppingcart'], {body: new Buffer(req)}, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.shoppingCart);
        });
      });
    },
    
    checkoutCart: function(callback) {
      mkm._get(cartRoutes['checkout'], function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.shoppingCart);
        });
      });
    },

    deleteCart: function(callback) {
      mkm._delete(cartRoutes['shoppingcart'], function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.shoppingCart);
        });
      });
    },

  };
}