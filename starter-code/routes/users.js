const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/my-trips', (req, res, next) => {
  res.render('my-trips', {
    
  });
});

module.exports = router;