import { Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import React from 'react'
import * as yup from "yup"

const joinChallengeSchema = yup.object().shape({
  teamName: yup.string().required("enter the team name"),
  playerOneFirstName: yup.string().required("enter your first Name"),
  playerOneSecondName: yup.string().required("enter your Second name"),
  playerOneEmail: yup.string().email("invalid email").required("enter your email"),
})

const initialjoinValues = {
  teamName:"",
  playerOneFirstName:"",
  playerOneSecondName:"",
  playerOneEmail:"",
  playerTwoFirstName:"",
  playerTwoSecondName:"",
  playerTwoEmail:"",
  playerThreeFirstName:"",
  playerThreeSecondName:"",
  playerThreeEmail:"",
  
}

const JoinChallenge = () => {
  return (
    <Box display="flex" flexDirection="column"
    maxWidth={900}
    alignItems="center"
    justifyContent={"center"}
    margin="auto"
    marginTop={5}
    padding={3}
    borderRadius={5}>
        <Typography variant='h2'>Join a Challenge: </Typography>
        <Typography variant='span'>Enter your team members: </Typography>
        <Box>
        
          <form>
            <Box>
              <TextField margin='normal' variant='outlined' label="team name" name='team'/>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="space-between">
              <TextField margin='normal' variant='outlined' label="First name" name='playerOneFirstName'/>
              <TextField margin='normal' variant='outlined' label="Second name"/>
              <TextField margin='normal' variant='outlined' label="email"/>
            </Box>
            <Box>
              <TextField margin='normal' variant='outlined' label="First name"/>
              <TextField margin='normal' variant='outlined' label="First name"/>
              <TextField margin='normal' variant='outlined' label="First name"/>
            </Box>
            <Box>
              <TextField margin='normal' variant='outlined' label="First name"/>
              <TextField margin='normal' variant='outlined' label="First name"/>
              <TextField margin='normal' variant='outlined' label="First name"/>
            </Box>
            <Checkbox>I accept conditions and requirements</Checkbox>
            <Button>Join challenge</Button>
          </form>
        </Box>
    </Box>
  )
}

export default JoinChallenge