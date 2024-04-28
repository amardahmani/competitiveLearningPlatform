import { Box, Button,Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditJob from './EditJob';
import { useNavigate } from 'react-router-dom';
import { deleteJob } from '../../services/job.service';
import { toast } from 'react-toastify';
import { JobsContext } from '../../hooks/JobsContext';



const DeleteJobModal = (props) => {
    const {open,handleClose,job} = props;
    const {deleteJobState} = useContext(JobsContext)
    const navigate = useNavigate();
    const handleDelete = () => {
      deleteJob(job._id).then((response) => {
        toast(response.data.message, {
          type: 'success',
          autoClose: true,
          position: 'top-right',
        });
        deleteJobState(job._id);
        navigate('/recruiter/jobs');
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
        <DeleteJobModal open={openDelete} handleClose={handleCloseDelete} job={job}/>
    </Card>
  )
}

export default CardUD