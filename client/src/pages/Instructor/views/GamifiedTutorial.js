import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import PathTabs from '../../../components/learningPath/PathTabs'
import ListAlgorithmic from '../../../components/questions/algorithmic/ListAlgorithmic'
import { useParams } from 'react-router-dom'
import CreateAlgorithmic from '../../../components/questions/algorithmic/CreateAlgorithmic'
import CreateTutorial from '../../../components/tutorial/CreateTutorial'
const ButtonTutorial = () => {

  const [open,setOpen] = useState(false);
  

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


  return (
    <Box>
      <Button variant='contained' onClick={handleOpen}>Create a new Tutorial</Button>

      <CreateTutorial open={open} handleClose={handleClose}/>
    </Box>
  )
}

const Algorithmic = () => {
  const params = useParams();
  const [open,setOpen] = useState(false);
  const [algorithmicQuestions,setAlgorithmicQuestions] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Box>
      <Button variant='contained' onClick={handleOpen}>new gamified quest</Button>

      <ListAlgorithmic 
        algorithmicQuestions={algorithmicQuestions}
      />
      <CreateAlgorithmic open={open}
      handleClose={handleClose} 
      algorithmicQuestions={algorithmicQuestions}/>

    </Box>
  )
}

const GamifiedTutorial = () => {
  return (
    <Box>
        <PathTabs 
        ButtonTutorial={ButtonTutorial}

        Algorithmic={Algorithmic}
        />
        
    </Box>
  )
}

export default GamifiedTutorial