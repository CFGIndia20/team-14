import mongoose from 'mongoose';
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const StudentSchema = new Schema({
  id: ObjectId,
  name: String,
  dob: Date,
  dateOfJoining: Date,
  qualification: String,
  gradYear: String,
  phone: String,
  email: String,
  password: String,
  experience: String,
  quizLink: String,
  apptScore: Number,
  skillScore: Number,
  avgTestScore: Number,
  jobId: ObjectId,
  poll_engagement: Number,
  poll_Total: Number,
  present: Number,
  attendance: Number,
});

StudentSchema.plugin(passportLocalMongoose);

export const Students = mongoose.model('Students', StudentSchema);