import GamifiedTutorial from "../models/gamifiedTutorial.model.js";
import Module from "../models/module.model.js";

export const createTutorial = async (req,res) => {
    
    const {title,description,topic,difficulty} = req.body;
    const moduleID = req.params.moduleID;
    try{
    const module = await Module.findById(moduleID);

    if(!module){
        res.status(404).send({message:"module not found"});
    }

    const gamifiedTutorial = new GamifiedTutorial({
        title,
        description,
        topic,
        difficulty,
        creator: req.user.id
    })

    await gamifiedTutorial.save();

    module.tutorials.push(gamifiedTutorial._id);
    await module.save();
    res.status(200).send({message:"gamified tutorial created successfully"});
    }
    catch(err){
        res.status(500).send({message:err.message})
    }

}

export const getTutorials = (req,res) => {
    const moduleID = req.params.moduleID;

    Module.findById(moduleID).populate('tutorials').then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message:err.message});
    })

}

// Update a tutorial
export const updateTutorial = async (req, res) => {
    const tutorialId = req.params.tutorialID;
    const { title, description, topic, difficulty } = req.body;
  
    try {
      const updatedTutorial = await GamifiedTutorial.findByIdAndUpdate(
        tutorialId,
        { title, description, topic, difficulty },
        { new: true }
      );
  
      if (!updatedTutorial) {
        return res.status(404).send({ message: 'Tutorial not found' });
      }
  
      res.status(200).send(updatedTutorial);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
  // Delete a tutorial
  export const deleteTutorial = async (req, res) => {
    const tutorialId = req.params.tutorialID;
  
    try {
      const deletedTutorial = await GamifiedTutorial.findByIdAndRemove(tutorialId);
  
      if (!deletedTutorial) {
        return res.status(404).send({ message: 'Tutorial not found' });
      }
  
      const moduleId = deletedTutorial.module; // Assuming the module ID is stored in the 'module' field of the GamifiedTutorial model
  
      const updatedModule = await Module.findByIdAndUpdate(
        moduleId,
        { $pull: { tutorials: tutorialId } },
        { new: true }
      );
  
      if (!updatedModule) {
        return res.status(404).send({ message: 'Module not found' });
      }
  
      res.status(200).send({ message: 'Tutorial deleted successfully' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  