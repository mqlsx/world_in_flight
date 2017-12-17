var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get("/register", function(req, res){
    res.render("register");
});


//handle sign up logic
router.post("/register", function(req, res){
    // var newUser = new User({username: req.body.username});
    // User.register(newUser, req.body.password, function(err, user){
    //     if(err){
    //         req.flash("error", err.message);
    //         res.redirect("back");
    //     } else {
    //         passport.authenticate("local")(req, res, function(){
    //             req.flash("success", "Welcome to YelpCamp" + user.username);
    //             res.redirect("/campgrounds");
    //         });
    //     }
    // });
    res.render("register");
});