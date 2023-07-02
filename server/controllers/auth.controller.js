import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import randomstring from "randomstring";
import nodemailer from 'nodemailer';
import mongoose from "mongoose";

export const register = async (req,res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            username
          } = req.body;
          
        const role = "DEVELOPER";
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            password: passwordHash,
            role:role
        });
        
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}



const cache = {};

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'amar.dahmani@univ-constantine2.dz',
      pass: 'Nk5Ta6Ax7'
    },
  });


 export const verifyEmail = (req,res) => {
    // Get the user's email from the request body
  const email = req.body.email;

  // Generate a random verification code
  const verificationCode = randomstring.generate({
    length: 6,
    charset: 'numeric',
  });

  // Store the verification code in the cache with a 5-minute expiration time
  cache[email] = {
    code: verificationCode,
    expires: Date.now() + 5 * 60 * 1000, // 5 minutes in milliseconds
  };

  // Define the email message
  const message = {
    from: 'amar.dahmani@univ-constantine2.dz',
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is ${verificationCode}`,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Verification code sent');
    }
  });
  }

  export const verifyCode = (req,res) => {
    // Get the user's email and verification code from the request body
  const email = req.body.email;
  const verificationCode = req.body.verificationCode;

  // Check if the verification code is valid and has not expired
  if (
    cache[email] &&
    cache[email].code === verificationCode &&
    cache[email].expires > Date.now()
  ) {
    console.log('Verification code is valid');
    // TODO: Add code to log user in or perform other actions
    delete cache[email]; // Delete the verification code from the cache
    res.status(200).send('Verification code is valid');
  } else {
    console.log('Verification code is invalid or has expired');
    // TODO: Add code to prompt user to enter verification code again
    res.status(400).send('Verification code is invalid or has expired');
  }
  }

export const login = async (req,res) => {
    try{
        const { email, password } = req.body;
        console.log(email);
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ accessToken:token,email:user.email,role:user.role,id:user._id });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}