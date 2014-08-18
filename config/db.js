// models/index.js

  var mongoose = require('mongoose');
  var dbName = 'dbToollife'
 
  // the application is executed on the local machine ...
  mongoose.connect('mongodb://localhost/' + dbName);