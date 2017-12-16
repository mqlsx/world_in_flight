var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {name: "Pickwick Dam Campground", 
    image: "http://pickwick-dam.com/wp-content/uploads/2015/08/17991101764_fcb19c7311_k.jpg",
    description: "This is a greate campground!"    
    },
    
    {name: "crystall river", 
    image: "http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg",
    description: "A beautiful place!"
    }
    
]



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