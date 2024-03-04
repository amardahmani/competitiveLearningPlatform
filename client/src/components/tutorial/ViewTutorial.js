import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React, { useState } from 'react'


const ReadModal = ({tutorial,open,handleClose}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography variant='h4'>{tutorial.title}</Typography>
            </DialogTitle>
            <DialogContent>
            <div dangerouslySetInnerHTML={{ __html: tutorial.description }} />
            </DialogContent>
        </Dialog>
    )
}


const ViewTutorial = ({tutorial}) => {

    const [open,setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

  return (
    <>
        <Button variant='outlined' onClick={handleOpen}>READ</Button>
        <ReadModal open={open} handleClose={handleClose} tutorial={tutorial}/>
    </>
  )
}

export default ViewTutorial