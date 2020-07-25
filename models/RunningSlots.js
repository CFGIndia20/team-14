const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema
const SlotSchema = new Schema({
    Teacher: {
        type: String,
        default: 'Point'
    },
    Students: {
        type: [Number],
        index: '2dsphere'
    }
});

// create ninja Schema & model
const RunningSchema = new Schema({
    TeacherAllocated: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Teacher"
        }
     ],
     StudentAllocated: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Student"
        }
     ],
    Level: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    Time : {
        type : Date
    },
    slot: SlotSchema
});

const Ninja = mongoose.model('ninja', RunningSchema);

module.exports = Ninja;