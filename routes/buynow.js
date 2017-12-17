var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var Product = require("../models/Products");
var User = require("../models/User");
var middleware = require("../middleware/index");
var History = require("../models/History");
var HistoryPrice = require("../models/PriceHistory");



router.get("/", function(req, res){
    res.render("shop/shop-product-list");
});


// middleware.isSeller, 
router.get("/new", middleware.isSeller, function(req, res){
    res.render("shop/shop-new-product");
});

router.post("/", middleware.isSeller, function(req, res){
    console.log("new product");
    // get data from form and add to picture array
    var name = req.body.name;
    var description = req.body.description;
    var image = req.body.image;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var seller = req.user._id;
    var classification = req.body.classification;
    var newProduct = {isDelete: false, name: name, description: description, image: image, price:price, quantity:quantity, seller:seller, classification:classification}
    // Create a new picture and save to DB
    Product.create(newProduct, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to pictures page
            console.log(newlyCreated);
            res.redirect("/");
            // res.redirect("/" + newProduct._id);
        }
    });
});

router.get("/:id",function(req,res){
    console.log("productId");
    Product.findById(req.params.id).populate(["historyPrice"]).exec(function(err, foundProduct){
        console.log("productId1");
        if(err || !foundProduct){
            console.log("productId2");
            console.log(err);
            req.flash('error', 'Sorry, This product does not exist!');
            return res.redirect('/index');
        } else {
            console.log("productId3");
            User.findById(foundProduct.seller,function(err, foundSeller){
                if(err){
                    console.log(err);
                }else{
                    console.log("productId4");
                    res.render("shop/show",{product:foundProduct, seller:foundSeller})
                }
            });
        }
    });
})






// DESTROY THE PRODUCT
router.delete("/:id",middleware.checkProductOwnership, function(req, res){
   Product.findById(req.params.id, function(err, foundProduct){
      if(err){
          res.redirect("/index");
      } else {
          foundProduct.isDelete=true;
          req.flash("success","Product has been deleted sucessfully!");
          res.redirect("/index");
      }
   });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkProductOwnership, function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            req.flash("error","Product not found!");
            res.redirect("/index");
        }
        res.render("buynow/edit", {product: foundProduct});
    });
});

// UPDATE ROUTE
router.put("/:id/edit",middleware.checkProductOwnership, function(req, res){
    // find and update the correcurrentct campground
    Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct){
       if(err){
           res.redirect("/");
       } else {
           //redirect somewhere(show page)
           res.redirect("/" + req.params.id);
       }
    });
});

// Buy Route
router.get("/:id/pay", middleware.isBuyer, function(req, res){
    Product.findById(req.param.id, function(err, foundProduct){
        if(err){
            req.flash("error","Product not found!");
            res.redirect("/index");
        }
        res.render("buynow/pay",{product: foundProduct});
    })
})

// Buy Update
router.put("/:id/pay",middleware.isBuyer,function(req,res){
    Product.findById(req.param.id, function(err, foundProduct){
        if(err){
            req.flash("error","Product not found!");
            res.redirect("/index");
        }else{
            var history = new {product:foundProduct._id, buyer:req.user._id, quantity:foundProduct.quantity, price:foundProduct.price};
            foundProduct.quantity = 0;
            History.create(history,function(err,newlyHistory){
                newlyHistory.save();
                User.history.push(newlyHistory);
                User.save();
            })
        }
    })
})


module.exports = router;