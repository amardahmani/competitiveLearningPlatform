import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const LearnMore = ({pathID}) => {
    console.log(pathID)
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(pathID)
    }

  return (
    <Box sx={{display:"flex",background:"hsla(0,0%,95%,.4)",justifyContent:"flex-end"}} 
    width="100%" p={2}>
        <Button variant='outlined' float="right"
        onClick={handleClick}>Learn More</Button>

    </Box>
  )
}

export default LearnMore