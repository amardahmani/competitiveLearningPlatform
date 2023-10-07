import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3001/challenge"

const config = {
  headers: {
    'content-type': 'multipart/form-data',
    ...authHeader()
  },
  
};
export const createChallenge = (formData) => {
    return axios.post(API_URL+'/create',formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
}

export const updateChallenge = (challengeID,challenge) => {
  return axios.put(API_URL+'/'+challengeID,challenge,{
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteChallenge = (challengeID) => {
  return axios.delete(API_URL+'/'+challengeID);
}

export const getUnplannedChallenges = () => {
  return axios.get(API_URL+'/unplanned')
}

export const getChallenge = (challengeID) => {
  return axios.get(API_URL+'/'+challengeID);

}
export const getPlannedChallenges = () => {
  return axios.get(API_URL+'/planned')
}

export const joinAlgorithmic = (data) => {
  return axios.post(API_URL+"/join/algorithmic",data,{
    headers:{
      'Content-Type': 'application/json',
    }
  })
}

export const getChallengeQuestions = (id) => {
  return axios.get(API_URL+"/"+id+"/questions");
}
export const getChallengesUser = () => {
  return axios.get(API_URL + '/user', {
    headers: authHeader()
  });
};

export const getNonInstructors = (challengeID) => {
  return axios.get(API_URL+'/'+challengeID+'/Noninstructors');
}

export const getInstructors = (challengeID) => {
  return axios.get(API_URL+'/'+challengeID+'/instructors');
}

export const pushAlgorithmicChallenge = (challengeID,data) => {
  return axios.post(API_URL+'/'+challengeID+'/questions',data,{headers:{
      'Content-Type': 'application/json',
  }});
}


export const pushInstructor = (challengeID, instructorID) => {
  return axios.post(API_URL + '/' + challengeID + '/add', { instructorId: instructorID }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export const removeInstructor = (challengeID, instructorID) => {
  return axios.delete(API_URL+'/'+challengeID+'/delete/'+instructorID,{
    headers: {
      'Content-Type': 'application/json',
    }
  });
};