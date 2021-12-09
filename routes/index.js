const express = require('express');

// call router
const router = express.Router();

// access the home controller
const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);

router.use('/users', require('./users'));

// for any further routes excess from here
// router.use('/routername', require('./routerfile'));

console.log('router loaded!');
module.exports = router;