const User = require('../models/user');

module.exports.profile = function(req, res){
    // console.log()
    return res.render('users', {
        title: "Profile",
        // user: req.body,
    });
};


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};


// get the sign up data
module.exports.create = function(req, res){

    // check pass and conf_pass of user
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    // then above entering user and pass will search in database
    // if not find any user with the details providing above
    // we have to create that user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("error while finding user singing up");
            return;        
        }
        // if user is not exist then insert into database
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log("error while creating user");
                    return;
                }
                return res.redirect('/users/sign-in/');
            })
        }else{
            return res.redirect('back');
        }
    })

} 

// sign in and create a session for user
module.exports.createSession = function(req, res){
    return res.redirect('/');
} 


module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}