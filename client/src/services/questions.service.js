import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/questions";
const config = {
    headers: {
      'content-type': 'multipart/form-data',
      ...authHeader()
    },
    
  };
  
export const createAlgorithmic = (question) => {
    return axios.post(API_URL+'/algorithmic',question,config);
}

export const getAlgorithmic = (id) => {
  return axios.get(API_URL+'/algorithmic/'+id);
}
export const getAllAlgorithmic = () => {
  return axios.get(API_URL+'/algorithmic');
} 

export const pushQuestion = (question) => {
  return axios.post(API_URL+'/push',question,{
    headers:{
      'Content-Type': 'application/json',
    }
  })
} 