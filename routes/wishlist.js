var express = require("express");
var router = express.Router();
var passport = require("passport");


router.get("/", function (req, res) {
    console.log("wishlist");
    var items = [
        {
            image: "/assets/pages/img/cart-img.jpg",
            quantity: 3,
            price: 121,
            owner: "bin",
            description:"Cool green dress with red bell"
        }, {
            image: "/assets/pages/img/cart-img.jpg",
            quantity: 3,
            price: 121,
            owner: "bin",
            description:"Cool green dress with red bell"
        }, {
            image: "/assets/pages/img/cart-img.jpg",
            quantity: 3,
            price: 121,
            owner: "bin",
            description:"Cool green dress with red bell"
        }
    ];
    var items_value = 0;
    items.forEach(function (t) {
        items_value += t.price;
    })
    res.render("shop/shop-wishlist", {
        items: items,
        items_count: items.length,
        items_value: items_value
    });
});

module.exports = router;