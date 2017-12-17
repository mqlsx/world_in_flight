var mongoose = require("mongoose");

var HistorySchema = new mongoose.Schema({
    History:[
        {
            time: Date,
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            buyer:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Buyer"
            },
            quantity: Number,
            price: Number
        }
    
    ]
});

module.exports = mongoose.model("History", HistorySchema);