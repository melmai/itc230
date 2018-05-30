const express = require('express');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const books = require('./lib/books');
const Book = require('./models/Book');
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

app.all('/detail', (req, res, next) => {
    books.get(req.body.title)
        .then(items => res.render('detail', {
            title: req.body.title || req.query.title,
            result: items
        }))
        .catch((err) => next(err));
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    let title = req.body.title || '';
    let author = req.body.author || '';
    let pubDate = req.body.pubDate || '';
    books.add({ title, author, pubDate });
    res.render('add', {
        title: title,
        author: author,
        pubDate: pubDate
    });
});

app.get('/delete', (req, res) => {
    books.remove(req.query.title);
    res.render('delete', {
        title: req.query.title,
        count: books.count()
    });
});

app.get('/', (req, res, next) => {
    books.getAll()
        .then(items => res.render('home', { books: items }))
        .catch(err => next(err));
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


