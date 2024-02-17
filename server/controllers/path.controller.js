import Path from "../models/path.model.js";
import User from "../models/user.model.js";
import fs from 'fs';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from 'url';

export const createPath = (req,res) => {
    const {title,description} = req.body;
    const image = req.file;
    const path = new Path({
        title,
        description,
        image:image.filename,
        creator:req.user.id
    })

    path.save(path).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send({message:err.message})
    })
}

export const getAllPaths = (req,res) => {
    Path.find().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message:err.message});
    })
}

export const updatePath = (req, res) => {
    const { title, description } = req.body;
    const pathId = req.params.pathID;
    const updatedFields = { title, description };
    console.log(req.file);
    if (req.file) {
      updatedFields.image = req.file.filename;
    }
  
    Path.findByIdAndUpdate(
      pathId,
      updatedFields,
      { new: true }
    )
      .then((updatedPath) => {
        if (!updatedPath) {
          return res.status(404).send({ message: 'Path not found' });
        }
        res.status(200).send(updatedPath);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };
  
  // Delete a path
  export const deletePath = (req, res) => {
    const pathID = req.params.pathID;
  
    Path.findByIdAndRemove(pathID)
      .then((deletedPath) => {
        if (!deletedPath) {
          return res.status(404).send({ message: 'Path not found' });
        }
        // Delete associated image file if necessary
        if (deletedPath.image) {
          const imagePath = path.join(__dirname, '../uploads/poster', deletedPath.image);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Deleted image file: ${deletedPath.image}`);
          } else {
            console.log(`Image file not found: ${deletedPath.image}`);
          }
        }
        res.status(200).send({ message: 'Path deleted successfully' });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };
  export const getNonInstructors = async (req,res) => {
    const pathId = req.params.pathID;

  try {
    // Find the path by its ID
    const path = await Path.findById(pathId);

    if (!path) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    // Find all users with the role of "instructor" who are not associated with the path
    const instructorsNotInPath = await User.find({
      _id: { $nin: path.problemSetters },
      role: 'INSTRUCTOR'
    });

    res.json(instructorsNotInPath);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve instructors' });
  }
  }
  export const getInstructors = async (req,res) => {
    const pathId = req.params.pathID;

  try {
    // Find the path by its ID
    const path = await Path.findById(pathId);

    if (!path) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    // Find all users with the role of "instructor" who are not associated with the path
    const instructors = await User.find({
      _id: { $in: path.problemSetters },
      role: 'INSTRUCTOR'
    });

    res.json(instructors);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve instructors' });
  }
  }

  export const pushInstructor = async (req,res) => {
    const { instructorId } = req.body;
    const {pathID} = req.params;
  try {
    // Find the path document by its ID
    const path = await Path.findById(pathID);

    if (!path) {
      return res.status(404).json({ error: "Path not found." });
    }

    // Push the instructor to the problemSetters array
    path.problemSetters.push(instructorId);

    // Save the updated path to the database
    const savedPath = await path.save();

    res.status(200).json(savedPath);
  } catch (error) {
    res.status(500).json({ error: "Failed to add the instructor to problemSetters." });
  }
  }

  export const removeInstructor = async (req,res) => {
    const { pathID, instructorID} = req.params;

  try {
    // Find the path document by its ID
    const path = await Path.findById(pathID);

    if (!path) {
      return res.status(404).json({ error: "Path not found." });
    }

    // Remove the instructor from the problemSetters array
    path.problemSetters.pull(instructorID);

    // Save the updated path to the database
    await path.save();

    res.status(200).json({ message: "Instructor removed successfully." });
  }
  catch(err){
    res.status(500).send({message:err.message})
  }
}