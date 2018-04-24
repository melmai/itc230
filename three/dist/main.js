'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var express = require('express');
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var books = require('./lib/books.js');
var parser = require('body-parser');

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(parser.urlencoded({ extended: true }));

// routing
app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/detail', function (req, res) {
    var title = req.query.title;
    var getDetails = books.get(title);
    res.render('detail', {
        title: title,
        result: getDetails
    });
});

app.post('/detail', function (req, res) {
    var title = req.body.title.toLowerCase();
    var getDetails = books.get(title);
    console.log(title);
    console.log(typeof title === 'undefined' ? 'undefined' : _typeof(title));
    console.log(getDetails);
    console.log(req.body);
    res.render('detail', {
        title: title,
        result: getDetails
    });
});

app.get('/delete', function (req, res) {
    var deleteBook = books.remove(req.query.title);
    res.render('delete', {
        title: req.query.title,
        books: deleteBook
    });
});

app.get('/', function (req, res) {
    var showList = books.getAll();
    console.log(showList);
    res.render('home', {
        books: showList
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