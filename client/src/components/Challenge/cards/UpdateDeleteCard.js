import EditChallenge from '../EditChallenge';
import { Box, Button,Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { deleteChallenge } from '../../../services/challenge.service';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../../services/auth.service';



const DeleteChallengeModal = (props) => {

    const navigate = useNavigate();
    const {challengeID,open,handleClose} = props;
    const role = getCurrentUser().role;
    const handleDelete = () => {
      deleteChallenge(challengeID).then(() => {
        toast.success('the challenge has been deleted Successfully', {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast--success',
          progressClassName: 'toast__progress--success',
        });
        const redirectPath = role === 'INSTRUCTOR'
        ? '/instructor/challenge'
        : '/recruiter/challenges'; // Different redirect for different roles
        navigate(redirectPath);
        handleClose();
      }).catch((err) => {
        console.log(err);
      })
        
    }

    return (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography variant='h3'>Delete Challenge</Typography>
          </DialogTitle>
          <DialogContent>
            do you want to delete this challenge
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button variant='contained' onClick={handleDelete}>Confirm</Button>
          </DialogActions>
        </Dialog>
    )
}


const UpdateDeleteCard = ({challenge}) => {
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
        <EditChallenge open={openEdit} handleClose={handleCloseEdit}
        challenge={challenge}/>
        <DeleteChallengeModal open={openDelete} handleClose={handleCloseDelete} 
        challengeID={challenge.challengeID}/>
    </Card>
  )
}


export default UpdateDeleteCard;