import { Box, Button } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
const DropAlgorithmic = (props) => {

    const {setAlgorithmicQuestions,eventID,questionID,handleDropAlgorithmic} = props;

  return (
    <Box>
        <Button color='danger' onClick={() => handleDropAlgorithmic(eventID,questionID)}>
          <DeleteIcon />  
        </Button> 
    </Box>
  )
}

export default DropAlgorithmic