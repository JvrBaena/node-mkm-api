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

    getArticleInStock: function(idArticle, callback) {
      if(!idArticle) return callback(new Error('Article Id must be provided'));
      mkm._get(stockRoutes['article'] + idArticle, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.article);
        });
      });
    },

    addArticleToStock: function(article, callback) {
      if(!article.idProduct) return callback(new Error('Product Id must be provided'));
      if(!article.language) return callback(new Error('Article language must be provided'));
      if(!article.comments) return callback(new Error('Article comments must be provided'));
      if(!article.amount) return callback(new Error('Article amount must be provided'));
      if(!article.price) return callback(new Error('Article price must be provided'));
      var req = '<request><article><idProduct>' + article.idProduct + '</idProduct><amount>' + article.amount + '</amount><language>' + article.language + '</language><comments>' + article.comments + '</comments><price>' + article.price + '</price>' + (article.condition ? '<condition>' + article.condition + '</condition>' : '') + (article.isFoil ? '<isFoil>' + article.isFoil + '</isFoil>' : '') + (article.isSigned ? '<isSigned>' + article.isSigned + '</isSigned>' : '') + (article.isAltered ? '<isAltered>' + article.isAltered + '</isAltered>' : '') + (article.isPlayset ? '<isPlayset>' + article.isPlayset + '</isPlayset>' : '') + (article.isFirstEd ? '<isFirstEd>' + article.isFirstEd + '</isFirstEd>' : '') + '</article></request>';
      mkm._post(stockRoutes['stock'], {body: new Buffer(req)}, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          if(result.inserted.success === 'false') return callback(new Error('Error adding article'));
          return callback(null, result.inserted);
        });
      });
    },

    increaseArticleInStock: function(idArticle, amount, callback) {
      mkm._put(stockRoutes['article'] + idArticle + '/increase/' + amount , {}, function(err, res, body) {
        if(err) return callback(err);
        if(!body) return callback(new Error('Error increasing article'));
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          console.log(result)
          return callback(null, result.article);
        });
      });
    },

    decreaseArticleInStock: function(idArticle, amount, callback) {
      mkm._put(stockRoutes['article'] + idArticle + '/decrease/' + amount , {}, function(err, res, body) {
        if(err) return callback(err);
        if(!body) return callback(new Error('Error decreasing article'));
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          return callback(null, result.article);
        });
      });
    },

    changeArticleToStock: function(article, callback) {
      if(!article.idArticle) return callback(new Error('Article Id must be provided'));
      if(!article.amount) return callback(new Error('Article amount must be provided'));
      var req = '<request><article><idArticle>' + article.idArticle + '</idArticle><amount>' + article.amount + '</amount>' + (article.language ? '<language>' + article.language + '</language>' : '') + (article.comments ? '<comments>' + article.comments + '</comments>' : '') + (article.price ? '<price>' + article.price + '</price>' : '') + (article.condition ? '<condition>' + article.condition + '</condition>' : '') + (article.isFoil ? '<isFoil>' + article.isFoil + '</isFoil>' : '') + (article.isSigned ? '<isSigned>' + article.isSigned + '</isSigned>' : '') + (article.isAltered ? '<isAltered>' + article.isAltered + '</isAltered>' : '') + (article.isPlayset ? '<isPlayset>' + article.isPlayset + '</isPlayset>' : '') + (article.isFirstEd ? '<isFirstEd>' + article.isFirstEd + '</isFirstEd>' : '') + '</article></request>';
      mkm._put(stockRoutes['stock'], {body: new Buffer(req)}, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          if(result.updatedArticles.success === 'false') return callback(new Error(result.updatedArticles.message));
          return callback(null, result.updatedArticles);
        });
      });
    },
   
    deleteArticleInStock: function(idArticle, amount, callback) {
      if(!idArticle) return callback(new Error('Article Id must be provided'));
      if(!amount) return callback(new Error('Article amount must be provided'));
      var req = '<request><article><idArticle>' + idArticle + '</idArticle><amount>' + amount + '</amount></article></request>';
      mkm._delete(stockRoutes['stock'], {body: new Buffer(req)}, function(err, res, body) {
        if(err) return callback(err);
        mkm._parser.parseString(body, function(err, result) {
          if(err) return callback(err);
          if(result.errors) return callback(new Error(result.errors.message));
          return callback(null, result.deleted);
        });
      });
    }
    
  };
}