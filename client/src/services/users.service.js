import axios from "axios";

const API_URL = "http://localhost:3001/users";

export const getUsers = () => {
    return axios.get(API_URL);
}

export const createUser = (user) => {
    return axios.post(API_URL,user,{
        headers:{
          'Content-Type': 'application/json',
        }})
}

export const deleteUser = (id) => {
    return axios.delete(API_URL+'/'+id,{headers:{'Content-Type': 'application/json',}})
}

export const updateUser = (user,id) => {
    return axios.put(API_URL+'/'+id,user,{
        headers:{
          'Content-Type': 'application/json',
        }})
}