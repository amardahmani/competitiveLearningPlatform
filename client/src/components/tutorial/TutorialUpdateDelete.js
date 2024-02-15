import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TableCell, TextField, Typography, responsiveFontSizes } from '@mui/material';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MyUploadAdapter from '../../utils/MyUploadAdapter'; 
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { deleteTutorial, updateTutorial } from '../../services/gamifiedTutorial.service';
import { toast } from 'react-toastify';

const editorConfig = {
    placeholder: 'Enter your description here',
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'insertTable',
      'undo',
      'redo',
      'imageUpload',
    ],
  };

const UpdateModal = (props) => {

    const {open,handleClose,moduleID,setTutorials,tutorial} = props;

    const tutorialID = tutorial._id;

    const [values, setValues] = useState({
        description: '',
        title:'',
      });
      const handleInputChange = (field, value) => {
        setValues((prevValues) => ({
          ...prevValues,
          [field]: value,
        }));
    };

    useEffect(() => {
      if (tutorial) {
          setValues({
              description: tutorial.description || '',
              title: tutorial.title || ''
          });
          
      }
  }, [tutorial]);

    const handleSubmit = () => {
        const formData = new FormData();
  
        formData.append("title",values.title);
        formData.append("description",values.description);
  
        updateTutorial(moduleID,tutorialID,formData).then((response) => {
          let updatedTutorial = {
            _id: response.data._id,
            title:response.data.title,
            description: response.data.description
          };
          setTutorials((prevTutorials) => {
            const index = prevTutorials.findIndex(
              (tutorial) => tutorial._id === tutorialID
            );
    
            if (index !== -1) {
              const updatedTutorials = [...prevTutorials];
              updatedTutorials[index] = updatedTutorial;
              return updatedTutorials;
            }
    
            return prevTutorials;
          });
          
          toast("tutorial deleted successfully", {
            type: 'success',
            autoClose: true,
            position: 'top-right',
          });
          handleClose();
        }).catch((err) => {
          console.log(err);
        })
      }
    return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant='h2' color='primary.main'>Edit TUTORIAL</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
            <TextField
              id="title"
              label="title"
              variant="outlined"
              name="title"
              value={values.title}
              onChange={(event) => handleInputChange('title', event.target.value)}
              fullWidth
              sx={{
                mb: 2,
              }}
            />
            <Box sx={{ mb: 2 }}>
            <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={values.description}
            onChange={(event, editor) => {
              const data = editor.getData();
              handleInputChange('description', data);
            }}
            />
            </Box>
            
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
    );
}


const DeleteModal = (props) => {

    const {open,handleClose,tutorialID,setTutorials,moduleID} = props;

    const handleSubmit = () => {
      deleteTutorial(moduleID,tutorialID).then((response) => {

        setTutorials((prevTutorials) => {
          // Filter out the deleted tutorial from the previous tutorials array
          const updatedTutorials = prevTutorials.filter(
            (tutorial) => tutorial._id !== tutorialID
          );
  
          // Return the updated array
          return updatedTutorials;
        });
        toast(response.data.message, {
          type: 'success',
          autoClose: true,
          position: 'top-right',
        });
        

      }).catch((err) => {
        console.log(err);
      })
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography variant='h3'>Do you want to delete the Tutorial ?</Typography>
            </DialogTitle>
            <DialogActions>
                <Button variant='contained' onClick={handleSubmit}>Confirm</Button>
                <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}


const TutorialUpdateDelete = (props) => {

    const {setTutorials,tutorial,moduleID} = props;

    const [openUpdate,setOpenUpdate] = useState(false);
    const [openDelete,setOpenDelete] = useState(false);

    const handleOpenUpdate = () => {
      setOpenUpdate(true);
    }

    const handleCloseUpdate = () => {
      setOpenUpdate(false);
    }

    const handleOpenDelete = () => {
        setOpenDelete(true);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
  return (
    <TableCell>
        <Button variant='outlined' onClick={handleOpenUpdate} color='success' 
        ><EditIcon /></Button>
        <Button variant='outlined' onClick={handleOpenDelete} color='danger'
        sx={{marginLeft:"10px"}}><DeleteIcon /></Button>
        <UpdateModal 
        setTutorials={setTutorials}
        moduleID={moduleID}
        tutorial={tutorial}
        open={openUpdate}
        handleClose={handleCloseUpdate}/>
        <DeleteModal 
        setTutorials={setTutorials}
        moduleID={moduleID}
        tutorialID={tutorial._id}
        open={openDelete}
        handleClose={handleCloseDelete}/>
    </TableCell>
  )
}

export default TutorialUpdateDelete