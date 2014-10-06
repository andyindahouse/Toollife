

// load all the things we need
var mongoose = require('mongoose'),
	localStrategy = require('passport-local').Strategy,
	User = require('../models/user');

module.exports = function(passport){

	// PASSPORT SESSION SETUP
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	// used to desserialize the user

	passport.deserializeUser(function(id, done){

		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	// LOCAL SIGNUP
// ----------------------------------------------------------------

	passport.use('local-signup', new localStrategy({
		// by default, localstrategy uses username y password, we will override with email
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallBack: true // allows us to pass back the entire request to the callback

	}, function(req, res, next, done){

		console.log('passport ejecutandose...');

		console.log(req);		

		// asynchronous
		// User.findOne wont fire unless data is sent back
		process.nextTick(function(){

		// Busca un usuario con ese email sino existe lo crea
		User.findOne({'local.email': email}, function(err, user){

			if(err)
				return done(err);

			if(user){                
                return done(null, false);
			} else {

				var newUser = new User(local);				
				newUser.local.password = newUser.generateHash(password);
				newUser.local.pic = "ionic.png";
				console.log(newUser);
				
				newUser.save(function(err){
					if(err)
						throw err;					
					return	done(null, newUser);
				});
			}

		});
		});
	}));

	// LOCAL LOGIN
// ----------------------------------------------------------------
	
	passport.use('local-login', new localStrategy({
		// by default, localstrategy uses username y password, we will override with email
		usernameField: 'email',
		passwordField: 'password'

	}, function(email, password, done){
		console.log('passport ejecutandose...');
		User.findOne({'local.email': email}, function(err, user){

			if(err)
				return done(err);

			if(!user)
				return done(null, false, {
					'errors': {
						'email': {type: 'Email is not registered'}
					}
				});
			
			if(!user.validPassword(password))
				return	done(null, false, {
		          'errors': {
		            'password': { type: 'Password is incorrect.' }
		          }
		        });
			
			return done(null, user);
		});
		
	}));

};



