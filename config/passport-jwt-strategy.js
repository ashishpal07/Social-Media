const passport = require('passport');
// const JwtStrategy = require('passport-jwt/lib/strategy');
const JWTStrategy = require('passport-Jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial',
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done) {
    User.findById(jwtPayload._id, function(err, user){
        if(err){
            console.log("Error in finding user from jwt");
            return;
        }else if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));


module.exports = passport;