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

export const getModules = (pathID) => {
    return axios.get(API_URL+"/"+pathID);
}

export const deleteModule = (moduleID) => {
  return axios.delete(API_URL+'/'+moduleID,{
    headers:{
      'Content-Type': 'application/json',

    }
  });
}