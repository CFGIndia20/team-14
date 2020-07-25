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
    },
    Time : Number,
    Level : String,
});

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
        type : Number
    },
    Progress : {
        type : Number
    },
    
    slot: SlotSchema

});

const Ninja = mongoose.model('ninja', RunningSchema);

module.exports = Ninja;