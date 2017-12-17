var express = require("express");
var router = express.Router();
var passport = require("passport")

router.get("/", function(req, res){
    console.log("login");
    res.render("login");
});

router.post("/", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});


module.exports = router;