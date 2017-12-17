var mongoose = require("mongoose");

var AuctionSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    startTime:Date,
    finishTime:Date,
    historyPrice:[
        {
            buyer:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Buyer"
            },
            price: Number
        }
    ],
    quantity: Number
});

module.exports = mongoose.model("Auction", AuctionSchema);