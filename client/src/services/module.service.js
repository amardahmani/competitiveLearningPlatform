import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3001/module";

const config = {
    headers: {
      'content-type': 'multipart/form-data',
      ...authHeader()
    },
    
  };
export const createModule = (pathID,module) => {
    return axios.post(API_URL+'/'+pathID,module,config);
}

export const updateModule = (pathID,moduleID,module) => {
  return axios.put(API_URL+'/'+pathID+'/'+moduleID,module,config);
}

export const getModules = (pathID) => {
    return axios.get(API_URL+"/"+pathID);
}

export const deleteModule = (pathID,moduleID) => {
  return axios.delete(API_URL+'/'+pathID+'/'+moduleID,{
    headers:{
      'Content-Type': 'application/json',
      ...authHeader()
    }
  });
}

export const pushAlgorithmicModule = (moduleID,formData) => {
  return axios.post(API_URL + '/' + moduleID +'/questions', formData, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    }
  });
}

export const getAlgorithmicModule = (moduleID) => {
  return axios.get(API_URL+'/'+moduleID+'/questions',{
    headers:{...authHeader()}
  });
}