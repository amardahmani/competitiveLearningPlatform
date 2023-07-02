import { Box, Button,Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditJob from './EditJob';

const UpdateModal = (props) => {

  const {handleCloseUpdate,openUpdate,initialValues} = props;
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {

  }
  return (
    <Dialog open={openUpdate} onClose={handleCloseUpdate} aria-labelledby="update-dialog-title">
      <DialogTitle id="update-dialog-title">Update Dialog</DialogTitle>
      <DialogContent>
        
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Positions"
            name="positions"
            value={formData.positions}
            onChange={handleChange}
            fullWidth
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseUpdate} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
    )
}

const CardUD = (props) => {
    const {jobID} = props;

    const [open,setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    }

  return (
    <Card display="flex" sx={{padding:2}}>
        <Button color='success' size="medium" onClick={handleOpen}><EditIcon /></Button>
        <Button color='danger' size="medium"><DeleteIcon /></Button>
        <Button color='primary' size="medium"><VisibilityIcon /></Button>
        <EditJob open={open} handleClose={handleClose}/>
    </Card>
  )
}

export default CardUD