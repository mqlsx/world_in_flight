var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/User");


router.get("/", function (req, res) {
    res.render("shop/index");
});

router.get("/register", function (req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({username: req.body.username, email: req.body.email});
    if (!req.body.isSeller) newUser.isSeller = false;
    else newUser.isSeller = true;
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success", "Welcome to YelpCamp" + user.username);
                res.redirect("/");
            });
        }
    });

});


router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function (req, res) {
});

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

router.get("/about", function (req, res) {
    res.render("shop/shop-about");
});

router.get("/faq", function (req, res) {
    res.render("shop/shop-faq");
});
router.get("/privacy-policy", function (req, res) {
    res.render("shop/shop-privacy-policy");
});
router.get("/terms-conditions", function (req, res) {
    res.render("shop/shop-terms-conditions-page");
});

module.exports = router;


