import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteAlgorithmicQuestion } from '../../../../services/questions.service';
import { toast } from 'react-toastify';

const DeleteAlgorithmicDialog = (props) => {
    const { setAlgorithmicQuestions, handleClose, questionID,open } = props;
    console.log('qustionID', questionID);  
    const handleDelete = () => {
      try {

        deleteAlgorithmicQuestion(questionID).then((response) => {
          toast(response.data.message, {
            type: 'success',
            autoClose: true,
            position: 'top-right',
          });
          setAlgorithmicQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q._id !== questionID)
          );
        });

        handleClose(); 
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    };
  
    return (
      <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                  <Typography variant='h3'>Do you want to delete the question ?</Typography>
              </DialogTitle>
              <DialogActions>
                  <Button variant='contained' onClick={handleDelete}>Confirm</Button>
                  <Button variant='outlined' onClick={handleClose}>Cancel</Button>
              </DialogActions>
          </Dialog>
    );
  };

const DeleteUpdateAlgorithmic = (props) => {

    const {handleClose,open,setAlgorithmicQuestions,questionID} = props;

    const [openDelete,setOpenDelete] = useState(false);

    const handleOpenDelete = () => {
        setOpenDelete(true);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
  return (
    <Box>
        <Button color='danger' onClick={handleOpenDelete}><DeleteIcon /></Button>
        <DeleteAlgorithmicDialog 
        open={openDelete} handleClose={handleCloseDelete}
        questionID={questionID}
        setAlgorithmicQuestions={setAlgorithmicQuestions}
        />
        <Button color='success'><EditIcon /></Button>
    </Box>
  )
}

export default DeleteUpdateAlgorithmic