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
import EditChallenge from '../../../components/Challenge/EditChallenge'
import QuestionLibrary from '../../../components/questions/algorithmic/QuestionLibrary'
const ChallengeDetail = (props) => {

  const [openCreate,setOpenCreate] = useState(false);
  const [questions,setQuestions] = useState([]);
  const [open,setOpen] = useState(false);
  const [openLibrary,setOpenLibrary] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [savedInstructors, setSavedInstructors] = useState([]);
  const params = useParams();
  const challengeID = params.challengeID;
  useEffect(() => {
    const fetchData = async () => {
      try{
        const nonInstructorsResponse = await getNonInstructors(params.challengeID);
        const nonInstructors = nonInstructorsResponse.data;
  
        const savedInstructorsResponse = await getInstructors(params.challengeID);
        const savedInstructors = savedInstructorsResponse.data;
        const questionsResponse = await getChallengeQuestions(params.challengeID);
        const questions = questionsResponse.data;
        setQuestions(questions.algorithmicQuestions);
        setInstructors(nonInstructors);
        setSavedInstructors(savedInstructors);
      }catch(err){
        console.log(err)
      }
    };
    fetchData()
  },[])
  

  const removeQuestion = (id) => {

  }

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
    setOpenLibrary(true);
  }

  const handleCloseLibrary = () => {
    setOpenLibrary(false);
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

  const pushAlgorithmicQuestion = (algorithmicQuestions,problem) => {
    setQuestions([...algorithmicQuestions, problem]);
  }


  const handleOpenCreate = () => {
    setOpenCreate(true);
  }
  const handleCloseCreate = () => {
    setOpenCreate(false);
  }
  return (
        <Box sx={{display:'flex',flexDirection:'column'}}>
        
        <Card variant="outlined" sx={{width:"90%",margin:"10px auto"}}>
        <Box display="flex">
        <Button variant='contained' onClick={handleOpen}
        sx={{marginTop:"10px",marginLeft:"10px"}}
        >Create new question</Button>
        <Typography variant='h3' sx={{marginTop:"10px",marginLeft:"10px"}}>or</Typography>
        <Button variant='outlined'
        sx={{marginTop:"10px",marginLeft:"10px"}} onClick={handleOpenLibrary}>import question</Button>
        </Box>
        <QuestionLibrary 
        open={openLibrary}
        handleCloseLibrary={handleCloseLibrary}
        challengeID={challengeID}
        algorithmicQuestions={questions}
        pushAlgorithmicQuestion={pushAlgorithmicQuestion}
        />
        <CreateAlgorithmic 
        handleSubmit={handleSubmit}
        open={open} handleClose={handleClose} 
        algorithmicQuestions={questions}/>
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
            
              <ListAlgorithmic 
              algorithmicQuestions={questions}
              
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
        
        <Box sx={{width:"91%",margin:"10px auto"}}>
            <EditChallenge />
        </Box>
        
        </Box>
  )
}

export default ChallengeDetail