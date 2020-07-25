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
<<<<<<< HEAD
  
=======
  category: {
    type: String,
  },
>>>>>>> b06a55c281303557d72e398b4e82679a0a4aea7c
});

Admin.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", Admin);
