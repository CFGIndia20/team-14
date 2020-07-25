const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
  name: {
    type: String,
    // required: [true, "Name field is required"],
  },
  password: {
    type: String,
  },
  dob: {
    type: Date,
    // required: [true, "D.O.B is required"],
    default: "",
  },
  ssc: {
    type: String,
    // required: [true, "Qualification is required"],
    default: null,
  },
  hsc: {
    type: String,
    // required: [true, "Qualification is required"],
    default: null,
  },
  grad_date: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
    // required: [true, "Phone is required"],
    default: "",
  },
  username: {
    type: String,
    // required: [true, "Email is required"],
    default: "",
  },
  timePref: {
    type: Date,
    timestamps: true,
    default: Date.now,
  },
  experience: {
    type: [String],
    default: "",
  },
  admissionQuiz: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
  batch: {
    type: String,
    default: "",
  },
  level: {
    type: String,
    default: "",
  },
});

Student.plugin(passportLocalMongoose);

module.exports = mongoose.model("Student", Student);
