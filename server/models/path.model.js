import mongoose from "mongoose";

const PathSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    image: {
        type:String
    },
    creator: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
      problemSetters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      modules:[{type: mongoose.Schema.Types.ObjectId, ref: 'Module'}],
      participants:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
      submissions:[{type:mongoose.Schema.Types.ObjectId,ref:'Submission'}]
})

const Path = mongoose.model('Path',PathSchema);
export default Path;