var bodyParser = require('body-parser');

module.exports = function(app, passport){	

	// USER ROUTES
	var users = require('./users/users.js');
	app.post('/auth/users', users.createUser);
	//	app.get('/auth/users/:userId', users.show);
	app.get('/auth/friends');

	// EVENT ROUTES
	app.post('/auth/events', users.createEvent);
	app.get('/auth/event/:eventId', users.getEvent);
	app.get('/auth/events/:userId', users.getEvents);
	app.put('/auth/event/addmember', users.addMember);

	// SEARCH ROUTES
	app.get('/search/users/:userName', users.getUserByUserName);
	app.get('/search/users/:eventName', users.getEventByEventName);

	app.get('/search/users/profile/:userId', users.getProfile);
	app.put('/search/users/adduser', users.addContact);

	// Check if username is available
	// todo: probably should be a query on users
	app.get('/auth/check_username/:username', users.exists);

	// SESSION ROUTES
	var session = require('../config/session');
	app.get('/auth/session', isLoggedIn, session.session);
	app.post('/auth/session', session.login);
	app.delete('/auth/session', session.logout);	


	// ANGULAR ROUTES
	app.get('*', function(req, res) {
		console.log('routes *');
		res.send('../www/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

	// FUNCIONES 
	function isLoggedIn(req, res, next){
		
		if(req.isAuthenticated()){			
			next();
		}else
			res.send(401);
	}


};