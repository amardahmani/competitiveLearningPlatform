import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import PathTabs from '../../../components/learningPath/PathTabs';
import { getTutorials } from '../../../services/gamifiedTutorial.service';
import { useParams } from 'react-router-dom';
import { getAlgorithmicModule } from '../../../services/module.service';
import ListProblems from '../../../components/questions/algorithmic/ListProblems';
import ViewTutorial from '../../../components/tutorial/ViewTutorial';

const ModuleDetail = () => {

    const [tutorials,setTutorials] = useState([]);
    const [algorithmicQuestions,setAlgorithmicQuestions] = useState([]);

    const {moduleID} = useParams();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const tutorialsResponse = await getTutorials(moduleID);
          setTutorials(tutorialsResponse.data.tutorials);
    
          const algorithmicQuestionsResponse = await getAlgorithmicModule(moduleID);
          setAlgorithmicQuestions(algorithmicQuestionsResponse.data.problems);
        } catch (err) {
          console.error(err);
        }
      };
    
      fetchData();
    }, [moduleID]);

  return (
    <Box display="flex" flexDirection="column">
        
        <PathTabs 
        ViewTutorial={ViewTutorial}
        tutorials={tutorials} 
        algorithmicQuestions={algorithmicQuestions} 
        ListProblems={ListProblems}/>
        
        
    </Box>
  )
}

export default ModuleDetail