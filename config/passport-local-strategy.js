const passport = require('passport');

const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    function(email, password, done){
        // find the user and stablish the identity
    }
));