var mongoose = require("mongoose");

var AuctionSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    classfication: String,
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    startTime:Date,
    finishTime:Date,
    startPrice: Number,
    currentPrice: Number,
    historyPrice:[
        {
            buyer:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            price: Number
        }
    ],
});

module.exports = mongoose.model("Auction", AuctionSchema);