import axios from "axios";
import authHeader from "./auth-header";


const API_URL = "http://localhost:3001/tutorial";
const config = {
    headers: {
      'content-type': 'application/json',
      ...authHeader()
    },
    
};

export const createTutorial = (moduleID,tutorial) => {
    return axios.post(API_URL+'/'+moduleID,tutorial,config);
}

export const getAlgorithmicQuestions = (moduleID) => {
    return axios.get(API_URL+'/'+moduleID,config);
}

export const deleteTutorial = (moduleID,tutorialID) => {
    return axios.delete(API_URL+'/'+moduleID+'/'+tutorialID,config);
}

export const getTutorials = (moduleID) => {
    return axios.get(API_URL+'/'+moduleID);
}

export const updateTutorial = (moduleID,tutorialID,tutorial) =>{
    return axios.put(API_URL+'/'+moduleID+'/'+tutorialID,tutorial,config);
}