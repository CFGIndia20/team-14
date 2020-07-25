const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
  username: {
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
  qualification: {
    type: [String],
    // required: [true, "Qualification is required"],
    default: "",
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
  email: {
    type: String,
    // required: [true, "Email is required"],
    default: "",
  },
  TimePref: {
    type: Date,
    timestamps: true,
    default: Date.now,
  },
  experience: {
    type: [String],
    default: "",
  },
  AdmissionQuiz: {
    type: Number,
    default: 0,
  },
  BaselineTest: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
});

Student.plugin(passportLocalMongoose);

module.exports = mongoose.model("Student", Student);
