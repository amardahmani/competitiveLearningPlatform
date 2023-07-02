import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ListAlgorithmic from '../../../components/questions/algorithmic/ListAlgorithmic'
import ChallengeCardUD from '../../../components/Challenge/ChallengeCardUD'
import ProblemSetters from '../../../components/Challenge/ProblemSetters'
import { useParams } from 'react-router-dom'
import { getChallenge, getChallengeQuestions } from '../../../services/challenge.service'
import CardUD from '../../../components/jobs/CardUD'
import CreateAlgorithmic from '../../../components/questions/algorithmic/CreateAlgorithmic'
import { createAlgorithmic } from '../../../services/questions.service'
import { getCurrentUser } from '../../../services/auth.service'
import { getJobAlgorithmicProblems, pushAlgorithmicJob } from '../../../services/job.service'
const JobDetail = (props) => {
  const user = getCurrentUser();
  const id = user.id;
  const [open,setOpen] = useState(false);
  const [openLibrary,setOpenLibrary] = useState(false);
  const params = useParams();
  const jobID = params.jobID;
  const [algorithmicQuestions,setAlgorithmicQuestions] = useState([]);
  console.log(algorithmicQuestions)

  const handleOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  }

  const handleOpenLibrary = () => {
    setOpen(true);
  }

  const handleCloseLibrary = () => {
    setOpen(false);
  }

  
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await getJobAlgorithmicProblems(jobID);
          console.log(jobID)
          setAlgorithmicQuestions(response.data);
          console.log(response.data);
        }
        catch(err){
          console.log(err);
        }
      };
      fetchData()
    },[])


  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('difficulty', values.difficulty);
    formData.append('points',values.points);
    formData.append('input', values.input);
    formData.append('expectedOutput', values.expectedOutput);
    formData.append('creator',id);

    createAlgorithmic(formData).then((response) => {
      console.log(response.data);
      const id = response.data.algorithmic._id;
      const jobData = new FormData();
      jobData.append('jobID',jobID);
      jobData.append('problem',id);

      pushAlgorithmicJob(jobData).then((response) => {
        console.log(response.data);
      })
    })
    
    
  }
  return (
        <Box sx={{display:'flex',flexDirection:"column"}}>
          <Box width="60%">
            <Button variant='contained' onClick={handleOpen}
            sx={{marginLeft:"10px"}}>New Question</Button>
          
          <CreateAlgorithmic open={open} handleClose={handleClose}
          handleSubmit={handleSubmit}/>
          <Card variant="outlined" sx={{width:"100%"}}>
        <CardContent>
          <Typography variant="h3" textAlign='center' mt={1}>List Questions</Typography>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
              <ListAlgorithmic  algorithmicQuestions={algorithmicQuestions}
              />

          </Box>
        </CardContent>
        </Card>
          </Box>
        <Box mt={4} ml={3}>
            <CardUD/>
            <ProblemSetters />

        </Box>
        
        </Box>
  )
}

export default JobDetail