import mongoose from "mongoose";

const ThemeSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
      }
});

const Theme = mongoose.model("Theme",ThemeSchema);
export default Theme;