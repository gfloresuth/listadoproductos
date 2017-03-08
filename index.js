var restify = require('restify');
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'secret123',
        database : 'minishop'
    }
});

var server = restify.createServer();
server.get('/products', function (req, res, next) {
    knex('products').select().then(function(products){
        res.send(products);
        next();
    });
});
server.get('/products/:id', function (req, res, next) {
    knex('products').select().where({
        id: req.params.id
    }).then(function(products){
        res.send(products);
        next();
    });
});

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});