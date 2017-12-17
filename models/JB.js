var mongoose = require("mongoose");

var JBSchema = new mongoose.Schema({
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer"
    },
    description: String,
    startTime:Date,
    finishTime:Number,
    historyPrice:[
        {
            seller:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Seller"
            },
            price: Number
        }
    ],
    quantity: Number
});

module.exports = mongoose.model("JB", JBSchema);