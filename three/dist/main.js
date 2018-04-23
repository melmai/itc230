'use strict';

var express = require('express');
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var books = require('./lib/books.js');

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// routing
app.get('/', function (req, res) {
    var showList = books.getAll();
    res.render('home', {
        books: showList
    });
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/result', function (req, res) {
    var findBook = books.get(req.body.title);
    res.render('result', {
        title: req.body.title,
        book: findBook
    });
});

app.get('delete', function (req, res) {
    var deleteBook = books.remove(req.query.title);
    res.render('delete', {
        title: req.query.title,
        books: deleteBook
    });
});

// 404 Error
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

// 500 Error
app.use(function (err, req, res, next) {
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; Ctrl-C to end.');
});