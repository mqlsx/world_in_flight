var Product = require("../models/Products");
// var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

// middlewareObj.checkCommentOwnership = function(req, res, next) {
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//             if(err || !foundComment){
//                 req.flash("error", "Campground not found");
//                 console.log(err);
//             } else {
//                 if(foundComment.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     req.flash("error", "You don't have permission to do that");
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         req.flash("error", "You need to be logged in to do that");
//         res.redirect("back");
//     }
// }

// middlewareObj.checkCampgroundOwnership = function(req, res, next) {
//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id, function(err, foundCampground){
//             if(err || !foundCampground){
//                 console.log(err);
//             } else {
//                 if(foundCampground.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     req.flash("error", "You don't have permission to do that");
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         req.flash("error", "You need to be logged in to do that");
//         res.redirect("back");
//     }
// }

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

middlewareObj.checkProductOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Product.findById(req.params.id, function(err, foundProduct){
            if(err || !foundProduct){
                console.log(err);
            } else {
                if(foundProduct.seller.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        })
    }
}

middlewareObj.isSeller = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.isSeller == true){
            return next();
        }
        req.flash("error", "Sorry, you neesd to login with a seller acount!")
    }else{
        req.flash("error", "Sorry, you need to login first!")
    }
    return res.redirect("/");
}

middlewareObj.isBuyer = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.isSeller == false){
            return next();
        }
        req.flash("error", "Sorry, you neesd to login with a buyer acount!")
    }else{
        req.flash("error", "Sorry, you need to login first!")
    }
}

module.exports = middlewareObj;




