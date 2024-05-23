import axios from "axios";

const API_URL = "http://localhost:3001/plan";
const headers = {
    'Content-Type': 'application/json',
  }

export const planEvent = (plan) => {
    return axios.post(API_URL,plan,{
        headers:headers
    });
}

export const getPlannedEvents = () => {
    return axios.get(API_URL)
}

export const getPlannedCompetitions = () => {
    return axios.get(API_URL + '/competitions');
}