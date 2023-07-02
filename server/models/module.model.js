import mongoose from "mongoose";

const ModuleSchema = mongoose.Schema({
    title:{
        type: String,
    },
    description: {
        type:String,
    },
    image: {
        type:String
    },
    tutorials: {type: mongoose.Schema.Types.ObjectId, ref: 'GamifiedCourse'},
    problems:[{type: mongoose.Schema.Types.ObjectId,ref:'Algorithmic'}],
    creator: {type:mongoose.Schema.Types.ObjectId, ref:"User"}
})

const Module = mongoose.model('Module',ModuleSchema);
export default Module;