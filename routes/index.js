var express = require('express');
var router = express.Router();
var uid2 = require('uid2');
var bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;
var fs = require('fs');
var uniqid = require('uniqid');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET 
 });

var GuestModel = require('../models/GuestSchema');
var AccomodationModel = require('../models/AccomodationSchema');
var LoginModel = require('../models/LoginSchema');
const { Router } = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/saveGuest', async function(req, res, next) {
  var canBeSaved = true;
  var error;

  const guestExists = await GuestModel.findOne({guestName: req.body.identifiant});
  if (guestExists) {
    canBeSaved = false;
    error = "Cet identifiant existe déjà, merci d'en choisir un autre";
  } else {
    const emailExists = await GuestModel.findOne({email: req.body.email});
    if (emailExists) {
      canBeSaved = false;
      error = "Cet email existe déjà, merci d'en choisir un autre"
    } 
  }

  if (canBeSaved) {
    
    var newLogin = new LoginModel({
      name: req.body.identifiant,
      password: req.body.password,
    })
    await newLogin.save();
    
    const cost = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, cost);
    var usersArray = req.body.guests;
    var users = [];
    var status;
    var sleep = null;
    if (req.body.status == 'VIP (chambre réservée)') {
      status = 0
      sleep = 4
    } else if (req.body.status == 'Ne pas proposer le dortoir') {
      status = 2
    } else {
      status = 1
    }

    for (var i=0; i<usersArray.length; i++) {
      users.push({
        firstName: usersArray[i].firstName,
        lastName: usersArray[i].lastName,
        gender: usersArray[i].gender,
        status: status,
        isAttending: 2,
        sleep: sleep
      })
    }

    var newGuest = new GuestModel({
        guestName: req.body.identifiant,
        password: hashedPassword,
        email: req.body.email,
        token: uid2(32),
        admin: false,
        countConnexion: 0,
        users: users,
        pictures: [{url: process.env.DEF_PIC, publicId:process.env.DEF_ID}],
    })
    var guestSaved = await newGuest.save();
    res.json({result: true, guestSaved: guestSaved});

  } else {
    res.json({result: false, error: error});
  }
})

router.put('/updateUser', async function(req, res, next) {
  await GuestModel.updateOne(
    {token: req.body.guest.token, 
      users : {$elemMatch: {_id: req.body.user._id}}
    },
    { $set: { 
      "users.$.firstName" : req.body.firstName,
      "users.$.lastName" : req.body.lastName,
    } 
    }
  )
  res.json({result: true})
})

router.delete('/deleteUser', async function(req, res, next) {
  await GuestModel.updateOne(
    {token: req.body.guest.token},
    { $pull: { users: {_id : req.body.user._id}} }
  )
  res.json({result: true})
})

router.post('/createUser', async function(req, res, next) {

    var sleep = null;
    if (req.body.guest.users[0].status == 0) {
      sleep = 4
    } 

  var newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    status: req.body.guest.users[0].status,
    isAttending: 2,
    sleep: sleep
  };

  await GuestModel.updateOne(
    {token: req.body.guest.token},
    { $push: { users: newUser } }
  )

  res.json({result: true})
})

router.put('/updateEmail', async function(req, res, next) {
  await GuestModel.updateOne(
    {token: req.body.guest.token},
    {email: req.body.email}
  )
  res.json({result: true})
})

router.delete('/deleteGuest', async function(req, res, next) {
  await GuestModel.deleteOne(
    {token: req.body.guest.token}
  )
  await LoginModel.deleteOne(
    {name: req.body.guest.guestName}
  )
  res.json({result: true})
})


