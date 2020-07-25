import mongoose from 'mongoose';
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AdminSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  password: String,
});

AdminSchema.plugin(passportLocalMongoose);

export const Admins = mongoose.model('Admins', AdminSchema);