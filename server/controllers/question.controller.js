import Algorithmic from "../models/algorithmic.model.js";
import Challenge from "../models/challenge.model.js";
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




export const createAlgorithmicChallenge = async (req,res) => {
    try{
        const {title,description,difficulty,tags,creator,points} = req.body;
        const { input, expectedOutput } = req.files;
        console.log(input,expectedOutput)
        const {challengeID} = req.body;
        
        const challenge = await Challenge.findOne({_id:challengeID});

        if(!challenge){
            res.status(404).send({message:"challenge not found"});
        }
        console.log(input.filename)
        console.log(expectedOutput.filename)
        const algorithmic = new Algorithmic({
            title,
            description,
            difficulty,
            tags,
            creator,
            points,
            input:input[0].filename,
            expectedOutput:expectedOutput[0].filename
        })

        await algorithmic.save();

        challenge.algorithmicQuestions.push(algorithmic._id);
        challenge.save();
        res.status(201).send({message:"question saved successfully",challenge});
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export const getAlgorithmic = async (req,res) => {
    try{
        const AlgorithmicID = req.params.id;
        
        const algorithmic = await Algorithmic.findById(AlgorithmicID);
        if(!algorithmic){
            res.status(404).send({message:"problem statement not found"});
        }
        console.log(algorithmic.input)
        const inputFilePath = path.join(__dirname, '..', 'uploads', 'questions', 'algorithmic', algorithmic.input);        
        console.log(inputFilePath);
        console.log(inputFilePath);
        console.log(inputFilePath);
        fs.readFile(inputFilePath, 'utf8', (err, inputData) => {
            if (err) {
              console.error(err);
              // Handle the error and send an appropriate response
            } else {
              // Add the input file content to the algorithmic document
              let inputFileContent = inputData;
      
              // Read the content of the expected output file
              const outputFilePath = path.join(__dirname, '..', 'uploads', 'questions', 'algorithmic', algorithmic.expectedOutput);
              fs.readFile(outputFilePath, 'utf8', (err, outputData) => {
                if (err) {
                  console.error(err);
                  // Handle the error and send an appropriate response
                } else {
                  // Add the expected output file content to the algorithmic document
                  let expectedOutputFileContent = outputData;
                    console.log(expectedOutputFileContent)
                  // Send the algorithmic document to the client
                  res.json({algorithmic,expectedOutputFileContent,inputFileContent});
                }
              });
            }
          });

    }catch(err){
        res.status(500).send({message:err.message})
    }
}

export const getAllAlgorithmic = async (req, res) => {
  try {
    // Retrieve all algorithmic questions from the database
    const algorithmicQuestions = await Algorithmic.find();

    // Return the algorithmic questions as a response
    res.json(algorithmicQuestions);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error("Error while retrieving algorithmic questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAlgorithmic = async (req,res) => {
  try{
    const {title,description,difficulty,tags,creator,points} = req.body;
    const { input, expectedOutput } = req.files;
    
    const algorithmic = new Algorithmic({
        title,
        description,
        difficulty,
        tags,
        creator,
        points,
        input:input[0].filename,
        expectedOutput:expectedOutput[0].filename
    })

    await algorithmic.save();

    res.status(201).send({message:"question saved successfully",algorithmic});
}catch(error){
    console.error(error);
    res.status(500).json({ message: error.message });
}
}

// Update an algorithmic question
export const updateAlgorithmicQuestion = async (req, res) => {
  const questionId = req.params.questionID;
  const { title, description, difficulty, tags, creator, points } = req.body;
  const { input, expectedOutput } = req.files;

  try {
    const updatedFields = {
      title,
      description,
      difficulty,
      tags,
      creator,
      points,
    };

    if (input) {
      updatedFields.input = input[0].filename;
    }

    if (expectedOutput) {
      updatedFields.expectedOutput = expectedOutput[0].filename;
    }

    const updatedQuestion = await Algorithmic.findByIdAndUpdate(
      questionId,
      updatedFields,
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).send({ message: 'Question not found' });
    }

    res.status(200).send(updatedQuestion);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Delete an algorithmic question
export const deleteAlgorithmicQuestion = async (req, res) => {
  const questionId = req.params.questionID;

  try {
    const deletedQuestion = await Algorithmic.findByIdAndRemove(questionId);

    if (!deletedQuestion) {
      return res.status(404).send({ message: 'Question not found' });
    }

    res.status(200).send({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};