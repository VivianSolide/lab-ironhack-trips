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

router.get('/my-trips', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('trips/index', {

  });
});

router.get('/my-trips/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('trips/new', {

  });
});

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

module.exports = router;