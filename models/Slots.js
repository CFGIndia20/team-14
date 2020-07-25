const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
    Teacher : String,
    Students: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
     },
    Time : Date,
})
const Slot = mongoose.model('Slot', SlotSchema);

module.exports = module.exports = Ninja;