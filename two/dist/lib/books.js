'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var books = [{
    title: 'HTML & CSS: Design and Build Interfaces',
    author: 'Jon Duckett',
    pubDate: 2011
}, {
    title: 'JavaScript and JQuery: Interactive Front-End Web Development',
    author: 'Jon Duckett',
    pubDate: 2013
}, {
    title: 'Designing Interfaces',
    author: 'Jennifer Tidwell',
    pubDate: 2005
}, {
    title: 'Mastering Responsive Web Design with HTML5 and CSS3',
    author: 'Ricardo Zea',
    pubDate: 2015
}, {
    title: 'Python Programming: An Introduction to Computer Science',
    author: 'John M. Zelle',
    pubDate: 2004
}, {
    title: 'Guide to UNIX Using Linux, 4th ed.',
    author: 'Michael Palmer',
    pubDate: 2007
}, {
    title: 'The Elements of User Experience',
    author: 'Jesse James Garrett',
    pubDate: 2015
}];

var getAll = function getAll() {
    return books;
};

var get = function get(x) {
    var book = books.filter(function (book) {
        return book.title.toLowerCase() == x;
    });
    return book;
};

var remove = function remove(x) {
    var index = books.findIndex(function (book) {
        return book.title.toLowerCase() == x;
    });

    if (index >= 0) {
        var removedBook = books.splice(index, 1);
        return 'Deleted ' + removedBook[0].title;
    } else {
        return 'No book found with that title';
    }
};

exports.get = get;
exports.getAll = getAll;
exports.remove = remove;