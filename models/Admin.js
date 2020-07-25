var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var AdminSchema = new mongoose.Schema({
    category : String,
    email    : String,
    password : String,
});
userSchema.plugin(passportLocalMongoose, {usernameField : "email"});
module.exports = mongoose.model("User",AdminSchema);