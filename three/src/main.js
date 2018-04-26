const express = require('express');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const books = require('./lib/books.js');
const parser = require('body-parser');

const app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(parser.urlencoded({ extended: true }));

// routing
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/detail', (req, res) => {
    let title = req.query.title;
    let getDetails = books.get(title);
    res.render('detail', {
        title: title,
        result: getDetails
    });
});

app.post('/detail', (req, res) => {
    let title = req.body.title;
    let getDetails = books.get(title.toLowerCase());
    res.render('detail', {
        title: title,
        result: getDetails
    });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    let title = req.body.title || '';
    let author = req.body.author || '';
    let pubDate = req.body.pubDate || '';
    let addBook = books.add(title, author, pubDate);
    res.render('add', {
        books: addBook,
        title: title,
        author: author,
        pubDate: pubDate
    });
});

app.get('/delete', (req, res) => {
    let title = req.query.title;
    let deleteBook = books.remove(title.toLowerCase());
    res.render('delete', {
        title: title,
        books: deleteBook.book,
        count: deleteBook.count
    });
});

app.get('/', (req, res) => {
    let showList = books.getAll();
    res.render('home', {
        books: showList,
    });
});

// 404 Error
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

// 500 Error
app.use((err, req, res) => {
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => { 
    console.log('Express started on http://localhost:' + app.get('port') + '; Ctrl-C to end.');
});


