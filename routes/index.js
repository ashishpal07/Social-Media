const express = require('express');

// call router
const router = express.Router();

// access the home controller
const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);

router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

router.use('/comments', require('./comments'));


router.use('/api', require('./api'));

// router.use('/api', require('./api'));

// for any further routes excess from here
// router.use('/routername', require('./routerfile'));
module.exports = router;