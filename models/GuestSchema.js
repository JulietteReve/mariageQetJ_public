var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    songs: Array,
    sleep: Number, //0: pas sur place, 1: dortoir, 2: tente, 3: camping-car 4: chambre réservé
    drink: String, //0: ne boit pas, 1: boit avec parcimonie, 2: c'est qui parcimonie ?
    alcoolLiked: Array, // champagne, bière, rosé, blanc, rouge, soupe_angevine, spritz, rhum_arrangé, gin_tonic, jus de fruits, eau
    isAttending: Number, // 0: non, 1: oui, 2: pas encore de réponse
    breakfast: String, //0: non, 1: oui, 2 : ne sait pas encore
    status: Number, //0: VIP(chambre réservée), 1: pas de restrictions, 2: restriction dortoir
    comment: String,
    token: String,
});

// à set à enregistrement : firstName, lastName, gender, si status == 0 : sleep: 4, isAttending: 2, status

var carpoolingSchema = mongoose.Schema({
    offerSeats: Number,
    searchSeats: Number,
    from: String,
    phoneNumber: String,
});

var weddingPicturesSchema = mongoose.Schema({
    url: String,
    date: Date,
    publicId: String
})

var picturesSchema = mongoose.Schema({
    url: String,
    publicId: String
})

var guestSchema = mongoose.Schema({
    guestName: String,
    email: String,
    password: String,
    token: String,
    pictures: [picturesSchema],
    users: [userSchema], 
    carpooling: [carpoolingSchema],
    weedingPictures : [weddingPicturesSchema],
    countConnexion: Number,
    admin: Boolean,
})

// à setter à enregistement : guestName, email, password, pictures, users (cf en haut), countConnexion: 0 (ajouter +1 à chaque connexion), admin (false sauf nous)


var GuestModel = mongoose.model('guests', guestSchema);

module.exports = GuestModel;