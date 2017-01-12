// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt   = require('bcrypt-nodejs');

// set up a mongoose model and pass it using module.exports

module.exports = mongoose.model('User', new Schema({
    name: {
        type: String,
        required: true,
        validate: /^[a-zA-Z][a-zA-Z\\w]*/
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        unique: true
    },
    token: {
        type: String
    }
}));

