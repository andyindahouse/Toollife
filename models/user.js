// models/User.js
// models/User.js
// MODEL OF USER
// ----------------------------------------------------------------
 
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({

	eventos		:[{
		nombre: String,
		info: String,
		creador: String,
		fecha: Date
	}],

	contactos	:[{
		nombre: String,
		email: String
	}],

	local		:{
		email: String,
		password: String,

		name : String, // tipo de dato cadena de caracteres
    	birthdate : Date, // tipo de dato fecha
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