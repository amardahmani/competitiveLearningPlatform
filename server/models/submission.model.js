import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'program'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status:{
    type:String
  },
  questionID: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'Algorithmic'
  },
  score:{
    type: Number
  },
  project: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'project'
  },
  problemType: {
    type: String,
    enum: ['Algorithmic', 'Theme'], // specify the possible problem types
    required: true
  },
  creationDate: {
    type:Date
  },
  event: {
    type: String,
    enum: ['Job','Challenge','Path'],
    required: true
  },
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'event'
  }  
});

const Submission = mongoose.model('Submission', SubmissionSchema);

export default Submission;  