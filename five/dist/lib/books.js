'use strict';

// use Book model from db
var Book = require('../models/Book');

// returns array that contains all book objects
var getAll = function getAll() {
    return Book.find({}, function (err, result) {
        return err ? err : result;
    });
};

// returns a single book object based on title (exact match)
var get = function get(x) {
    return Book.find({ title: x }, function (err, result) {
        return err ? err : result;
    });
};

/* {
    let book = books.filter(book => book.title.toLowerCase() == x);
    if (book.length) {
        return book[0];
    } else {
        return false;
    } 
}; */

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

var add = function add(x) {
    var newBook = {
        title: x.title,
        author: x.author,
        pubDate: x.pubDate
    };

    var test = books.find(function (book) {
        return book.title == newBook.title;
    });
    if (test) {
        return false;
    } else {
        books.push(newBook);
        return books;
    }
};

module.exports = { get: get, getAll: getAll, remove: remove, add: add };