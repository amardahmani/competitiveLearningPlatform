import Algorithmic from "../models/algorithmic.model.js";
import Challenge from "../models/challenge.model.js";
import Plannification from "../models/plannification.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
export const createChallenge = async (req,res) => {
    const{title,description,duration,type,id} = req.body;
    
    const poster = req.file;
    try{
    const challenge = new Challenge({
        creator:id,
        title,
        description,
        duration,
        poster:poster.filename,
        type,
    })
    await challenge.save();
    return res.status(201).send({message:"challenge created successfully",challenge})
  }
  catch(err){
    return res.status(500).send({message:err.message});
  }
  }

  export const getChallenge = async (req,res) => {
    const id = req.params.id;
    console.log(id)
  try {
    const challenge = await Challenge.findById(id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.json(challenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  }

  export const dropAlgorithmicChallenge = async (req, res) => {
    const { challengeID,questionID } = req.params;
    try {
      const challenge = await Challenge.findOne({ _id: challengeID });
      const algorithmic = await Algorithmic.findOne({ _id: questionID });
  
      if (!challenge) {
        return res.status(404).send({ message: "Challenge not found" });
      }
  
      if (!algorithmic) {
        return res.status(404).send({ message: "Algorithmic question not found" });
      }
  
      const index = challenge.algorithmicQuestions.indexOf(questionID);
      if (index === -1) {
        return res.status(404).send({ message: "Algorithmic question not found in challenge" });
      }
  
      challenge.algorithmicQuestions.splice(index, 1);
      await challenge.save();
      res.status(200).send({ message: "Algorithmic question dropped successfully" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }

export const pushAlgorithmicChallenge = async (req,res) => {
  const {challengeID} = req.params;
  const {questionID} = req.body;
  try{
    const challenge = await Challenge.findOne({_id:challengeID});
    const algorithmic = await Algorithmic.findOne({_id:questionID});  
    if(!challenge){
      res.status(404).send({message:"challenge not found"});
    }

    if(!algorithmic){
      res.status(404).send({message:"algorithmic question not found"});
    }

    challenge.algorithmicQuestions.push(algorithmic);
    await challenge.save();
    res.status(200).send({message:"algorithmic question added successfully"});
  }catch(err){
    res.status(500).send({message:err.message});
  }
}

export const joinAlgorithmic = async (req,res) => {
  try{
    
    const {challengeID,id} = req.body;
    
    const challenge = await Challenge.findOne({_id:challengeID});

    console.log(challenge);
    challenge.participants.push(id);
    
    await challenge.save();
    res.status(200).send({message:"developer registered successfully"});

  }catch(err){
    res.status(500).send({message:err.message})
    console.log(err)
  }
}


export const getUnplannedChallenges = async (req, res) => {
  try {
    
    const plannifications = await Plannification.find({ type: 'Challenge' });
  const challengeIDs = plannifications.map(plannification => plannification.event);
  
  const challenges = await Challenge.find({ _id: { $nin: challengeIDs } });
  
  res.status(200).send(challenges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving unplanned challenges.' });
  }
};

export const getChallengesUser = (req,res) => {
  Challenge.find({creator:req.user.id}).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(500).send({message:err.message});
  })
}
export const getChallengesPlanned = async (req,res) => {
  try {
    const plannifications = await Plannification.find({ type: 'Challenge' }).populate('event', 'title').lean();
    const challengeIds = plannifications.map(plannification => plannification.event._id);
    const challenges = await Challenge.find({ _id: { $in: challengeIds } }).lean();

    const challengeData = plannifications.map(plannification => {
      const challenge = challenges.find(challenge => challenge._id.equals(plannification.event._id));
      return { ...challenge, startDate: plannification.startDate, endDate: plannification.endDate };
    });

    if(!challengeData){
      return res.status.send({message:"No challenges found"});
    }

    res.status(200).json(challengeData);
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving challenges in plannification.' });
  }    
}

export const getChallengeQuestions = async (req,res) => {
    const id = req.params.id;
    
    try {
        const challenge = await Challenge.findOne({_id:id})
          .populate('algorithmicQuestions', 'question')
    
        if (!challenge) {
          throw new Error('Challenge not found');
        }
    
        const algorithmicQuestions = await Algorithmic.find({
          _id: { $in: challenge.algorithmicQuestions },
        });
        
    
        res.status(200).send({ algorithmicQuestions });
      } catch (error) {
        console.error(error);
        throw new Error('Failed to get challenge questions');
      }
}

// Update a challenge
export const updateChallenge = async (req, res) => {
  const challengeId = req.params.challengeID;
  const { title, description, duration, type } = req.body;

  try {
    const updatedChallenge = await Challenge.findByIdAndUpdate(
      challengeId,
      { title, description, duration, type },
      { new: true }
    );

    if (!updatedChallenge) {
      return res.status(404).send({ message: 'Challenge not found' });
    }

    res.status(200).send(updatedChallenge);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a challenge
export const deleteChallenge = async (req, res) => {
  const challengeId = req.params.challengeID;

  try {
    const deletedChallenge = await Challenge.findByIdAndRemove(challengeId);

    if (!deletedChallenge) {
      return res.status(404).send({ message: 'Challenge not found' });
    }

    res.status(200).send({ message: 'Challenge deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getInstructors = async (req,res) => {
  const challengeID = req.params.challengeID;

try {
  // Find the path by its ID
  const challenge = await Challenge.findById(challengeID);

  if (!challenge) {
    return res.status(404).json({ error: 'Learning path not found' });
  }

  // Find all users with the role of "instructor" who are not associated with the path
  const instructors = await User.find({
    _id: { $in: challenge.problemSetters },
    role: 'INSTRUCTOR'
  });

  res.json(instructors);
} catch (error) {
  // Handle the error appropriately
  console.error(error);
  res.status(500).json({ error: 'Failed to retrieve instructors' });
}
}

export const getNonInstructors = async (req,res) => {
  const challengeID = req.params.challengeID;

try {
  // Find the path by its ID
  const challenge = await Challenge.findById(challengeID);

  if (!challenge) {
    return res.status(404).json({ error: 'challenge not found' });
  }

  // Find all users with the role of "instructor" who are not associated with the path
  const instructorNotInChallenge = await User.find({
    _id: { $nin: challenge.problemSetters },
    role: 'INSTRUCTOR'
  });

  res.json(instructorNotInChallenge);
} catch (error) {
  // Handle the error appropriately
  console.error(error);
  res.status(500).json({ error: 'Failed to retrieve instructors' });
}}

export const pushInstructor = async (req,res) => {
  const { instructorId } = req.body;
  const {challengeID} = req.params;
  console.log(instructorId,challengeID);
try {
  // Find the path document by its ID
  const challenge = await Challenge.findById(challengeID);

  if (!challenge) {
    return res.status(404).json({ error: "challenge not found." });
  }

  // Push the instructor to the problemSetters array
  challenge.problemSetters.push(instructorId);

  // Save the updated path to the database
  const savedChallenge = await challenge.save();

  res.status(200).json(savedChallenge);
} catch (error) {
  res.status(500).json({ message: error.message });
}
}

export const removeInstructor = async (req,res) => {
  const { challengeID, instructorID} = req.params;

try {
  // Find the path document by its ID
  const challenge = await Challenge.findById(challengeID);

  if (!challenge) {
    return res.status(404).json({ error: "challenge not found." });
  }

  // Remove the instructor from the problemSetters array
  challenge.problemSetters.pull(instructorID);

  // Save the updated path to the database
  await challenge.save();

  res.status(200).json({ message: "Instructor removed successfully." });
}
catch(err){
  res.status(500).send({message:err.message})
}
}