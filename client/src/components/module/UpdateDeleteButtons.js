
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography
} from '@mui/material';
import Dropzone,{useDropzone} from 'react-dropzone';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { deleteModule, updateModule } from '../../services/module.service';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



const UpdateDialog = ({ open, handleClose, title, description, moduleID,setModules,pathID }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [image, setImage] = useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const handleDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const handleTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setUpdatedDescription(event.target.value);
  };

  

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('title',updatedTitle);
      formData.append('description',updatedDescription);
      formData.append('image',image);

      updateModule(pathID,moduleID,formData).then((response) => {
        let updatedModule = {_id:response.data._id,title:response.data.title,image:response.data.image,description:response.data.description};
        setModules((prevModules) => {
          const updatedModules = prevModules.map((module) => {
            return module._id === updatedModule._id ? updatedModule : module;
          });
          return updatedModules;
        });
        console.log(response);
        toast("module updated successfully", {
          type: 'success',
          autoClose: true,
          position: 'top-right',
        });
        handleClose();
      }).then((err) => {
        console.log(err);
      })
    
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Dialog</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={updatedTitle}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={updatedDescription}
          onChange={handleDescriptionChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Box {...getRootProps()} p={2} sx={{ border: '1px solid', borderColor: 'secondary.main',borderRadius:'5px' }}>
            <input {...getInputProps()} />
            
            {!acceptedFiles.length ? (
              <Typography color='secondary'>Add image here</Typography>
            ) : (
              <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                <Typography>{acceptedFiles[0].name}</Typography>
                <EditOutlinedIcon />
              </Box>
            )}
          </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary" disabled={!updatedTitle || !updatedDescription}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};




const UpdateDeleteButtons = (props) => {
  const {moduleID,description,title,setModules,pathID} = props;
  const [open,setOpen] = useState(false);
  const handleDelete = () => {
    deleteModule(pathID,moduleID).then((response) => {
      toast('Your  has been created successfully!', {
        type: 'success',
        autoClose: true,
        position: 'top-right',
      });
      setModules((prevModules) => {
        const updatedModules = prevModules.filter((module) => module._id !== moduleID);
        return updatedModules;
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Box sx={{float:'right',marginTop:'0px',position:'relative',right:"20px",top:"-50px"}}>
          <Button variant='outlined' color='error' 
          sx={{marginRight:"5px"}}
          onClick={handleDelete}><DeleteIcon /></Button>
          <Button variant='outlined' color='success'
          onClick={handleOpen}><CreateIcon /></Button>
          <UpdateDialog open={open}
          handleClose={handleClose}
          pathID={pathID}
          title={title}
          setModules={setModules}
          description={description}
          moduleID={moduleID}/>
    </Box>
  )
}

export default UpdateDeleteButtons