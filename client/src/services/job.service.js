import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/job";

const config = {
    headers: {
      'content-type': 'multipart/form-data',
      ...authHeader()
    },
    
};

export const createJob = (data) => {
    return axios.post(API_URL,data,config);
}

export const getJobsUnplanned = () => {
    return axios.get(API_URL+'/unplanned')
}

export const getJobsPlanned = () => {
  return axios.get(API_URL+'/planned');
}

export const getJobsRecruiter = () => {
    return axios.get(API_URL+'/recruiter',config);
}

export const getAllJobs = () => {
    return axios.get(API_URL);
}

export const deleteJob = (jobID) => {
    return axios.delete(API_URL+'/'+jobID,config);
}

export const pushAlgorithmicJob = (jobID,data) => {
    return axios.post(API_URL+'/'+jobID+'/questions',data,{headers:{
        'Content-Type': 'application/json',
    }});
}

export const getJobAlgorithmicProblems = (jobID) => {
    return axios.get(API_URL+'/'+jobID+'/questions/');
}

export const getJobInstructors = (jobID) => {
    return axios.get(API_URL+'/'+jobID+'/instructors');
}

export const updateJob = (jobID,job) => {
  return axios.put(API_URL+'/'+jobID,job,{headers:{
    'Content-Type': 'multipart/form-data',
}})
}

export const getJobNonInstructors = (jobID) => {
    return axios.get(API_URL+'/'+jobID+'/Noninstructors');
}

export const dropAlgorithmicJob = (jobID,questionID) => {
    return axios.delete(API_URL+'/'+jobID+'/'+questionID);
}

export const pushInstructor = (challengeID, instructorID) => {
    return axios.post(API_URL + '/' + challengeID + '/add', { instructorId: instructorID }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };
  
  export const removeInstructor = (jobID, instructorID) => {
    return axios.delete(API_URL+'/'+jobID+'/delete/'+instructorID,{
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };