import { Box, Button } from '@mui/material'
import React, { useState } from 'react'

const CreateLesson = (props) => {

    const [open,setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(true);
    }

  return (
    <Box>
        <Button variant='contained'>Create a lesson</Button>
    </Box>
  )
}

export default CreateLesson