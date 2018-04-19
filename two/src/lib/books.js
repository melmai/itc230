let books = [
    { 
        title: 'HTML & CSS: Design and Build Interfaces',
        author: 'Jon Duckett',
        pubDate: 2011
    },
    {
        title: 'JavaScript and JQuery: Interactive Front-End Web Development',
        author: 'Jon Duckett',
        pubDate: 2013
    },
    {
        title: 'Designing Interfaces',
        author: 'Jennifer Tidwell',
        pubDate: 2005
    },
    {
        title: 'Mastering Responsive Web Design with HTML5 and CSS3',
        author: 'Ricardo Zea',
        pubDate: 2015
    },
    {
        title: 'Python Programming: An Introduction to Computer Science',
        author: 'John M. Zelle',
        pubDate: 2004
    },
    {
        title: 'Guide to UNIX Using Linux, 4th ed.',
        author: 'Michael Palmer',
        pubDate: 2007
    },
    {
        title: 'The Elements of User Experience',
        author: 'Jesse James Garrett',
        pubDate: 2015
    },
];

// returns an array of all book objects
// @param none
const getAll = () => {
    return books;
};

// returns a single book based on title (exact match)
// @param book title
const get = (x) => {
    let book = books.filter(book => book.title.toLowerCase() == x);
    return book;
};

// removes a book from the array
// @param book title
const remove = (x) => {
    // store index of book to remove
    let index = books.findIndex(book => book.title.toLowerCase() == x);
    
    if(index >= 0) {                                // if book exists, remove
        let removedBook = books.splice(index, 1);
        return `Deleted ${removedBook[0].title}`;
    } else {                                        // else inform user no book match
        return 'No book found with that title';
    }
};

export { get, getAll, remove };