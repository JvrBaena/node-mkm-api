var routes = require('../routes.js'),
    marketplaceRoutes = routes.marketplace;

module.exports = function(mkm) {
  return {
    
    getGames: function(callback) {
      mkm._get(marketplaceRoutes['games'], function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.game);
        });
      });
    },

    getMetaproductById: function(metaproductId, callback) {
      mkm._get(marketplaceRoutes['metaproduct'] + metaproductId, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.metaproduct);
        });
      });      
    },

    findMetaproducts: function(name, game, lang, callback) {
      mkm._get(marketplaceRoutes['metaproduct'] + name + '/' + game + '/' + lang, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.metaproduct);
        });
      });      
    },

    getProductById: function(productId, callback) {
      mkm._get(marketplaceRoutes['product'] + productId, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.product);
        });
      });      
    },

    findProducts: function(search, game, lang, exact, start, callback) {
      if('function' === typeof start) {
        callback = start;
        start = null;
      }
      mkm._get(marketplaceRoutes['products'] + search + '/' + game + '/' + lang + '/' + exact + (start ? '/' + start : ''), function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, {
            products: result.product,
            hasMore: res.statusCode === 206
          });
        });
      });      
    },

    getArticlesByProductId: function(productId, start, callback) {
      if('function' === typeof start) {
        callback = start;
        start = null;
      }
      if(!productId) return callback(new Error('Product id must be provided'));
      mkm._get(marketplaceRoutes['articles'] + productId + (start ? '/' + start : ''), function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, {
            articles: result.article,
            hasMore: res.statusCode === 206
          });
        });
      });      
    },

    getUserById: function(userId, callback) {
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