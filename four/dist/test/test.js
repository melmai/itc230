'use strict';

// tests for get(), add(), delete()
/* global describe it */

var expect = require('chai').expect;
var books = require('../lib/books');

describe('Book module', function () {
    it('returns requested book', function () {
        var title = 'javascript and jquery: interactive front-end web development';
        var result = books.get(title);
        expect(result).to.deep.equal({
            title: 'JavaScript and JQuery: Interactive Front-End Web Development',
            author: 'Jon Duckett',
            pubDate: 2013
        });
    });

    it('fails w/ invalid book', function () {
        var result = books.get('fake');
        expect(result).to.be.false;
    });

    it('deletes requested book', function () {
        var result = books.remove('javascript and jquery: interactive front-end web development');
        expect(result).to.deep.equal({
            book: [{
                title: 'JavaScript and JQuery: Interactive Front-End Web Development',
                author: 'Jon Duckett',
                pubDate: 2013
            }],
            count: 6
        });
    });

    it('fails to delete invalid book', function () {
        var result = books.remove('fake');
        expect(result).to.be.false;
    });

    it('adds requested book', function () {
        var result = books.add({
            title: 'Book Title',
            author: 'Author Name',
            pubDate: 2018
        });
        expect(result).to.deep.include({
            title: 'Book Title',
            author: 'Author Name',
            pubDate: 2018
        });
    });

    it('fails to add existing book', function () {
        var result = books.add({
            title: 'Designing Interfaces',
            author: 'Jennifer Tidwell',
            pubDate: 2005
        });
        expect(result).to.be.false;
    });
});