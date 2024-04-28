import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import ListAlgorithmic from '../../../components/questions/algorithmic/ListAlgorithmic'
import { useLocation, useParams } from 'react-router-dom'
import {dropAlgorithmicChallenge, getChallengeQuestions, getInstructors, getNonInstructors, pushAlgorithmicChallenge, pushInstructor, removeInstructor } from '../../../services/challenge.service'
import Instructors from '../../../components/tables/Instructors'
import AddInstructorDialog from '../../../components/users/AddInstructorDialog'

import QuestionLibrary from '../../../components/questions/algorithmic/QuestionLibrary'
import UpdateDeleteCard from '../../../components/Challenge/cards/UpdateDeleteCard'

import { useContext, useEffect, useState } from 'react'
import DropAlgorithmic from '../../../components/questions/algorithmic/Buttons/DropAlgorithmic'
import { toast } from 'react-toastify'
import { ChallengesContext } from '../../../hooks/ChallengesContext'
const ChallengeDetail = (props) => {
  const { updateChallenges,deleteChallengeClient } = useContext(ChallengesContext);
  const [openLibrary,setOpenLibrary] = useState(false);
  const [openAddInstructor,setOpenAddInstructor] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [savedInstructors, setSavedInstructors] = useState([]);
  const params = useParams();
  const challengeID = params.challengeID;
  const [algorithmicQuestions,setAlgorithmicQuestions] = useState([]);
  
  const {state} = useLocation();
  const challenge = state.challenge;



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
    pushInstructor(challengeID,instructorId).then((response) => {
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

  const handleDropAlgorithmic = (challengeID,questionID) => {
    dropAlgorithmicChallenge(challengeID,questionID).then((response) => {
      toast(response.data.message, {
        type: 'success',
        autoClose: true,
        position: 'top-right',
      });

      setAlgorithmicQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q._id !== questionID)
      );
    }).catch((error) => {console.log(error)});
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        const nonInstructorsResponse = await getNonInstructors(challengeID);
        const nonInstructors = nonInstructorsResponse.data;
  
        const savedInstructorsResponse = await getInstructors(challengeID);
        const savedInstructors = savedInstructorsResponse.data;
        const questionsResponse = await getChallengeQuestions(challengeID);
        const questions = questionsResponse.data.algorithmicQuestions;
        setAlgorithmicQuestions(questions);
        setInstructors(nonInstructors);
        setSavedInstructors(savedInstructors);
      }catch(err){
        console.log(err)
      }
    };
    fetchData()
  },[])
  const addAlgorithmicQuestion = (algorithmicQuestions,problem) => {
    setAlgorithmicQuestions([...algorithmicQuestions, problem]);
  }

  const pushAlgorithmicQuestion = (challengeID,questionID) => {
    return pushAlgorithmicChallenge(challengeID,questionID);
  }

  return (
    <Box sx={{display:'flex',flexDirection:"row"}}>
          
    <Box width="70%">
      <Button sx={{marginLeft:"10px"}} variant='contained' onClick={handleOpenLibrary}>Import Questions</Button>
      

      <QuestionLibrary
        open={openLibrary}
        handleCloseLibrary={handleCloseLibrary}
        eventID={challengeID}
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
                DropAlgorithmic={DropAlgorithmic}
                eventID={challengeID}
                handleDropAlgorithmic={handleDropAlgorithmic}
                challengeID={challengeID}
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
      
  <UpdateDeleteCard 
      challenge={challenge}
      updateChallenges={updateChallenges}
      deleteChallengeClient={deleteChallengeClient}
    /> 
  </Box>
    
  </Box>
  )
}

export default ChallengeDetail