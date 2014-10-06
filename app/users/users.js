var mongoose = require('mongoose'),	
	Event = require('../../models/event'),
	passport = require('passport'),
	ObjectId = mongoose.Types.ObjectId,
	User = mongoose.model('User');
	//Event = mongoose.model('Event');


	// FUNCTION AUTH, LOGIN & SESSION

	/**
	 *  Create user
	 *	require {username, email, f_nac, password}
	 *  returns {users}
	 */

	exports.createUser = function(req, res, next){

		var newUser = new User(req.body);
		newUser.provider = 'local-login';

		newUser.local.password = newUser.generateHash(newUser.local.password);
		newUser.local.pic = "ionic.png";

		newUser.save(function(err) {

		    if (err) {
		      return res.json(400, err);
		    }

		    req.logIn(newUser, function(err) {
		      if (err) 
		      	return next(err);
		      return res.json(newUser);
		    });
		  });
	}

	

	/**
	 *  Username exists
	 *  returns {exists}
	 */
	exports.exists = function (req, res, next) {
	  var username = req.params.username;
	  User.findOne({ username : username }, function (err, user) {
	    if (err) {
	      return next(new Error('Failed to load User ' + username));
	    }

	    if(user) {
	      res.json({exists: true});
	    } else {
	      res.json({exists: false});
	    }
	  });
	}

	// FUNCTION USERS

	exports.addContact = function(req, res, next){
		console.log('addContact de users...');
		var adduser = req.body;
		console.log(adduser);
		console.log(req.user);

		// Faltaría comprobar que el contacto no ha sido añadido antes..

		User.update({'_id':req.user._id},{
			$push: {contacts: req.body}
		}, function(err, num, rawres){
			if (err) 
				res.sender(err);
			
			res.json(rawres);
				
		});
	}

	exports.existsContact = function (req, res, next) {
	  var username = req.params.username;
	  User.findOne({ username : username }, function (err, user) {
	    if (err) {
	      return next(new Error('Failed to load User ' + username));
	    }

	    if(user) {
	      res.json({exists: true});
	    } else {
	      res.json({exists: false});
	    }
	  });
	}

	/**
	 *  Show profile
	 *  returns {username, profile}
	 */
	exports.getProfile = function(req, res, next) {
		var userId = req.params.userId;

			console.log('getProfile de users...' + userId);

		  	User.findById(ObjectId(userId), function (err, user) {
			    if (err) {
			      return next(new Error('Failed to load User'));
			    }
			    if (user) {
			      res.send(user);
			    } else {
			      res.send(404, 'USER_NOT_FOUND')
			    }
		  	});
	}

	exports.createEvent = function(req, res, next){

		console.log('createEvent de users...');
		console.log(req.user.local.pic);

		var newEvent = new Event();

		
		newEvent.title = req.body.title;
		newEvent.place = req.body.place;
		newEvent.date = req.body.date;
		newEvent.descrip = req.body.descrip;
		newEvent.pic = req.body.pic;

		newEvent.creator._id = req.user._id;
		newEvent.creator.username = req.user.local.username;
		newEvent.creator.pic = req.user.local.pic;


		newEvent.save(function(err) {

		    if (err) {
		      return res.json(400, err);
		    }

		    User.update({'_id':req.user._id},{
				$push: {events: { 
					'_id': newEvent._id,
					'title': newEvent.title,
					'date': newEvent.date,
					'place': newEvent.place,
					'pic': newEvent.pic
				}}
			}, function(err, num, rawres){
				if (err) 
					res.sender(err);

				return res.json(rawres);
					
			});
		  });
	}

	exports.getEvent = function(req, res, next) {
		var eventId = req.params.eventId;

			console.log('getEvent de users...' + eventId);

		  	Event.findById(ObjectId(eventId), function (err, event) {
			    if (err) {
			      return next(new Error('Failed to load Event'));
			    }
			    if (event) {
			      res.send(event);
			    } else {
			      res.send(404, 'EVENT_NOT_FOUND')
			    }
		  	});
	}

	exports.getEvents = function(req, res, next){

		console.log('getEventsssssss de users...');		

		var userId = req.params.userId;

		  	User.findById(ObjectId(userId), function (err, user) {
			    if (err) {
			      return next(new Error('Failed to load User'));
			    }
			    if (user) {
			      res.send(user.events);
			    } else {
			      res.send(404, 'USER_NOT_FOUND');
			    }
		  	});

	}

	exports.addMember = function(req, res, next){
		console.log('addMember de users...');
		
		var member = {
				'_id': '',
				'username' : req.body.username,
				'status' : '',
				'pic' : '',
			},
			evento = req.body.event;

		console.log(req.body);
		User.findOneAndUpdate({ 'local.username' : member.username}, 
							{$push: {events: evento}},
							function(err, user){
								if (err) 
									res.sender(err);
								else{							
								member._id=user._id;
								member.status=user.local.status;
								member.pic=user.local.pic;
								console.log(member);

								
								Event.findOneAndUpdate({ '_id' : evento._id}, 
													{$push: {members: member}},
													function(err, data){
														if (err) 
															res.sender(err);
														
														return res.json(data);													
													}
							
												);
								}
							}
						);
	}
		
	exports.getUserByUserName = function(req, res, next){

		console.log('getUserByUserName de users...');
		console.log(req.params.userName);

		var username = req.params.userName;

		  	User.findOne({ 'local.username' : username}, function (err, user) {
			    if (err) {
			      return next(new Error('Failed to load User'));
			    }
			    if (user) {
			      res.send(user);
			    } else {
			      res.send(404, 'USER_NOT_FOUND');
			    }
		  	});

	}

	exports.getEventByEventName = function(req, res, next){

		console.log('getEvent de users...');
		console.log(req.params.eventName);

		var eventname = req.params.eventName;

		  	User.findOne({ 'events.title' : eventname }, function (err, user) {
			    if (err) {
			      return next(new Error('Failed to load Event'));
			    }
			    if (user) {
			      res.send(user);
			    } else {
			      res.send(404, 'EVENT_NOT_FOUND');
			    }
		  	});
	}