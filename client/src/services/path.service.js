import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/path";
const config = {
    headers: {
      'content-type': 'multipart/form-data',
      ...authHeader()
    },
    
  };

export const getPaths = () => {
    return axios.get(API_URL);
}

export const createPath = (data) => {
    return axios.post(API_URL,data,config)
}

export const deletePath = (id) => {
    return axios.delete(API_URL+'/'+id,{
      headers:{
      'Content-Type': 'application/json',       
      }
    });
}

export const getNonInstructors = (pathID) => {
  return axios.get(API_URL+'/'+pathID+'/Noninstructors');
}

export const getInstructors = (pathID) => {
  return axios.get(API_URL+'/'+pathID+'/instructors');
}

export const pushInstructor = (pathID, instructorID) => {
  return axios.post(API_URL + '/' + pathID + '/add', { instructorId: instructorID }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export const removeInstructor = (pathID, instructorID) => {
  return axios.delete(API_URL+'/'+pathID+'/delete/'+instructorID,{
    headers: {
      'Content-Type': 'application/json',
    }
  });
};