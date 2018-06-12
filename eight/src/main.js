const express = require('express');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const Book = require('./models/Book');
const parser = require('body-parser');

const app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// routing
app.get('/', (req, res) => {
    res.render('home', { layout: null });
});

// API Routing
// READ (get all)
app.get('/api/books', (req, res) => {
    Book.find((err, results) => {
        if (results) {
            res.json(results);
        } else {
            return res.status(500).send('Error occurred: database error.');
        }
    });
});

// READ (get one)
app.get('/api/book/:title', (req, res) => {
    const title = req.params.title;
    Book.find({ 'title': title }, (err, result) => {
        if (err) return err;
        if (result) {
            res.json(result);
        } else {
            res.json({ 'message': 'No book found!' });
        }
    });
});

// CREATE
app.post('/api/books/add', (req, res) => {
    const newBook = new Book();
    newBook.title = req.body.title || '';
    newBook.author = req.body.author || '';
    newBook.pubDate = req.body.pubDate || '';

    newBook.save((err) => {
        if (err) res.send(err);
        res.json({ 'message': 'Book added!' });
    });
});

// UPDATE
app.post('/api/book/update/:id', (req, res) => {
    const id = req.params.id;
    const updatedBook = req.body;

    Book.findByIdAndUpdate(id, updatedBook, { new: true }, (err) => {
        if (err) res.send(err);
        res.json({ 'message': 'Book updated!' });
    });
});


// DELETE
app.delete('/api/book/delete/:id', (req, res) => {
    const id = req.params.id;

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
