// models/user.js
// MODELOS DE USUARIO 
var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	Schema = mongoose.Schema;

var eventSchema = new Schema({
	
	title: String,
	descrip: String,
	pic: String,
	place: String,
	date: Date,
	creator: {
		_id: String,
		username: String,
		pic: String
	},

	members	:[{
		_id: String,
		username: String,
		status: String,
		pic: String
	}]

});

module.exports = mongoose.model('Event',eventSchema);