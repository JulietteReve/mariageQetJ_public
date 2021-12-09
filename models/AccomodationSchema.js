var mongoose = require('mongoose');

var accomodationSchema = mongoose.Schema({
    name: String,
    adresse: String,
    url: String,
    phoneNumber: String,
    category: String,
});

var AccomodationModel = mongoose.model('accomodations', accomodationSchema);

module.exports = AccomodationModel;