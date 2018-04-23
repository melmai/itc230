const express = require('express');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const books = require('./lib/books.js');

const app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// routing
app.get('/', (req, res) => {
    let showList = books.getAll();
    res.render('home', { 
        books: showList,
        book: books.get(req.body.title)
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/result', (req, res) => {
    let findBook = books.get(req.query.title);
    res.render('result', {
        title: req.query.title,
        book: findBook,
    });
});

app.get('delete', (req, res) => {
    let deleteBook = books.remove(req.query.title);
    res.render('delete', {
        title: req.query.title,
        books: deleteBook,
    });
});

// 404 Error
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

// 500 Error
app.use((err, req, res, next) => {
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => { 
    console.log('Express started on http://localhost:' + app.get('port') + '; Ctrl-C to end.');
});


