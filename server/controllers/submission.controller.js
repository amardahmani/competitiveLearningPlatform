import Submission from "../models/submission.model.js";
import Program from "../models/program.model.js";
import User from "../models/user.model.js";
import Job from "../models/job.model.js";

export const createSubmission = async (req, res) => {
  try {
    const { question, status, code, type, challenge, points, language } = req.body;

    const program = Program({
      language,
      code,
    });
    await program.save();

    const submission = Submission({
      question,
      status,
      program: program._id,
      problemType: type,
      challenge,
      creationDate: Date.now(),
      author: req.user.id,
    });

    console.log(req.user.id);
    if (status === 'Accepted') {
      const developer = await User.findOne({ _id: req.user.id });
      console.log(developer);

      // Check if the developer has already received an "Accepted" status
      const previousAcceptedSubmission = await Submission.findOne({
        author: req.user.id,
        status: 'Accepted',
      });

      if (previousAcceptedSubmission) {
        return res.status(400).send({ message: 'You have already received an "Accepted" status' });
      }

      // Increment the developer's score only if no previous "Accepted" submission found
      developer.incrementScore(points);
      return res.status(200).send({ message: 'You have earned ' + points + ' xp' });
    }

    await submission.save();
    res.status(200);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

 export const pushSubmissionJob = async (req,res) => {
    const { submissionID,jobID } = req.body;
  
    try {
      // Find the job by ID and update the submissions array
      const job = await Job.findByIdAndUpdate(
        jobID,
        { $push: { submissions: submissionID } },
        { new: true }
      );
  
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      return res.status(200).json({ message: "Submission saved successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  export const pushSubmissionChallenge = async (req,res) => {
    
    const { submissionID,challengeID } = req.body;
  
    try {
      // Find the job by ID and update the submissions array
      const challenge = await Challenge.findByIdAndUpdate(
        challengeID,
        { $push: { submissions: submissionID } },
        { new: true }
      );
  
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
  
      return res.status(200).json({ message: "Submission saved successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }  
  }

  export const getSubmissionsChallenge = (req,res) => {

  }

  export const getSubmissionsJob = (req,res) => {
    
  }