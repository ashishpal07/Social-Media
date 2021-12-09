const express = require('express');

// call router
const router = express.Router();

// access the home controller
const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);



console.log('router loaded!');
module.exports = router;