const express = require('express');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const multer = require('multer');
var upload = multer({
  dest: './public/uploads/'
});

const User = require('../models/user.js');
const Trip = require('../models/trip.js');

router.get('/', (req, res, next) => {
  res.render('index');
});

// GET	/my-trips	views/trips/index.ejs	List with all the trips
router.get('/my-trips', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Trip.find({}, (err, trips) => {
    if (err) {
      console.error(err);
    }
    res.render('trips/index', {
      trips,
    });
  });
});

// GET	/my-trips/new	views/trips/new.ejs	New form
router.get('/my-trips/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('trips/new', {

  });
});

// POST	/my-trips/new
router.post('/my-trips/new', ensureLogin.ensureLoggedIn(), upload.single('photo'), (req, res, next) => {
  const trip = new Trip({
    user_id: req.user.id,
    user_name: req.user.name,
    destination: req.body.destination,
    description: req.body.description,
    pic_path: `uploads/${req.file.filename}`,
  });
  trip.save(err => {
    res.redirect('/my-trips/new');
  });
});

// GET	/my-trips/edit/:trip_id	views/trips/edit.ejs	Edit form
router.get('/my-trips/edit/:trip_id', (req, res, next) => {
  let id = req.params.trip_id;
  Trip.findById(id, (err, trip) => {
    if (err) {
      console.error(err);
    }
    res.render('trips/edit', {
      trip,
    });
  });
});

// POST	/my-trips/edit/:trip_id	views/trips/edit.ejs	Update informations
router.post('/my-trips/edit/:trip_id', (req, res, next) => {
  let id = req.params.trip_id;
  Trip.findByIdAndUpdate(id, {
    destination: req.body.destination,
    description: req.body.description,
  }, (err, trips) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/my-trips');
  });
});

// POST	/my-trips/delete/:trip_id Dete trip
router.get('/my-trips/delete/:trip_id', (req, res, next) => {
  let id = req.params.trip_id;
  Trip.findByIdAndRemove({
    _id: id
  }, (err, trips) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/my-trips');
  })
});

module.exports = router;