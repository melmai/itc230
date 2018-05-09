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

// returns an array of all book objects
// @param none
var getAll = function getAll() {
    return books;
};

// returns a single book based on title (exact match)
// @param book title
var get = function get(x) {
    var book = books.filter(function (book) {
        return book.title.toLowerCase() == x;
    });
    if (book.length) {
        return book[0];
    } else {
        return false;
    }
};

// removes a book from the array
// @param book title
var remove = function remove(x) {

    // store index of book to remove
    var index = books.findIndex(function (book) {
        return book.title.toLowerCase() == x;
    }) || -1;

    if (index >= 0) {
        // if book exists, remove
        var deletedBook = books.splice(index, 1); // returns array with one object
        return { book: deletedBook, count: books.length };
    } else {
        // else inform user no book match
        return false;
    }
};

var add = function add(title, author, pubDate) {
    var book = {
        title: title,
        author: author,
        pubDate: pubDate
    };
    books.push(book);
    console.log(books);
    return books;
};

exports.get = get;
exports.getAll = getAll;
exports.remove = remove;
exports.add = add;