router.post('/signIn', async function(req, res, next) {

  if (!req.body.guestName) {
    res.json({result: false, error: "Veuillez saisir votre identifiant"})
  } else if (!req.body.password) {
    res.json({result: false, error: "Veuillez saisir votre mot de passe"})
  } else {
    var guestName = req.body.guestName.replace(/ /g, "");

    const guest = await GuestModel.findOne({guestName: guestName});
      if (!guest) {
        res.json({result: false, error: "Identifiant incorrect"})
      } else {
        if (bcrypt.compareSync(req.body.password, guest.password)) {
          await GuestModel.updateOne(   
            {guestName: guestName},
            {$inc: { countConnexion: +1}}
          );
          res.json({result: true, guest: guest})
        } else {
          res.json({result: false, error: "Mot de passe incorrect"})
        }
      }
  }
})

router.get('/userDetails/:id/:token', async function(req, res, next) {
  const guest = await GuestModel.findOne({token: req.params.token});
  const user = guest.users.filter(user => user._id == req.params.id)[0];
  res.json({user, guest})
})

router.put('/noparticipation', async function(req, res, next) {

  try {
    await GuestModel.updateOne(
        {token: req.body.token, 
          users : {$elemMatch: {_id: req.body.user._id}}
        },
        { $set: { 
          "users.$.isAttending" : 0,
          'users.$.sleep': req.body.sleep, 
          "users.$.breakfast": null,
          "users.$.alcoolLiked": [],
          "users.$.drink": null,
          'users.$.songs': [],
          "users.$.comment": null
        } 
      }
    )
  
    if (req.body.carpoolingDelete == true) {
      await GuestModel.updateOne(
        {token: req.body.token},
        {carpooling: []}
      )
    }
    res.json({result:true})
  } catch(error) {
    console.log(error);
    res.json({result: false})
  }
})

router.put('/participation', async function(req, res, next) {
  await GuestModel.updateOne(
      {token: req.body.token, 
        users : {$elemMatch: {_id: req.body.user._id}}
      },
      { $set: { 
        "users.$.isAttending" : 1, 
        'users.$.sleep': req.body.sleep, 
        "users.$.breakfast": req.body.brunch,
        "users.$.alcoolLiked": req.body.drinks,
        "users.$.drink": req.body.alcool,
        'users.$.songs': req.body.songs,
        "users.$.comment": req.body.comment
      }}
  )
  res.json({result:true})
})

router.get('/allGuests', async function(req, res, next) {
  var guests = await GuestModel.find();
  res.json(guests);
})

router.post('/uploadPics/:token', async function(req, res, next) {

  var pic = uniqid()+'.jpeg';
  await req.files.pic.mv(pic);
  var resultCloudinary = await cloudinary.uploader.upload(pic);
  fs.unlinkSync(pic);
 
  await GuestModel.updateOne(
    {token: req.params.token},
      { 
        $push: {pictures: {url: resultCloudinary.url, publicId: resultCloudinary.public_id}},
    }
  );

  const newGuest = await GuestModel.findOne({token: req.params.token})
  const pictures = newGuest.pictures 
  res.json(pictures);
})

router.put('/deletePic', async function(req, res, next) {
  
  if (req.body.picture.publicId != 'bnsf6xsynfa7x6tsg796') {
    await cloudinary.uploader.destroy(req.body.picture.publicId);
  }
  
  await GuestModel.updateOne(
    {token: req.body.token},
    {$pull: {pictures: {_id : req.body.picture._id}}}
  );

  res.json({result: true})
})

router.post('/saveAccomodation', async function(req, res, next) {
  var newAccomodation = new AccomodationModel({
    name: req.body.name,
    adresse: req.body.adress,
    url: req.body.url,
    phoneNumber: req.body.phoneNumber,
    category: req.body.category
  })
  await newAccomodation.save();
  res.json({result: true});
})

router.get('/getAccomodations', async function(req, res, next) {
  var accomodations = await AccomodationModel.find();
  res.json(accomodations);
})

router.delete('/deleteAccomodation', async function(req, res, next) {
  await AccomodationModel.deleteOne(
    {_id: req.body.id}
  )
  res.json({result: true})
})

