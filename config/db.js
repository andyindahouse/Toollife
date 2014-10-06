// models/index.js

  var mongoose = require('mongoose');
  var dbName = 'dbToollife'
 
  // the application is executed on the local machine ...
  //mongoose.connect('mongodb://localhost/' + dbName);
  mongoose.connect('mongodb://user:%BbddM0NG0L4B%@ds063909.mongolab.com:63909/heroku_app30445385');