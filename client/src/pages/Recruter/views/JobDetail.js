import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ListAlgorithmic from '../../../components/questions/algorithmic/ListAlgorithmic'

import Instructors from '../../../components/tables/Instructors'

import { useLocation, useParams } from 'react-router-dom'
import CardUD from '../../../components/jobs/CardUD'
import CreateAlgorithmic from '../../../components/questions/algorithmic/CreateAlgorithmic'
import { createAlgorithmic } from '../../../services/questions.service'
import { getCurrentUser } from '../../../services/auth.service'
import { getJobAlgorithmicProblems, getJobInstructors, getJobNonInstructors, pushAlgorithmicJob, pushInstructor, removeInstructor } from '../../../services/job.service'
import AddInstructorDialog from '../../../components/users/AddInstructorDialog'
import QuestionLibrary from '../../../components/questions/algorithmic/QuestionLibrary'
const JobDetail = (props) => {
  const user = getCurrentUser();
  const id = user.id;
  
  const [open,setOpen] = useState(false);
  const [openLibrary,setOpenLibrary] = useState(false);
  const [openAddInstructor,setOpenAddInstructor] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [savedInstructors, setSavedInstructors] = useState([]);
  const params = useParams();
  const jobID = params.jobID;
  const [algorithmicQuestions,setAlgorithmicQuestions] = useState([]);
  const {state} = useLocation();
  const [job,setJob] = useState(state);
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

  const handleOpenAddInstructor = () => {
    setOpenAddInstructor(true);
  }

  const handleCloseAddInstructor = () => {
    setOpenAddInstructor(false);
  }

  const handleSave = (instructor) => {
    const instructorId = instructor._id;
    pushInstructor(jobID,instructorId).then((response) => {
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
  
    removeInstructor(jobID, instructorId)
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

  useEffect(() => {
    const fetchData = async () => {
      try{
        const nonInstructorsResponse = await getJobNonInstructors(jobID);
        const nonInstructors = nonInstructorsResponse.data;
  
        const savedInstructorsResponse = await getJobInstructors(jobID);
        const savedInstructors = savedInstructorsResponse.data;
        const questionsResponse = await getJobAlgorithmicProblems(jobID);
        const questions = questionsResponse.data;
        setAlgorithmicQuestions(questions);
        setInstructors(nonInstructors);
        setSavedInstructors(savedInstructors);
      }catch(err){
        console.log(err)
      }
    };
    fetchData()
  },[])
  console.log(algorithmicQuestions)
  const addAlgorithmicQuestion = (algorithmicQuestions,problem) => {
    setAlgorithmicQuestions([...algorithmicQuestions, problem]);
  }
  
  const pushAlgorithmicQuestion = (jobID,questionID) => {
    return pushAlgorithmicJob(jobID,questionID);
  }

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
      const problemId = response.data.algorithmic._id;
      const jobData = new FormData();
      jobData.append('jobID',jobID);
      jobData.append('problem',problemId);

      pushAlgorithmicJob(jobData).then((response) => {
        console.log(response.data);
      })
    })
  }

  

  return (
    
        <Box sx={{display:'flex',flexDirection:"row"}}>
          
          <Box width="70%">
            <Button variant='contained' onClick={handleOpen}
            sx={{marginLeft:"10px",marginRight:"10px"}}>New Question</Button>
            Or   <Button sx={{marginLeft:"10px"}} variant='outlined' onClick={handleOpenLibrary}>Import Questions</Button>
            <CreateAlgorithmic 
            open={open} 
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            />

            <QuestionLibrary
              open={openLibrary}
              handleCloseLibrary={handleCloseLibrary}
              eventID={jobID}
              algorithmicQuestions={algorithmicQuestions}
              addAlgorithmicQuestion={addAlgorithmicQuestion}
              pushAlgorithmicQuestion={pushAlgorithmicQuestion}
              />
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
            <Button variant='contained' sx={{marginTop:"10px",marginLeft:"10px"}}
              onClick={handleOpenAddInstructor}>Add instructor</Button>
            <Card variant="outlined" sx={{width:"100%"}}>
              
            <Instructors 
            instructors={savedInstructors} nonInstructors={instructors}
            handleDelete={handleDelete}
            />
            <AddInstructorDialog
            open={openAddInstructor} 
            instructors={savedInstructors} 
            nonInstructors={instructors}
            handleClose={handleCloseAddInstructor}
            handleSave={handleSave}
            />
        </Card>
          </Box>
        <Box mt={4} ml={3}>
            <CardUD
            job={job}/>
            
        </Box>
        
        </Box>
  )
}

export default JobDetail