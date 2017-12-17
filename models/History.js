var mongoose = require("mongoose");

var HistorySchema = new mongoose.Schema({
    History:[
        {
            time: {type: Date, default: Date.now},
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            buyer:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            quantity: Number,
            price: Number,
            comment: String
        }
    
    ]
});

module.exports = mongoose.model("History", HistorySchema);