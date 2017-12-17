var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");




function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Remove campground!");
        }
    });
    
    
   // Add data
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err) {
                console.log(err);
            }
            else {
                console.log("added a campground");
                
                Comment.create(
                    {
                      text: "This place is great!",
                      author: "Homer"
                    }, function(err, comment){
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                        }
                    });
            }
        });
    });

};




module.exports = seedDB;