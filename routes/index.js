var express = require("express");
var router = express.Router();
var passport = require("passport");
var buyerUser = require("../models/Buyer");
var sellerUser = require("../models/Seller");



router.get("/", function(req, res){
    res.render("shop/index");
});

router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    if(req.body.isBuyer){
        var newUser = new buyerUser({username: req.body.username, email: req.body.email});
        buyerUser.register(newUser, req.body.password, function(err, user){
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                passport.authenticate("local")(req, res, function(){
                    req.flash("success", "Welcome to YelpCamp" + user.username);
                    res.redirect("/campgrounds");
                });
            }
        });
    }else{
        var newUser = new sellerUser({username: req.body.username, email: req.body.email});
        sellerUser.register(newUser, req.body.password, function(err, user){
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                passport.authenticate("local")(req, res, function(){
                    req.flash("success", "Welcome to YelpCamp" + user.username);
                    res.redirect("/campgrounds");
                });
            }
        });
    }
});


router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

router.get("/about", function (req, res) {
    res.render("shop/shop-about");
})

router.get("/faq", function (req, res) {
    res.render("shop/shop-faq");
})
router.get("/privacy-policy", function (req, res) {
    res.render("shop/shop-privacy-policy");
})
router.get("/terms-conditions", function (req, res) {
    res.render("shop/shop-terms-conditions-page");
})


module.exports = router;