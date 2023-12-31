import Module from "../models/module.model.js";
import Path from "../models/path.model.js";

export const createModule = async (req,res) => {
    const pathID = req.params.pathID;
    
    const {title,description} = req.body;
    const image = req.file;
    console.log(image);
    try{
    const module = new Module({
        title,
        description,
        creator: req.user.id,
        image:image.filename,
    })

    const path = await Path.findById(pathID);
    if(!path){
        res.status(404).send({message:"path not found"});
    }
    await module.save();
    console.log(module._id)
    path.modules.push(module._id);
    await path.save();
    res.status(200).send({message:"module Created successfully",module});
    }
    catch(err){
        res.status(500).send({message:err.message});
    }
}


export const getModules = (req,res) => {
    const pathID = req.params.pathID;

    Path.findById(pathID).populate('modules').then((data) => {
        res.status(200).send(data);
        console.log(data);
    }).catch((err) => {
        res.status(500).send({message:err.message})
    })
}

// Update a module
export const updateModule = async (req, res) => {
    const moduleId = req.params.moduleID;
    const { title, description } = req.body;
    const updatedFields = { title, description };
  
    if (req.file) {
      updatedFields.image = req.file.filename;
    }
  
    try {
      const updatedModule = await Module.findByIdAndUpdate(
        moduleId,
        updatedFields,
        { new: true }
      );
  
      if (!updatedModule) {
        return res.status(404).send({ message: 'Module not found' });
      }
  
      res.status(200).send(updatedModule);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
  // Delete a module
  export const deleteModule = async (req, res) => {
    const moduleId = req.params.moduleID;
  
    try {
      const deletedModule = await Module.findByIdAndRemove(moduleId);
  
      if (!deletedModule) {
        return res.status(404).send({ message: 'Module not found' });
      }
  
      const pathId = deletedModule.path; // Assuming the path ID is stored in the 'path' field of the Module model
  
      // Find the associated path and update its modules array
      const updatedPath = await Path.findByIdAndUpdate(
        pathId,
        { $pull: { modules: moduleId } },
        { new: true }
      );
  
      if (!updatedPath) {
        return res.status(404).send({ message: 'Path not found' });
      }
  
      res.status(200).send({ message: 'Module deleted successfully' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  