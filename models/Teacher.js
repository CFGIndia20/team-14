const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Teacher = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  password: {
    type: String,
  },
  slot: {
    type: String,
    required: true,
  },
});

Teacher.plugin(passportLocalMongoose);

module.exports = mongoose.model("Teacher", Teacher);