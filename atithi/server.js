var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');
var Visitor = require('./app/models/visitor');
var port = process.env.PORT || 8080;
var apiRoutes = express.Router();
var authRoute = require('./routes/route');
var visitorsRoute = require('./routes/route');
var validator = require("email-validator");


mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));


app.get('/', function (req, res) {
    res.send('Hello..The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log('Running on Port http://localhost:' + port);


apiRoutes.get('/', function (req, res) {
    res.json({message: 'Welcome to the coolest API on earth!'});
});


app.use('/api/auth', authRoute);
app.use('/api/visitors', visitorsRoute);
