// use Book model from db
const Book = require('../models/Book');

// returns array that contains all book objects
const getAll = () => Book.find({}, (err, result) => err ? err : result);

// returns book object based on title
const get = x => {
    let pattern = new RegExp(x, 'i');
    return Book.find({ title: { $regex: pattern } }, (err, result) => err ? err : result );
};

// removes a book
// @param book title
const remove = x => {
    let pattern = new RegExp(x, 'i');
    Book.remove({ title: { $regex: pattern } }, (err, result) => err ? err: result );
    return Book.count((err) => { if(err) return err; });
    // store index of book to remove
    /* let index = books.findIndex(book => book.title.toLowerCase() == x) || -1;
    
    if(index >= 0) {                                // if book exists, remove
        let deletedBook = books.splice(index, 1);   // returns array with one object
        return { book: deletedBook, count: books.length };
    } else {                                        // else inform user no book match
        return false;
    } */
};

const add = x => {
    let newBook = new Book ({ title: x.title, author: x.author, pubDate: Number(x.pubDate) });
    newBook.save((err) => { if(err) return err; });
    return newBook;
    /* let newBook = {
        title: x.title,
        author: x.author,
        pubDate: x.pubDate
    };
    
    let test = books.find(book => book.title == newBook.title);
    if(test) {
        return false;
    } else {
        books.push(newBook);
        return books;
    } */
};

const count = () => {
    Book.count((err, count) => { 
        if(err) {
            console.error(err);
            return err;
        } else {
            console.log(count);
            return count;
        }
    }); 
};

module.exports =  { get, getAll, remove, add, count };