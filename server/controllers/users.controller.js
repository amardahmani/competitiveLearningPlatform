import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
      const user = await User.find().select('-password');
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

export const createUser = async (req,res) => {
    
    const {firstName,lastName,email,password,role,username} = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        firstName:firstName,
        lastName:lastName,
        email:email,
        username:username,
        password:passwordHash,
        role:role
    })


    user.save(user).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:err.message
        })
    })
}

export const getUser = (req,res) => {

    const id = req.params.id;

    User.findById(id).then(data => {
        if(!data){
            res.status(404).send({ message: "Not found User with id " + id });
        }
        else{
            res.status(200).send(data);
        }
    }).catch((err) => {
        res.status(500).send({message:err.message});
    })
}

export const deleteUser = (req,res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id,{ useFindAndModify: false }).then((data) => {
        if(!data){
            res.status(404).send({message:"user not found"});
        }
        else {
            res.status(200).send({message:"user was deleted successfully"});
        }
    }).catch((err) => {
        res.status(500).send({message:err.message})
    })
}

export const updateUser = async (req, res) => {
    const { id } = req.params; // Assuming you're passing the user ID in the URL parameter
    const { firstName, lastName, email, password, role, username } = req.body;
  
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const updatedUser = {
        firstName,
        lastName,
        email,
        username,
        password: passwordHash,
        role,
      };
  
      const user = await User.findByIdAndUpdate(id, updatedUser, {
        new: true, // Return the updated user object
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };