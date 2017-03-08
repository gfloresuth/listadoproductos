var restify = require('restify');
var Promise = require('bluebird');
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'secret123',
        database : 'minishop'
    }
});




var modelProducts = require('./models/products');

//var objProducts= new modelProducts(knex);
var objProducts= Promise.promisifyAll(new modelProducts(knex));
//console.log(objProducts);


var server = restify.createServer();
server.get('/products/pages/', function (req, res, next) {
    console.log('[GET /products]');
    objProducts.getProducts({perPage:5,currentPage:1}).then(function(products){
        console.log(products);
        res.send(products);
        next();
    });
});

server.get('/products/pages/:page', function (req, res, next) {
    console.log('[GET /products/pages]');
    objProducts.getProducts({perPage:5,currentPage:req.params.page}).then(function(products){
        console.log(products);
        res.send(products);
        next();
    });
});


server.get('/products/pagesinfo', function (req, res, next) {
    console.log('[GET /products/pages]');
    objProducts.getPages(5).then(function(data){
        res.send(data);
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