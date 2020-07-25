import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const JobSchema = new Schema({
  id: ObjectId,
  Company: String,
  Title: String,
  jobCategory: String,
  jobDescription: String,
  salary: String,
  location: String,
  positon: String,
  experience: String,
});

export const Jobs = mongoose.model('Jobs', JobSchema);