import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'

export const verifyToken = async (req, res, next) => {
    try {
      let token = req.header("Authorization");
  
      if (!token) {
        return res.status(403).send("Access Denied");
      }
  
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  export const checkAdmin = (req,res,next) => {
    if(req.user.role === "ADMIN"){
      next();
    }else{
      res.status(403).send({message:"access denied"});
    }
  }

  export const checkInstructor = (req,res,next) => {
    if(req.user.role === "INSTRUCTOR"){
      next();
    }else{
      res.status(403).send({message:"access denied"});
    }
  }

  export const checkDeveloper = (req,res,next) => {
    if(req.user.role === "DEVELOPER"){
      next();
    }else{
      res.status(403).send({message:"access denied"});
    }
  }

  export const checkRecruter = (req,res,next) => {
    if(req.user.role === "RECRUTER"){
      next();
    }else{
      res.status(403).send({message:"access denied"});
    }
  }

  export const checkAnalyst = (req,res,next) => {
    if(req.user.role === "ANALYST"){
      next();
    }else{
      res.status(403).send({message:"access denied"});
    }
  }
