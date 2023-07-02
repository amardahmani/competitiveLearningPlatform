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


export const getJobsRecruiter = () => {
    return axios.get(API_URL+'/recruiter',config);
}

export const getAllJobs = () => {
    return axios.get(API_URL);
}

export const deleteJob = (jobID) => {
    return axios.delete(API_URL+'/'+jobID);
}

export const pushAlgorithmicJob = (data) => {
    return axios.post(API_URL+'/questions',data,{headers:{
        'Content-Type': 'application/json',
    }});
}

export const getJobAlgorithmicProblems = (jobID) => {
    return axios.get(API_URL+'/questions/'+jobID);
}