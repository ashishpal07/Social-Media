module.exports.index = function(req, res){
    return res.json(200, {
        message: "List Of Posts 2",
        posts: []
    });
}