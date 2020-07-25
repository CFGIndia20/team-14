const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Admin = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    default: "",
  },
  
});

Admin.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", Admin);
