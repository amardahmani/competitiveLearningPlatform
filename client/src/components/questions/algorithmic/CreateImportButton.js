import { Box, Button } from '@mui/material'
import React from 'react'

const CreateImportButton = () => {
  return (
    <Box>
        <Button onClick={handleOpen} variant='outlined'>Add a new question</Button><br></br>
      <Typography mt={2}>or import from our problem library<Button onClick={handleOpenLibrary}>
        import problems </Button> </Typography>
      <CreateAlgorithmic 
      id={challengeID}
      algorithmicQuestions={algorithmicQuestions}
      open={open} setOpen={setOpen} 
      handleClose={handleClose}
      />
      <QuestionLibrary 
      challengeID={challengeID}
      algorithmicQuestions={algorithmicQuestions}
      open={openLibrary} handleCloseLibrary={handleCloseLibrary}
      />
    </Box>
    )
}

export default CreateImportButton