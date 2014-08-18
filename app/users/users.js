//var express = require('express');
var User = require('../../models/user.js');
//var router = express.Router();


module.exports = function(app, passport) {


// get all the users (accessed at GET http://localhost:3000/users)
app.get('/users/', function(req, res) {

	User.find(function(err, users){
		if (err) 
			res.send(err);
		res.json(users);
	});
});

// get the user with that id (accessed at GET http://localhost:3000/users))
app.get('/users/:user_id', function(req,res){

	User.findById(req.params.user_id, function(err,user){
		if (err) 
			res.sender(err);

		//res.json({ message: 'T P M ' });
		res.json(user);
	});

});

// update the user with that id

app.put('/users/:user_id', function(req, res){

	

	User.findById(req.params.user_id, function(err,user){
		if (err) 
			res.sender(err);
		user.name = req.body.name;

		user.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'User updated!' });
		});		
	});
});

// delete the user with that id

app.delete('/users/:user_id', function(req, res){

	User.findById(req.params.user_id, function(err,user){
		if (err) 
			res.sender(err);
		user.remove(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Borrado con sexito' });
		});		
	});
});

// create a user (accessed at POST http://localhost:3000/users)

app.post('/users/',function(req, res) {
	
	console.log(req.body);

	var user = new User(); 		// create a new instance of the Bear model
	user.name = req.body.name;  // set the users name (comes from the request)
	user.birthdate = req.body.birthdate;
	user.isAdmin = req.body.isAdmin === 'on' ? true : false	

	// save the user and check for errors
	user.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'User created!' });
	});
	
});

};

