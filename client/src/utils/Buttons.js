import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import CreateAlgorithmic from '../components/questions/algorithmic/CreateAlgorithmic';

const Buttons = (props) => {

    const {id,handleCreate} = props;

    const [open,setOpen] = useState(false);
    const [openLibrary,setOpenLibrary] = useState(false);
    
    const handleOpen = () => {
      setOpen(true);
    }
    
    const handleClose = () => {
      setOpen(false);
    }
  
    const handleOpenLibrary = () => {
      setOpenLibrary(true);
      console.log(openLibrary)
    }
    const handleCloseLibrary = () => {
      setOpenLibrary(false);
    }

  return (
    <>
    <Button onClick={handleOpen} variant='outlined'>Add a new question</Button><br></br>
      <Typography mt={2}>or import from our problem library<Button onClick={handleOpenLibrary}>
        import problems </Button> </Typography>
      <CreateAlgorithmic
      id={id}
      algorithmicQuestions={algorithmicQuestions}
      open={open} setOpen={setOpen} 
      handleClose={handleClose}
      handleCreate={handleCreate}
      />
      <QuestionLibrary 
      id={id}
      algorithmicQuestions={algorithmicQuestions}
      open={openLibrary} handleCloseLibrary={handleCloseLibrary}
      />
      </>
  )
}

export default Buttons