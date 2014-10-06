// BASE SETUP 
// Modules
var express = require('express');
var app = express();
var path = require('path');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var debug = require('debug')('Toollife');


// CONFIGURATION 
var port = process.env.PORT || 8080; // set our port


var db = require('./config/db');
require('./config/passport')(passport);

//app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/www')));
//app.set('view engine', 'ejs');

// logger
app.use(session({secret: 'keyboard cat', 
                 saveUninitialized: true,
                 resave: true}));


app.use(passport.initialize());
app.use(passport.session());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);


// REGISTER ROUTES 
require('./app/routes.js')(app, passport);

// ----------------------------------------------------------------

// START APP 
app.listen(port);										// startup our app at http://localhost:8080
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
