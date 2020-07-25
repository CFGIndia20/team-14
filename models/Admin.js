const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Admin = new mongoose.Schema({
  password: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  category: {
    type: String,
  },
});

Admin.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", Admin);
