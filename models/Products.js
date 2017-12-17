var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    quantity: Number,
    historyPrice:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PriceHistory"
        }
    ],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller"
    },
    classification:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classfication"
    }
});

module.exports = mongoose.model("Product", ProductSchema);