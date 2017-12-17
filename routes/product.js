var express = require("express");
var router = express.Router();
var Product = require("../models/product");


router.get("/:id", function(req, res) {
   Product.findById(req.params.id)
});

// id
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

module.exports = router;