router.put('/updateAccomodation', async function(req, res, next) {
  await AccomodationModel.updateOne(
    {_id: req.body.id},{
      name: req.body.name,
      adresse: req.body.adress,
      url: req.body.url,
      phoneNumber: req.body.phoneNumber,
      category: req.body.category
    }
  )
  res.json({result: true})
})

router.put('/saveCarpooling', async function(req, res, next) {
  try {
    await GuestModel.updateOne(
      {token: req.body.token},
      { 
        $push: {carpooling: [{
          offerSeats: req.body.offerSeats,
          searchSeats: req.body.searchSeats,
          from: req.body.from,
          phoneNumber: req.body.phoneNumber,
        }]},
      }
    )
    res.json({result:true})
  } catch(error) {
    res.json({result: false})
  }
})

router.put('/updateCarpooling', async function(req, res, next) {
  try {
    await GuestModel.updateOne(
      {token: req.body.guestToken,
        carpooling : {$elemMatch: {_id: req.body.carpoolingId}}
      },
      {$set: {
        "carpooling.$.offerSeats": req.body.offerSeats,
        "carpooling.$.searchSeats": req.body.searchSeats,
        "carpooling.$.from": req.body.from,
        "carpooling.$.phoneNumber": req.body.phoneNumber,
      }}
    )


    res.json({result: true})
  } catch(error) {
    console.log(error);
    res.json({result:false})
  }
})

router.delete('/deleteCarpooling', async function(req, res, next) {
  try {
    await GuestModel.updateOne(
      {token: req.body.guestToken},
      { $pull: { carpooling: {_id : req.body.carpoolingId}} }
    )
    res.json({result: true});
  } catch(error) {
    console.log(error);
    res.json({result: false});
  } 
})

router.get('/getCarpooling', async function(req, res, next) {
  var guests = await GuestModel.find();
  var offers = [];
  var searchs = [];

  guests.forEach( function(guest) {
    var name= [];
    guest.users.forEach( function(user) {
      if (user.isAttending == 1) {
        name.push(user.firstName);
      }
    })
    if (guest.carpooling.length > 0) {
      guest.carpooling.forEach( function(carpooling) {
        if (carpooling.offerSeats > 0) {
          var offer = {name: name, seats: carpooling.offerSeats, from: carpooling.from, phoneNumber: carpooling.phoneNumber, token: guest.token, id: carpooling.id}
          offers.push(offer)
        } else if (carpooling.searchSeats > 0) {
          var search = {name: name, seats: carpooling.searchSeats, from: carpooling.from, phoneNumber: carpooling.phoneNumber, token: guest.token, id: carpooling.id}
          searchs.push(search)
        }
    })}
  })


  res.json({offers: offers, searchs: searchs});
})

router.post('/uploadWeddingPics/:token', async function(req, res, next) {

  var pic = uniqid()+'.jpg'
  await req.files.pic.mv(pic);
  var resultCloudinary = await cloudinary.uploader.upload(pic);
  fs.unlinkSync(pic);


  await GuestModel.updateOne(
    {token: req.params.token},
      { 
        $push: {weedingPictures: {url: resultCloudinary.url, date: Date.now(), publicId: resultCloudinary.public_id}}
    }
  );
  
  res.json({result: true});
})

router.get('/allWeddingPictures', async function(req, res, next) {
  var pictures = [];
  var guests = await GuestModel.find();

  guests.forEach(function(guest) {
    guest.weedingPictures.forEach(function(pic) {
        pictures.push({guest: guest, url: pic.url, date: pic.date, id: pic.id, publicId: pic.publicId});
      })
  })
  
  pictures.sort(function(a, b) {
    return b.date - a.date
  });

  res.json(pictures);
})

router.delete('/deleteWeddingPicture', async function(req, res, next) {

  await cloudinary.uploader.destroy(req.body.picture.publicId, function(error,result) {
    console.log(result, error) });

  await GuestModel.updateOne(
    {token: req.body.token},
    { $pull: { weedingPictures: {_id : req.body.picture.id}} }
  );

  res.json({result: true});
})

module.exports = router;
