import Job from "../models/job.model.js";
import Algorithmic from "../models/algorithmic.model.js";
import Plannification from "../models/plannification.model.js";
import User from "../models/user.model.js";

export const createJob = async (req, res) => {
    try {
      const {
        title,
        description,
        country,
        positions,
      } = req.body;
      const poster = req.file;
      const job = new Job({
        title,
        description,
        country,
        positions,
        poster:poster.filename,
        creator:req.user.id
      });
  
      const createdJob = await job.save();
  
      res.status(201).json({data:createdJob,message:"Job Created Successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create the job' });
    }
  };
  
  export const getJobAlgorithmicProblems = async (req, res) => {
    try {
      const jobId = req.params.jobID;
  
      // Find the job by ID and populate the algorithmicQuestions field
      const job = await Job.findById(jobId).populate('algorithmicQuestions');
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Extract the algorithmic problems from the job
      const algorithmicProblems = job.algorithmicQuestions;
  
      // Return the algorithmic problems in the response
      res.json(algorithmicProblems);
    } catch (error) {
      console.error('Error fetching job algorithmic problems:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  export const deleteJob = async (req, res) => {
    try {
      const jobId = req.params.id;
  
      const deletedJob = await Job.findByIdAndDelete(jobId);
  
      if (!deletedJob) {
        return res.status(404).json({ error: 'Job not found' });
      }
  
      res.json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete the job' });
    }
  };

  export const getJobs = (req,res) => {
    Job.find().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message:err.message})
    })
  }

  export const getJobsRecruiter = (req,res) => {
    Job.find({creator:req.user.id}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message:err.message});
    })
  }

  export const pushAlgorithmicJob = async (req,res) => {

      const {jobID} = req.params;
      const {questionID} = req.body;
      
      try{
        const job = await Job.findOne({_id:jobID});
        const algorithmic = await Algorithmic.findOne({_id:questionID});  
        if(!job){
          res.status(404).send({message:"job not found"});
        }
    
        if(!algorithmic){
          res.status(404).send({message:"algorithmic question not found"});
        }
    
        job.algorithmicQuestions.push(algorithmic);
        await job.save();
        res.status(200).send({message:"algorithmic question added successfully"});
      }catch(err){
        res.status(500).send({message:err.message});
      }
    }
  


  export const getJobsPlanned = async (req,res) => {
    try {
      const plannifications = await Plannification.find({ type: 'Job' });
      const jobIds = plannifications.map(plannification => plannification.event);
      
      const jobs = await Job.find({ _id: { $in: jobIds } });
      
      res.status(200).send(jobs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while retrieving jobs.' });
    }
  }

  export const getUnplannedJobs = async (req, res) => {
    try {
      const plannifications = await Plannification.find();
  const jobIds = plannifications.map(plannification => plannification.event);
  
  const jobs = await Job.find({ _id: { $nin: jobIds } });
  
  res.status(200).send(jobs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while retrieving unplanned jobs.' });
    }
  };
  
  export const updateJob = async (req, res) => {
    const jobId = req.params.jobID;
    const { title, description, country, positions } = req.body;
    const poster = req.file;
  
    try {
      const updatedFields = {
        title,
        description,
        country,
        positions,
      };
  
      if (poster) {
        updatedFields.poster = poster.filename;
      }
  
      const updatedJob = await Job.findByIdAndUpdate(jobId, updatedFields, { new: true });
  
      if (!updatedJob) {
        return res.status(404).send({ message: 'Job not found' });
      }
  
      res.status(200).send({job:updateJob,message:"Job Updated Successfully"});
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  export const getInstructors = async (req,res) => {
    const jobID = req.params.jobID;
  
  try {
    // Find the path by its ID
    const job = await Job.findById(jobID);
  
    if (!job) {
      return res.status(404).json({ error: 'job not found' });
    }
  
    // Find all users with the role of "instructor" who are not associated with the path
    const instructors = await User.find({
      _id: { $in: job.problemSetters },
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
    const jobID = req.params.jobID;
  
  try {
    // Find the path by its ID
    const job = await Job.findById(jobID);
  
    if (!job) {
      return res.status(404).json({ error: 'job not found' });
    }
  
    // Find all users with the role of "instructor" who are not associated with the path
    const instructorNotInJob = await User.find({
      _id: { $nin: job.problemSetters },
      role: 'INSTRUCTOR'
    });
  
    res.json(instructorNotInJob);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve instructors' });
  }}
  
  export const pushInstructor = async (req,res) => {
    const { instructorId } = req.body;
    const {jobID} = req.params;
  try {
    // Find the path document by its ID
    const job = await Job.findById(jobID);
  
    if (!job) {
      return res.status(404).json({ error: "challenge not found." });
    }
  
    // Push the instructor to the problemSetters array
    job.problemSetters.push(instructorId);
  
    // Save the updated path to the database
    const savedJob = await job.save();
  
    res.status(200).json(savedJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to add the instructor to problemSetters." });
  }
  }
  
  export const removeInstructor = async (req,res) => {
    const { jobID, instructorID} = req.params;
  
  try {
    // Find the path document by its ID
    const job = await Job.findById(jobID);
  
    if (!job) {
      return res.status(404).json({ error: "job not found." });
    }
  
    // Remove the instructor from the problemSetters array
    job.problemSetters.pull(instructorID);
  
    // Save the updated path to the database
    await job.save();
  
    res.status(200).json({ message: "Instructor removed successfully." });
  }
  catch(err){
    res.status(500).send({message:err.message})
  }
  }