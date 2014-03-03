var routes = require('../routes.js'),
    stockRoutes = routes.stock;

module.exports = function(mkm) {
  return {

    getStock: function(start, callback) {
      if('function' === typeof start) {
        callback = start;
        start = null;
      }
      mkm._get(stockRoutes['stock'] + (start ? '/' + start : ''), function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.article);
        });
      });
    },

    getArticleInStock: function(articleId, callback) {
      if(!articleId) return callback(new Error('Article Id must be provided'));
      mkm._get(stockRoutes['article'] + articleId, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.article);
        });
      });
    },

    addArticleToStock: function(article, callback) {
      var req = '<request><article><idProduct>' + article.idProduct + '</idProduct><language>' + article.language + '</language><comments>' + article.comments + '</comments><amount>' + article.amount + '</amount><price>' + article.price + '</price></article></request>';
      mkm._post(stockRoutes['stock'], {body: new Buffer(req)}, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.inserted);
        });
      });
    },

    increaseArticleInStock: function(articleId, amount, callback) {
      mkm._put(stockRoutes['article'] + articleId + '/increase/' + amount , {}, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.article);
        });
      });
    }
  };
}