const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Quiz = new mongoose.Schema({
  questions: {
    type: [String],
  },
  answers: {
    type: [String],
  },
  batch: {
    type: String,
  },
});

module.exports = mongoose.model("Quiz", Quiz);
