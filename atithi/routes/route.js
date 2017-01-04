// var crypto = require('crypto');
var express = require('express');
var app = express.Router();
var auth = require('../controllers/auth');
var visitors = require('../controllers/visitor');

// User's routes
app.post('/register', auth.register);
app.post('/login', auth.login);

//Visitor's routes
app.post('/add', visitors.add);
app.delete('/delete/:id', visitors.delete);
app.post('/update/:id', visitors.update);
app.get('/find_id/:id', visitors.find_id);
app.get('/findAll/', visitors.findAll);


module.exports = app;
