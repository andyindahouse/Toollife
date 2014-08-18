var bodyParser = require('body-parser');

module.exports = function(app, passport){	

	// MIDDLEWARE to use for all requests, 
// ----------------------------------------------------
	app.use(function(req, res, next) {
	// Se ejecuta antes y para todas las URLS.
		
		next(); // make sure we go to the next routes and don't stop here
	});


		// ROUTER OF '/'
// ----------------------------------------------------
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	// ROUTERS OF LOGGER '/login' '/signup' '/logout'
// ----------------------------------------------------
	// Muestra el formulario de login
	app.get('/login', function(req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});
	// Muestra el formulario de signup
	app.get('/signup', function(req, res){
		res.render('signup.ejs', {message: ''});
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});


	app.post('/signup', passport.authenticate('local-signup', {			
			successRedirect: '/profile',
			failuerRedirect: '/signup',	
			failuerFlash: true
	}));
	
	
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failuerRedirect: '/login',
		failuerFlash: true
	}));

	// ROUTERS AFTER LOGIN '/profile' '/diary' '/search'	
// ----------------------------------------------------
	
	app.get('/profile', isLoggedIn, function(req, res){
		
		console.log(req.user);

		res.render('profile.ejs', {
			user : req.user
		});
		
	});

	// FUNCIONES 
// ----------------------------------------------------	

	function isLoggedIn(req, res, next){
		
		if(req.isAuthenticated()){			
			next();
		}else
			res.redirect('/');
	}

	// ROUTERS OF '/users/' API (CRUD)
// ----------------------------------------------------
	var users = require('./users/users.js')(app, passport);
	//app2.use('/users', users);


};