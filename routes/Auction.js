var express = require("express");
var router = express.Router({mergeParams: true});
var Auction = require("../models/auction");

var middleware = require("../middleware");

// campgrounds
router.get("/", function(req, res){
    Auction.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("shop/auction-list",{auction:allAuctions});
        }
    })
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("shop/new-auction");
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: description, author:author};

    Campground.create(newCampground, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log(campground.name);
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// id
router.get("/:id", function(req, res) {
    Auction.findById(req.params.id).populate("comments").exec(function(err, auction) {
        if (err) {
            console.log(err);
            auction = {
                title:"item title",
                finishTime: "2017/12/18 10:00:00",
                classfication: "part",
                startTime:new Date(),
                startPrice: 123,
                currentPrice: 246,
                maxPrice:250,
                historyPrice:[
                    {
                        buyer: "bin",
                        price: 135
                    },{
                        buyer: "bin2",
                        price: 157
                    }
                ]
            };
            res.render("shop/show-auction", {item: auction});
        } else {
            res.render("shop/show-auction", {item: auction});
        }
    });
});


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",  function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

module.exports = router;
