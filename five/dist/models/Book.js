'use strict';

var mongoose = require('mongoose');

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
// var connectionString = "mongodb://<dbuser>:<dbuserpassword>@ds015962.mlab.com:15962/<dbname>";
// mongoose.connect(connectionString);

// local db connection settings 
var ip = process.env.ip || '127.0.0.1';
mongoose.connect('mongodb://' + ip + '/books');

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
// values indicate the data type of each key
var mySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    pubDate: Number
});

module.exports = mongoose.model('Book', mySchema);