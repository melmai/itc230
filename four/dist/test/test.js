'use strict';

// tests for get(), add(), delete()
/* global describe it */

var expect = require('chai').expect;
var books = require('../lib/books');

describe('Book module', function () {
    it('returns requested book', function () {
        var title = 'javascript and jquery: interactive front-end web development';
        console.log(title);
        var result = books.get(title);
        console.log(result);
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
        var result = books.remove('JavaScript and JQuery: Interactive Front-End Web Development');
        expect(result).to.deep.equal({
            title: 'JavaScript and JQuery: Interactive Front-End Web Development',
            author: 'Jon Duckett',
            pubDate: 2013
        });
    });

    it('fails to delete invalid book', function () {
        var result = books.remove('fake');
        expect(result).to.be.false;
    });

    it('adds requested book', function () {
        var result = books.remove('JavaScript and JQuery: Interactive Front-End Web Development');
        expect(result).to.deep.equal({
            title: 'JavaScript and JQuery: Interactive Front-End Web Development',
            author: 'Jon Duckett',
            pubDate: 2013
        });
    });

    it('fails to add existing book', function () {
        var result = books.add({
            title: 'JavaScript and JQuery: Interactive Front-End Web Development',
            author: 'Jon Duckett',
            pubDate: 2013
        });
        expect(result).to.equal(-1);
    });
});