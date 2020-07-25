import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const JobSchema = new Schema({
  id: ObjectId,
  company: String,
  details: String,
  jobTitle: String,
  jobAnnouncementDate: Date,
});

export const Jobs = mongoose.model('Jobs', JobSchema);