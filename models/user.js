// models/user.js
// MODELOS DE USUARIO 
var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	Schema = mongoose.Schema;

var userSchema = new Schema({

	events		:[{
		_id: String,
		title: String,		
		place: String,
		date: Date,
		pic: String
	}],

	contacts	:[{
		_id: String,
		username: String,
		state: String,
		pic: String,
		email: String
	}],

	local		:{
		email: String,
		password: String,
		
		username : String, // tipo de dato cadena de caracteres
    	date : Date, // tipo de dato fecha
		status: String, 
		pic: String   	
    	//isAdmin : Boolean // tipo de dato buleano

	},

	facebook	:{
		id: String, 
		token: String,
		email: String,
		name: String
	},	

	twitter		:{
		id: String, 
		token: String,
		displayName: String,
		username: String
	},

	google		:{
		id: String, 
		token: String,
		email: String,
		name: String
	}
    
});

userSchema
	.virtual('user_info')
	.get(function(){
		return {'_id': this._id, 'username': this.username, 'email': this.email};
	});

userSchema.methods.age = function() {
    return ~~((Date.now() - this.birthdate) / (31557600000));
}

// Generar hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User',userSchema);