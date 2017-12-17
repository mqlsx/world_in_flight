var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var BuyerSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isSeller: Boolean,
    // type stores membership level directly
    membership: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Membership"
        },
        type: String
    },
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "History"
        }
    ],
    reputation: Number,
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    cart: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "History"
        }
    ],
    Products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

BuyerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", BuyerSchema);
