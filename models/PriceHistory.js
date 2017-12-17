var mongoose = require("mongoose");

var HistorySchema = new mongoose.Schema({
    history: [
        {
            price: Number,
            data: Date,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        }
    ]
});

module.exports = mongoose.model("PriceHistory", HistorySchema);