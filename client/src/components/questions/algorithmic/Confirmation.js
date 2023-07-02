import { Box, Button, Typography, useTheme } from '@mui/material'
import React from 'react'

const Confirmation = (props) => {
    const theme = useTheme();

    const handleCreateChallenge = props.handleCreateChallenge;
  return (
    <Box p={5}>
        <Typography variant='h3' align='center'>Do you want to create this challenge</Typography>
        <Box display="flex" justifyContent="space-around" mt={5}>
            <Button 
            sx={{backgroundColor: theme.palette.primary.main,color:'#fff'}}
            
            onClick={handleCreateChallenge}>Confirm</Button>
            <Button >Cancel</Button>
        </Box>
    </Box>
  )
}

export default Confirmation