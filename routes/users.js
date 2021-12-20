const express = require('express');
const router = express.Router();
const passport = require('passport');

// access route function
const usersController = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile); 
// router.post('/profile', usersController.profile); 

router.post('/create', usersController.create);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

// use passport as a mddleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession)

router.get('/sign-out', usersController.destroySession)

module.exports = router;