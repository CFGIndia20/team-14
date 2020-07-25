const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
    Teacher : String,
    Students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
     }],
    Time : Number,
    Level : String,
})

const UnallocatedSchema = new Schema({
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

const Slot = mongoose.model('Slot', SlotSchema);

module.exports = module.exports = Slot;