import mongoose from "mongoose";

const ScoreSchema = mongoose.Schema({
    challenge:{
        type: mongoose.Types.ObjectId,
        refPath:'type'
    },
    developer: {
        type: mongoose.Types.ObjectId
    },
    earnedScore: {
        type:Number
    },
    type:{
        type:String,
        enum: ['Challenge','Job','Path']
    }
})

ScoreSchema.methods.incrementScore = async function (points) {
    this.score += parseInt(points, 10); // Convert points to an integer
    await this.save();
  };
const Score = mongoose.model('Score',ScoreSchema);
export default Score;