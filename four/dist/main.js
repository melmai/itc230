'use strict';

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
    var title = req.body.title;
    var getDetails = books.get(title.toLowerCase());
    res.render('detail', {
        title: title,
        result: getDetails
    });
});

app.get('/add', function (req, res) {
    res.render('add');
});

app.post('/add', function (req, res) {
    var title = req.body.title || '';
    var author = req.body.author || '';
    var pubDate = req.body.pubDate || '';
    var addBook = books.add({ title: title, author: author, pubDate: pubDate });
    res.render('add', {
        books: addBook,
        title: title,
        author: author,
        pubDate: pubDate
    });
});

app.get('/delete', function (req, res) {
    var title = req.query.title;
    var deleteBook = books.remove(title.toLowerCase());
    res.render('delete', {
        title: title,
        books: deleteBook.book,
        count: deleteBook.count
    });
});

app.get('/', function (req, res) {
    var showList = books.getAll();
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
app.use(function (err, req, res) {
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; Ctrl-C to end.');
});