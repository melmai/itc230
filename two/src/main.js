const http = require('http'), fs = require('fs'), qs = require('querystring'), books = require('./lib/books.js');

function serveStaticFile(res, path, contentType, responseCode) {

    // if no var set, sets response code to OK
    if (!responseCode) responseCode = 200;

    fs.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

http.createServer(function (req, res) {
    let url = req.url.toLowerCase().split('?');     // everything after the domain
    let query = qs.parse(url[1]);                   // query string held in object
    let data = books.get(query.title);              // the book object from title
    let path = url[0];                              // route (before query string)

    // routes
    switch (path) 
    {
    case '/':
        serveStaticFile(res, '/public/home.html', 'text/html');
        break;
    case '/about':
        serveStaticFile(res, '/public/about.html', 'text/html');
        break;
    case '/get':
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Results for: ${query.title} \n\n ${JSON.stringify(data, null, 2)}`);
        break;
    case '/getall':
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`All Books: \n\n ${JSON.stringify(books.getAll(), null, 2)}`);
        break;
    case '/delete':
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(books.remove(query.title));
        break;
    default:
        serveStaticFile(res, '/public/404.html', 'text/html', 404);
        break;
    }
}).listen(3000);
