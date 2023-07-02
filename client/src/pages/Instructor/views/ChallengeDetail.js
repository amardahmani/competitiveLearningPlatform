import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ListAlgorithmic from '../../../components/questions/algorithmic/ListAlgorithmic'
import ChallengeCardUD from '../../../components/Challenge/ChallengeCardUD'
import ProblemSetters from '../../../components/Challenge/ProblemSetters'
import { useParams } from 'react-router-dom'
import { getChallenge, getChallengeQuestions, getInstructors, getNonInstructors, pushInstructor, removeInstructor } from '../../../services/challenge.service'
import CreateAlgorithmic from '../../../components/questions/algorithmic/CreateAlgorithmic'
import Instructors from '../../../components/tables/Instructors'
import AddInstructorDialog from '../../../components/users/AddInstructorDialog'
const ChallengeDetail = (props) => {

  const [openCreate,setOpenCreate] = useState(false);
  const [questions,setQuestions] = useState([]);
  const [open,setOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [savedInstructors, setSavedInstructors] = useState([]);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const nonInstructorsResponse = await getNonInstructors(params.challengeID);
        const nonInstructors = nonInstructorsResponse.data;
  
        const savedInstructorsResponse = await getInstructors(params.challengeID);
        const savedInstructors = savedInstructorsResponse.data;
        const questionsResponse = await getChallengeQuestions(params.challengeID);
        const questions = questionsResponse.data;
        setQuestions(questions);
        setInstructors(nonInstructors);
        setSavedInstructors(savedInstructors);
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
  const handleSave = (instructor) => {
    const instructorId = instructor._id;
    const challengeID = params.challengeID;
    pushInstructor(challengeID,instructorId).then((response) => {
      console.log(response);
      setInstructors((prevInstructors) =>
      prevInstructors.filter((prevInstructor) => prevInstructor._id !== instructor._id)
    );
    }).catch((err) => {
      console.log(err);
    })

    setSavedInstructors((prevInstructors) => [...prevInstructors, instructor]);
  }

  const handleDelete = (instructor) => {
    const challengeID = params.challengeID;
    const instructorId = instructor._id;
  
    removeInstructor(challengeID, instructorId)
      .then((response) => {
        console.log(response);
  
        // Remove the instructor from the savedInstructors array
        setSavedInstructors((prevInstructors) =>
          prevInstructors.filter((prevInstructor) => prevInstructor._id !== instructor._id)
        );
      })
      .catch((error) => {
        console.log(error);
      });

      setInstructors((prevInstructors) => [...prevInstructors, instructor]);

  };
  const handleOpenCreate = () => {
    setOpenCreate(true);
  }
  const handleCloseCreate = () => {
    setOpenCreate(false);
  }
  return (
        <Box sx={{display:'flex',flexDirection:'column'}}>
        
        <Card variant="outlined" sx={{width:"90%",margin:"10px auto"}}>
        <Button variant='contained' onClick={handleOpen}
        sx={{marginTop:"10px",marginLeft:"10px"}}
        >Create new question</Button>
        <CreateAlgorithmic 
        handleSubmit={handleSubmit}
        open={open} handleClose={handleClose} 
        algorithmicQuestions={algorithmicQuestions}/>
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
              <ListAlgorithmic challengeID={params.challengeID} 
              algorithmicQuestions={algorithmicQuestions}
              handleSubmit={handleSubmit}
              />

          </Box>
        </CardContent>
        </Card>
        
        <Card variant="outlined" sx={{width:"90%",margin:"10px auto"}}>
              <Button variant='contained' sx={{marginTop:"10px",marginLeft:"10px"}}
              onClick={handleOpenCreate}>Add instructor</Button>
            <Instructors 
            instructors={savedInstructors} nonInstructors={instructors}
            handleDelete={handleDelete}
            />
            <AddInstructorDialog 
            open={openCreate} 
            instructors={savedInstructors} 
            nonInstructors={instructors}
            handleClose={handleCloseCreate}
            handleSave={handleSave}
            />
        </Card>
        

        
        </Box>
  )
}

export default ChallengeDetail