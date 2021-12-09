var mongoose = require('mongoose');

var LoginSchema = mongoose.Schema({
    name: String,
    password: String,
});

var LoginModel = mongoose.model('logins', LoginSchema);

module.exports = LoginModel;