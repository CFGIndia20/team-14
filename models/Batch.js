const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BatchSchema = new Schema({
    Teacher : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Teacher",
        default:null
    },
    Students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        default:null
     }],
    Time :{
        type : Number,
        default:null
    },
    level : {
        type:String
    }
})
const Batch = mongoose.model('Bacth', BatchSchema);

module.exports = module.exports = Batch;