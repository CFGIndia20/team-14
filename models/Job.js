const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    Organisation : {
        type: String,
        default : ""
    },
    compensation : {
        type : String,
        default : ""
    },
    skills : {
        type : [String],
        default : []
    }
})

const Job = mongoose.model('Job', JobSchema);

module.exports = module.exports = Job;