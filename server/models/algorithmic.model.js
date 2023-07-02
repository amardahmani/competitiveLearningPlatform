import mongoose from "mongoose";

const AlgorithmicSchema = mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    input:{
        type:String,
    },
    expectedOutput: {
        type:String,
    },
    points: {
        type:Number,
    },
    difficulty: {
        type:String
    },
    tags:[{
        type:String
    }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
})

const Algorithmic = mongoose.model("Algorithmic",AlgorithmicSchema);
export default Algorithmic;