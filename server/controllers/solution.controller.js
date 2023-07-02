import Code from "../models/code.model.js";

export const submitSolutionAlgorithmic = (req,res) => {
    const {question,challenge} = req.params.id;
    const {code,input,expectedOutput} = req.body;

     
}