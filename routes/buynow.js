var express = require("express");
var router = express.Router();
var passport = require("passport");
var Product = require("../models/Products");
var Seller = require("../models/Seller");
var Buyer = require("../models/Buyer");
var Class = require("../models/Class");

router.get("/buynow/index", function(req, res){
    res.render("buynow/index");
});

router.get("/buynow/show/:id",function(req,res){
    Product.findById(req.params.id).populate(["historyPrice"]).exec(function(err, foundProduct){
        if(err || !foundProduct){
            console.log(err);
            req.flash('error', 'Sorry, This product does not exist!');
            return res.redirect('/buynow/index');
        } else {
            Seller.findById(foundProduct.seller,function(err, foundSeller){
                Class.findById(foundProduct.classification,function(err, foundClass){
                    res.render("buynow/show",{product:foundProduct, seller:foundSeller, classification:foundClass});
                })
            });
        }
    });
})



module.exports = router;