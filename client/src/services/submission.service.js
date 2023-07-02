import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/submissions";

const config = {
    headers:{
        'Content-Type': 'application/json',
        ...authHeader()
    }
}

export const createSubmission = (submission) => {
    return axios.post(API_URL,submission,config)
}