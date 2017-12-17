var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var SellerSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "History"
        }
    ],
    reputation: Number,
    Products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

SellerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Seller", SellerSchema);