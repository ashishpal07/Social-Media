const User = require('../models/user');

module.exports.profile = function(req, res){
    // return res.render('users', {
    //     title: "Profile"
    // });
    if(req.cookies.user_id){
        console.log("hi", req.cookies.user_id);
        User.findById(req.cookies.user_id, function(err, user){
            console.log(user);
            if(user){
                return res.render('users', {
                    title: "user-profile",
                    user: user,
                });
            }else{
            return res.redirect('/users/sign-in');
            }
        });
    }else{
        return res.redirect('/users/sign-in');
    }
};


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};


// render the sign in page
module.exports.signIn = function(req, res){
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
    // found the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("error in finding user in singing in");
            return;
        }

        //  handle user found
        if(user){
            if(req.body.password != user.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        }else{ // handle user nit found
            return res.redirect('back');
        }
    });

} 
