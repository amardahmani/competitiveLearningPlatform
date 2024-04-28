import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
          firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
          },
          lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
          },
          username: {
            type: String,
            required: true,
            min: 2,
            max: 50,
          },
          email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
          },
          password: {
            type: String,
            required: true,
            min: 5,
          },
          picturePath: {
            type: String,
            default: "",
          },
          role:{
            type:String,
            required:true,
          },
          education: {
            institution:String,
            Degree:String,
            startDate:Date,
            endDate:Date,
        },
        skills:{
            type:[String]
        },
        workExperience: {
          company: String,
          role:String,
          startDate:Date,
          endDate:Date
      },
      score: {
        type: Number,
        default:0
      },
      level: {
        type: String
      }
    }
)

UserSchema.methods.incrementScore = async function (points) {
  this.score += parseInt(points, 10); // Convert points to an integer
  await this.save();
};

const User = mongoose.model("User", UserSchema);
export default User;