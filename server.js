// BASE SETUP 
// --------------------------------------------------------------

// Modules
var express = require('express');
var app = express();
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var debug = require('debug')('Toollife');


// CONFIGURATION 
// ----------------------------------------------------------------

var port = process.env.PORT || 8080; // set our port


var db = require('./config/db');
require('./config/passport')(passport);

app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use(favicon());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
//pp.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// logger
app.use(session({secret: 'keyboard cat', 
                 saveUninitialized: true,
                 resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



// REGISTER ROUTES 
// ----------------------------------------------------------------
//var router = express.Router();
require('./app/routes.js')(app, passport);
//app.use('/', router);

// ----------------------------------------------------------------

// start app ===============================================
app.listen(port);										// startup our app at http://localhost:8080
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
