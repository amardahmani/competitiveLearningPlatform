import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PathTabs from '../../../components/learningPath/PathTabs'
import ListAlgorithmic from '../../../components/questions/algorithmic/ListAlgorithmic'
import { useParams } from 'react-router-dom'
import CreateTutorial from '../../../components/tutorial/CreateTutorial'
import { getAlgorithmicQuestions, getTutorials } from '../../../services/gamifiedTutorial.service'
import QuestionLibrary from '../../../components/questions/algorithmic/QuestionLibrary'
import TutorialUpdateDelete from '../../../components/tutorial/TutorialUpdateDelete'
import { getAlgorithmicModule, pushAlgorithmicModule } from '../../../services/module.service'

const ButtonTutorial = (props) => {
  const {moduleID,setTutorials} = props;

  const [open,setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log("set Tutorials in button tutorial"+setTutorials)
  }

  const handleClose = () => {
    setOpen(false);
  }


  return (
    <Box>
      <Button variant='contained' onClick={handleOpen}>Create a new Tutorial</Button>

      <CreateTutorial open={open} handleClose={handleClose} moduleID={moduleID}
      setTutorials={setTutorials}/>
      
    </Box>
  )
}


const GamifiedTutorial = () => {
  const params = useParams();
  const moduleID = params.moduleID;

  const [tutorials,setTutorials] = useState([]);
  const [algorithmicQuestions,setAlgorithmicQuestions] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutorialsResponse = await getTutorials(moduleID);
        setTutorials(tutorialsResponse.data.tutorials);
  
        const algorithmicQuestionsResponse = await getAlgorithmicModule(moduleID);
        console.log(algorithmicQuestionsResponse);
        setAlgorithmicQuestions(algorithmicQuestionsResponse.data.problems);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, [moduleID]);
  
  return (
    <Box>
        <PathTabs 
        ButtonTutorial={ButtonTutorial}
        TutorialUpdateDelete={TutorialUpdateDelete}
        tutorials={tutorials}
        moduleID={moduleID}
        setTutorials={setTutorials}
        QuestionLibrary={QuestionLibrary}
        algorithmicQuestions={algorithmicQuestions}
        ListAlgorithmic={ListAlgorithmic}
        />
        
    </Box>
  )
}

export default GamifiedTutorial