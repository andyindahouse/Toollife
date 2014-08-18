

// load all the things we need
var localStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');

module.exports = function(passport){

	// PASSPORT SESSION SETUP
// ----------------------------------------------------------------
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

	}, function(email, password, done){

		
		//UNDERCONSTRUCTION
		//NO RECONOCE REQ AÚN TENIENDO PASSREQTOCALLBACK ACTIVADO.
		

		// asynchronous
		// User.findOne wont fire unless data is sent back
		process.nextTick(function(){

		// Busca un usuario con ese email sino existe lo crea
		User.findOne({'local.email': email}, function(err, user){

			if(err)
				return done(err);

			if(user){                
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
			} else {

				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);
				
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
		passwordField: 'password',
		passReqToCallBack: true // allows us to pass back the entire request to the callback 

	}, function(email, password, done){

		// Busca un usuario con ese email sino existe lo crea
		User.findOne({'local.email': email}, function(err, user){

			if(err)
				return done(err);

			if(!user)
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			
			if(!user.validPassword(password))
				return	done(null, false, req.flash('loginMessage', 'Ooops! Wrong password.'));

			return done(null, user);
		});
		
	}));

};



