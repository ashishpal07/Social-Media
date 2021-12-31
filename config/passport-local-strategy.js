const passport = require('passport');

const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        // find the user and stablish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password != password){
                req.flash('error', 'Invalid username/password');
                return done(null, false);   // err is null and authentication is false
            }

            return done(null, user);
        });
    }
));

// seralizing the user to decide which key is kept into the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// de-serializing the user form the key in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.lig("Error in finding use --> Passport");
            return done(err);
        }
        return done(null, user);
    });
});

// if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is sign-in then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not sign-in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current sign in user from the session cookie ans we are just
        // sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;