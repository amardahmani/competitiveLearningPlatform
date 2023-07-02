import { Box } from '@mui/material';
import React, { useState } from 'react'
import PathTabs from '../../../components/learningPath/PathTabs';

const ModuleDetail = () => {

    const [tutorials,setTutorials] = useState([]);
    const [problems,setProblems] = useState([]);


  return (
    <Box display="flex" flexDirection="column">
        <PathTabs tutorials={tutorials} problems={problems}/>
        
        
    </Box>
  )
}

export default ModuleDetail