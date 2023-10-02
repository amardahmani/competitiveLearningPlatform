import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ListAlgorithmic from '../../../components/questions/algorithmic/ListAlgorithmic'
import ChallengeCardUD from '../../../components/Challenge/ChallengeCardUD'
import ProblemSetters from '../../../components/Challenge/ProblemSetters'
import { useParams } from 'react-router-dom'
import { getChallenge, getChallengeQuestions } from '../../../services/challenge.service'
import CreateAlgorithmic from '../../../components/questions/algorithmic/CreateAlgorithmic'
import QuestionLibrary from '../../../components/questions/algorithmic/QuestionLibrary'
const ChallengeDetailRecruiter = (props) => {

  const [challengeDetail,setChallengeDetail] = useState([]);
  const params = useParams();
  const challengeID = params.challengeID;
  const [questions,setQuestions] = useState([]);
  const [open,setOpen] = useState(false);
  const [openLibrary,setOpenLibrary] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await getChallengeQuestions(challengeID);
        setQuestions(response.data);
        console.log(response.data);
      }catch(err){
        console.log(err)
      }
    };
    fetchData()
  },[])
  const {algorithmicQuestions} = questions;
  console.log(algorithmicQuestions)


  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append('title',values.title);
    formData.append('description',values.description);
    formData.append('input',values.input);

    console.log(formData);
  }

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
        const response = await getChallenge(challengeID);
        console.log(response.data);
        setChallengeDetail(response.data);
      }catch(error){
        console.log();
      }
    };
    fetchData();
  },[]);

  return (
        <Box sx={{display:'flex',flexDirection:'column'}}>
        
        <Card variant="outlined" sx={{width:"60%",marginRight:"10px"}}>
        <Button variant='contained' onClick={handleOpen}
        sx={{marginTop:"10px",marginLeft:"10px"}}
        >Create new question</Button> or 
        <Button variant='outlined'>import</Button>
        <CreateAlgorithmic 
        handleSubmit={handleSubmit}
        open={open} handleClose={handleClose} 
        algorithmicQuestions={algorithmicQuestions}/>
        <QuestionLibrary />
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
              <ListAlgorithmic challengeID={challengeID} 
              algorithmicQuestions={algorithmicQuestions}
              handleSubmit={handleSubmit}
              />

          </Box>
        </CardContent>
        </Card>
        <Box mt={4}>
            <ChallengeCardUD/>
            <ProblemSetters />

        </Box>
        
        </Box>
  )
}

export default ChallengeDetailRecruiter;