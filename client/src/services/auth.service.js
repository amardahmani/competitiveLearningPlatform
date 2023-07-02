import axios from "axios";

const API_URL = "http://localhost:3001/auth/";

const headers = {
    'Content-Type': 'application/json',
  }
  
export const register = (data) => {
    return axios.post(API_URL+"register",data,{
        headers: headers
    });
}

export const login = (data) => {
    return axios
      .post(API_URL + "login",data,{headers})
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

  export const verifyEmail = (email) => {
    return axios.post(API_URL+"verifyEmail",{
        email,
    })
  }

  export const verifyCode = (code) => {
    return axios.post(API_URL+"verifyCode",{
        code
    })
  }

export const logout = () => {
    localStorage.removeItem("user");
  };

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
  