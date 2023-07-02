import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import AuthForm from './AuthForm';
const Auth = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        
        borderRadius="1.5rem"
        sx={{backgroundColor: (theme) =>
          `${theme.palette.background.default}!important`,
      boxShadow:"1px 1px 15px white"

      }}
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary" textAlign="center" mb={2}>
          DevCompete
        </Typography>
        <Typography fontWeight="100" variant="h6" sx={{ mb: "1.5rem" }} textAlign="center">
          Welcome to DevCompete, the Plateform that you can compete on and learn new developement skills!
        </Typography>
        <AuthForm/>
      </Box>
    </Box>
  )
}

export default Auth