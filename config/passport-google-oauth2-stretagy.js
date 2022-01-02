const passport = require('passport');
const googleStretagy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

// tell passport to use new stretagy for google login
passport.use(new googleStretagy({
        clientID: "931976645896-qtl9b6bsdprd48p54k494l6l3btu2lfb.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        // find a user 
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("Error in google streytagy passport", err);
                return;
            }
            
            console.log(profile);
            // if found set this user as req.uset
            if(user){
                return done(null, user);
            
            // if not found, create the user and set i as req.user
            }else{
                User.create({
                    name: profile.dispalyName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log("Error in creating user", err);
                        return;
                    }
                    return done(null, user);
                    
                })
            }
        })
    }
));



module.exports = passport;

// client id    931976645896-qtl9b6bsdprd48p54k494l6l3btu2lfb.apps.googleusercontent.com
// client secret    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