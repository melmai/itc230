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
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route
app.use(parser.json());

// routing

app.get('/', (req, res) => {
    res.render('home', { layout: null });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.all('/detail', (req, res, next) => {
    books.get(req.body.title)
        .then(items => res.render('detail', {
            title: req.body.title || req.query.title,
            result: items
        }))
        .catch((err) => next(err));
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
    });
});

// API Routing
app.get('/api/add', (req, res) => {
    res.render('api');
});

app.get('/api/books', (req, res) => {
    Book.find((err, results) => {
        if (results) {
            res.json(results);
        } else {
            return res.status(500).send('Error occurred: database error.');
        }
    });
});

app.post('/api/books', (req, res) => {
    let newBook = new Book();
    newBook.title = req.body.title || '';
    newBook.author = req.body.author || '';
    newBook.pubDate = req.body.pubdate || '';

    newBook.save((err) => {
        if (err) res.send(err);
        res.json({ 'message': 'Book added!' });
    });
});

app.get('/api/book/:title', (req, res) => {
    let title = req.params.title;
    Book.find({'title': title}, (err, result) => {
        if(err) return err;
        if(result) {
            res.json(result);
        } else {
            res.json({ 'message': 'No book found!' });
        }
    });
});

app.delete('/api/book/delete/:id', (req, res) => {
    let id = req.params.id;
    Book.remove({ '_id' : id }, (err, result) => {
        if(err) return err;
        if(result.n) {
            res.json({ 'message': 'Book deleted' });
        } else {
            res.json({ 'message': 'No book found by that name' });
        }
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
