import { Box, Button, Dialog, DialogContent, DialogTitle,Stepper,Step,StepLabel, Grid, Modal, Typography, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateChallenge from '../../../components/Challenge/CreateChallenge'
import ListAlgorithmic from '../../../components/questions/algorithmic/ListAlgorithmic';
import * as yup from "yup"
import { getCurrentUser } from '../../../services/auth.service';
import { createChallenge, getChallengesUser } from '../../../services/challenge.service';
import ChallengeCardUD from '../../../components/Challenge/ChallengeCardUD';
import { useNavigate } from 'react-router-dom';
 

const ChallengeManagementInstructor = () => {

    const user = getCurrentUser();
    const id = user.id;
    const [challenges,setChallenges] = useState([]);
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await getChallengesUser();
          setChallenges(response.data);
        }catch(error){
          console.log();
        }
      };
      fetchData();
    },[]);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    }

  return (
    <Box>
      
        <Button onClick={handleOpen} variant='contained' sx={{marginLeft:"20px"}}>New Challenge</Button>
      <Box mt={4} display='flex' flexDirection="row">
          <Grid container spacing={1}>
          <CreateChallenge 
          open={open}
          handleClose={handleClose}
          setChallenges={setChallenges}/>
        {challenges && challenges.map((challenge) => (
          <Grid item md={4} xs={12}>
          <ChallengeCardUD 
          key={challenge._id}
          title={challenge.title}
          challengeID={challenge._id}
          image={challenge.poster}/>
        </Grid>
        ))}
          
        </Grid>
      </Box>
    </Box>
  )
}

export default ChallengeManagementInstructor