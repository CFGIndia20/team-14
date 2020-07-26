const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title : {
        type: String,
        default:""
    },
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
    },
    category : {
        type : String,
        default : "Non Categorised"
    },
    applicants : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        default: null,
    }],
    allocatedTo : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        default: null,
    }
})

const Job = mongoose.model('Job', JobSchema);

module.exports = module.exports = Job;