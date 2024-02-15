import { Box, Button, Dialog, DialogContent, DialogTitle,Stepper,Step,StepLabel, Grid, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateChallenge from '../../../components/Challenge/CreateChallenge'
import ListAlgorithmic from '../../../components/questions/algorithmic/ListAlgorithmic';
import * as yup from "yup"
import { getCurrentUser } from '../../../services/auth.service';
import { createChallenge, getChallengesUser } from '../../../services/challenge.service';
import ChallengeCardUD from '../../../components/Challenge/ChallengeCardUD';
import { useNavigate } from 'react-router-dom';



const ChallengeManagementRecruiter = () => {

    const user = getCurrentUser();
    const id = user.id;
    console.log(id)
    const [challenges,setChallenges] = useState([]);
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await getChallengesUser();
          console.log(response.data);
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
      
        <Button onClick={handleOpen} variant='outlined' sx={{marginLeft:"20px"}}>new Challenge</Button>
        <CreateChallenge open={open} handleClose={handleClose}
        challenges={challenges} setChallenges={setChallenges}/>
      <Box mt={4} display='flex' flexDirection="row">
          <Grid container spacing={1}>
          
        {challenges && challenges.map((challenge) => (
          <Grid item md={4} xs={12}>
          <ChallengeCardUD 
          key={challenge._id}
          title={challenge.title}
          challengeID={challenge._id}
          duration={challenge.duration}
          poster={challenge.poster}
          description={challenge.description}/>
        </Grid>
        ))}
          
        </Grid>
      </Box>
    </Box>
  )
}

export default ChallengeManagementRecruiter