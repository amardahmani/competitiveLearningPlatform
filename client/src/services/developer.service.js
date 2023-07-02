import axios from "axios";

const API_URL = "http://localhost:3001/dev";
const headers = {
    'Content-Type': 'application/json',
}
export default getDeveloperID = (user) => {
    return axios.get(API_URL,{
        headers:headers
    });
}