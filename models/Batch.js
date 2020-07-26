const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BatchSchema = new Schema({
  Teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    default: null,
  },
  Students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
<<<<<<< HEAD
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
const Batch = mongoose.model('Batch', BatchSchema);
=======
  ],
  Time: {
    type: Number,
    default: null,
  },
  level: {
    type: String,
  },
});
const Batch = mongoose.model("Batch", BatchSchema);
>>>>>>> 696937564084582b9786cce8d15640c0324062c5

module.exports = module.exports = Batch;
