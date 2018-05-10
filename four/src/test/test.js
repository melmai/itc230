// tests for get(), add(), delete()
/* global describe it */

const expect = require('chai').expect;
const books = require('../lib/books');

describe('Book module', () => {
    it('returns requested book', () => {
        let title = 'javascript and jquery: interactive front-end web development';
        let result = books.get(title);
        expect(result).to.deep.equal({
            title: 'JavaScript and JQuery: Interactive Front-End Web Development',
            author: 'Jon Duckett',
            pubDate: 2013
        });
    });

    it('fails w/ invalid book', () => {
        let result = books.get('fake');
        expect(result).to.be.false;
    });

    it('deletes requested book', () => {
        let result = books.remove('JavaScript and JQuery: Interactive Front-End Web Development');
        expect(result).to.deep.equal({
            title: 'JavaScript and JQuery: Interactive Front-End Web Development',
            author: 'Jon Duckett',
            pubDate: 2013
        });
    });

    it('fails to delete invalid book', () => {
        let result = books.remove('fake');
        expect(result).to.be.false;
    });

    it('adds requested book', () => {
        let result = books.remove('JavaScript and JQuery: Interactive Front-End Web Development');
        expect(result).to.deep.equal({
            title: 'JavaScript and JQuery: Interactive Front-End Web Development',
            author: 'Jon Duckett',
            pubDate: 2013
        });
    });

    it('fails to add existing book', () => {
        let result = books.add({
            title: 'JavaScript and JQuery: Interactive Front-End Web Development',
            author: 'Jon Duckett',
            pubDate: 2013
        });
        expect(result).to.equal(-1);
    });
});