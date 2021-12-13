const express = require('express');
const router = express.Router();

// access route function
const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile); 
// router.post('/profile', usersController.profile); 

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


module.exports = router;