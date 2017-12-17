var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    isDelete: Boolean,
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
        ref: "User"
    },
    classification: String
});

module.exports = mongoose.model("Product", ProductSchema);