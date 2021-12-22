const Post = require('../models/post');


// controller function home
module.exports.home = function(req, res){
    
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title : "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts){

        if(err){
            console.log("Error while populating", err);
            return;
        }
        console.log(posts);
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });

    });
    
    

    // populate the user of each posts
    // Post.find({}).populate('user').exec(function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

};








