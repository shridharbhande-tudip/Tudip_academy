var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
// var User = require('./app/models/user');
// var Visitor = require('./app/models/visitor');
var apiRoutes = express.Router();
// bundle our routes
var authRoute = require('./routes/route');
var visitorsRoute = require('./routes/route');

mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));


app.get('/', function (req, res) {
    res.send('welcome to http://localhost:' + port );
});

//running on port 8080
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Server Running on Port http://localhost:' + port);

/*   get Home page   */
apiRoutes.get('/myAPI', function (req, res) {
    res.json({message: 'Welcome to our First Express project!'});

});

app.use('/api/auth', authRoute);
app.use('/api/visitors', visitorsRoute);
app.use('/api', apiRoutes);
