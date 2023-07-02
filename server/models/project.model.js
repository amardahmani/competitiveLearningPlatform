import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
    title: {
        type:String
    },
    theme: {
        type: String
    },
    description: {
        type:String
    },
    source: {
        type:String
    },
})

const Project = mongoose.model("Project",ProjectSchema);
export default Project;