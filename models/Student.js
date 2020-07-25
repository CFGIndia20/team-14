const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    dob : {
        type: Date,
        required: [true, 'D.O.B is required']
    },
    qualification : {
        type: [String],
        required: [true, 'Qualification is required']
    },
    grad_date: {
        type: Date
    },
    phone : {
        type:String,
        required: [true, 'Phone is required']
    },
    email : {
        type:String,
        required: [true, 'Email is required']
    },
    TimePref : {
        type: Date,
        timestamps: true
    },
    experience : {
        type : [String],
    },
    AdmissionQuiz : {
        type: Number,
    },
    BaselineTest : {
        type : Number
    }
});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;