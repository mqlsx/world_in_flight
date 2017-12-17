var mongoose = require("mongoose");

var MemberSchema = new mongoose.Schema({
    Golden: "Golden",
    Silver: "Silver",
    Normal: "Normal"
});

module.exports = mongoose.model("MemberShip", MemberSchema);