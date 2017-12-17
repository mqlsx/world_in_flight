var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/User");


router.get("/", function(req, res){
    res.render("shop/shop-account");
});


module.exports = router;


