import { Box, Button, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PathCardDeveloper = ({pathID}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pathID)
    console.log(pathID);
  } 

  return (
    <Box sx={{display:"flex",background:"hsla(0,0%,95%,.4)",justifyContent:"space-between",alignItems:"flex-start"}} width="100%">
                    <Box sx={{position:'relative'}} mt={4} ml={2} mb={2}>
                    <CircularProgress
                        
                        variant="determinate"
                        size="3rem"
                        thickness={5}
                        value={50}
                    />
                    <Typography
                    variant="h6"
                    component="div"
                    style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    }}
                    
                    >
                    50%
                    </Typography>
                    </Box>
                    <Box width="50%" mt={5}>
                        <Button variant='outlined' sx={{color:'primary'}}
                        onClick={handleClick}>Practice</Button>
                    </Box>
                </Box>
  )
}

export default PathCardDeveloper