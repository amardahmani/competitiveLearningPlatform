import { Box, Button,Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditJob from './EditJob';
import { useNavigate } from 'react-router-dom';
import { deleteJob } from '../../services/job.service';
import { toast } from 'react-toastify';

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


const DeleteJobModal = (props) => {
    const {open,handleClose} = props;
    const navigate = useNavigate();
    const handleDelete = (id) => {
      deleteJob(id).then((response) => {
        toast('Your job Offer has been created successfully!', {
          type: 'success',
          autoClose: true,
          position: 'top-right',
        });
        navigate('/jobs/');
      }).catch((err) => {
        console.log(err);
      })
    }

    return (
      <Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography variant="h3">Do you want to delete you job</Typography>
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleDelete} variant='contained'>Confirm</Button>
            <Button onClick={handleClose} variant='outlined'>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
}

const CardUD = ({job}) => {
    

    const [openEdit,setOpenEdit] = useState(false);
    const [openDelete,setOpenDelete] = useState(false);

    const handleOpenEdit = () => {
      setOpenEdit(true);
    }

    const handleCloseEdit = () => {
      setOpenEdit(false);
    }

    const handleOpenDelete = () => {
      setOpenDelete(true);
    }

    const handleCloseDelete = () => {
      setOpenDelete(false);
    }

  return (
    <Card display="flex" sx={{padding:2}}>
        <Button color='success' size="medium" onClick={handleOpenEdit}><EditIcon /></Button>
        <Button color='danger' size="medium" onClick={handleOpenDelete}><DeleteIcon /></Button>
        <Button color='primary' size="medium"><VisibilityIcon /></Button>
        <EditJob open={openEdit} handleClose={handleCloseEdit}
        job={job}/>
        <DeleteJobModal open={openDelete} handleClose={handleCloseDelete} />
    </Card>
  )
}

export default CardUD