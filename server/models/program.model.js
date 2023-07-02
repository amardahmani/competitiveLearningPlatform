import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
    language: {
        type:String
    },
    code: {
        type: String
    }
})

const Program = mongoose.model("Program",ProgramSchema);

export default Program;
