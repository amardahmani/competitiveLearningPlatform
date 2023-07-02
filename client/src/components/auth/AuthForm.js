import React, { useEffect, useState } from 'react'
import { Formik } from "formik";
import * as yup from 'yup';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from '../../lib/displays/FlexBetween';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, login,register } from '../../services/auth.service';


const registerSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName:yup.string().required('required'),
    email: yup.string().email("invalid email").required("required"),
    password:yup.string().required('required'),
    username:yup.string().required('required'),
})

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  username:"",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const AuthForm = () => {
  
  const [message,setMessage] = useState("");
  const [user,setUser] = useState(undefined);
  const navigate = useNavigate("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  
  const handleRegister =  (values,onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    console.log(formData)
    const savedUserResponse =  register(formData);
        
   onSubmitProps.resetForm();

    if (savedUserResponse) {
      setPageType("login");
    }
  }

  
  

  const handleLogin = (values, onSubmitProps) => {
    

    login(JSON.stringify(values)).then(() => {
      const user = getCurrentUser();
      setUser(user);
      if(user.role==="ADMIN"){
        navigate("/admin/dashboard");
      }
      if(user.role === "DEVELOPER"){
        navigate("/developer/dashboard")
      }
      if(user.role === "INSTRUCTOR"){
        navigate("/instructor/dashboard");
      }
      if(user.role === "RECRUITER"){
        navigate("/recruiter/dashboard");
      }
      if(user.role === "ANALYST"){
        navigate("/analyst/dashboard/")
      }
      window.location.reload();
    },(error) => {
      const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setMessage(resMessage);
    })

  }

  const handleFormSubmit =  (values, onSubmitProps) => {
    if (isLogin)  handleLogin(values, onSubmitProps);
    if (isRegister)  handleRegister(values, onSubmitProps);
  };
  return (
    <Formik
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                
                <TextField
              label="username"
              type="username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{ gridColumn: "span 4" }}
            />
                
              </>
            )}
            
              
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              variant='contained'
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                color:"primary"
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default AuthForm;