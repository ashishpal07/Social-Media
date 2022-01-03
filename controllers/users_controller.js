const User = require('../models/user');
const path = require('path');
const fs = require('fs');

module.exports.profile = function(req, res){
    
    User.findById(req.params.id, function(err, user){

        return res.render('users', {
            title: "User | Profile",
            profile_user: user
        });
    });
    
};

module.exports.update = async function(req, res){

    if(req.user.id == req.params.id){

        try{
            // find the user
            let user = await User.findById(req.params.id)
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('********multer Error : ', err);
                    // return;
                }
                // console.log(req.avatar);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname , '..', user.avatar));
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    // console.log("hi = ", user.avatar);
                }
                user.save();
                // console.log("Done Uploading!");
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }

    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}


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
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    // then above entering user and pass will search in database
    // if not find any user with the details providing above
    // we have to create that user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            req.flash('error', err);
            return;        
        }
        // if user is not exist then insert into database
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    req.flash('error', err);
                    return;
                }
                return res.redirect('/users/sign-in/');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    })

} 

// sign in and create a session for user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
} 


module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Logged Out Successfully!');
    return res.redirect('/');
}