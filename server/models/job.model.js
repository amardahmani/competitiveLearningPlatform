import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title: {
        type:String
    },
    description: {
        type: String
    },
    country: {
        type: String
    },
    positions: {
        type: String
    },
    poster: {
        type: String
    },
    duration:{
        type:Number
    },
    creator: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    algorithmicQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Algorithmic' }],
    submissions:[{type:mongoose.Schema.Types.ObjectId, ref:'Submission'}],
    participants:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    problemSetters:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]

})

const Job = mongoose.model('Job',jobSchema);

export default Job;