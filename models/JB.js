var mongoose = require("mongoose");

var JBSchema = new mongoose.Schema({
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer"
    },
    description: String,
    startTime:Date,
    finishTime:Date,
    historyPrice:[
        {
            seller:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            price: Number
        }
    ],
    quantity: Number
});

module.exports = mongoose.model("JB", JBSchema);