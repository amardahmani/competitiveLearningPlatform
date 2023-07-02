import mongoose from "mongoose";

const GamifiedTutorialSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    creator:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
})

const GamifiedTutorial = mongoose.model("GamifiedTutorial",GamifiedTutorialSchema);

export default GamifiedTutorial;