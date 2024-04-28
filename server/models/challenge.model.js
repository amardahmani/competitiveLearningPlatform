import mongoose from "mongoose";

const ChallengeSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    duration:{
        type:String,
    },
    poster:{
        type:String,
    },
    type: { type: String, enum: ['HACKATHON', 'ALGORITHMIC'], required: true },
    creator: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    algorithmicQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Algorithmic' }],
    hackathonQuestions:[{type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon'}],
    participants:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    submissions:[{type:mongoose.Schema.Types.ObjectId, ref:'Submission'}],
    problemSetters:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
})

const Challenge = mongoose.model("Challenge",ChallengeSchema);
export default Challenge;