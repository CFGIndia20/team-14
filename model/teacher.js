import mongoose from 'mongoose';
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TeacherSchema = new Schema({
  id: ObjectId,
  name: String,
  phone: String,
  email: String,
  password: String,
  qualification: String,
  experience: String,
  slot1: String,
  slot2: String,
  slot3: String,
  slot4: String,
  slotProgress1: Number,
  slotProgress2: Number,
  slotProgress3: Number,
  slotProgress4: Number,
  slotCancelled: Number,
  workload: String,
});

TeacherSchema.plugin(passportLocalMongoose);

export const Teachers = mongoose.model('Teachers', TeacherSchema);