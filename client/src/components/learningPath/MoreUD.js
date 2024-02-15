import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,MenuItem,Menu
} from '@mui/material';
import Dropzone,{useDropzone} from 'react-dropzone';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deletePath, updatePath } from '../../services/path.service';
import { toast } from 'react-toastify';

const UpdateDialog = ({ open, handleClose, title, description, moduleID,pathID,setPaths }) => {
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
  
    formData.append("title", updatedTitle);
    formData.append("description", updatedDescription);
  
    if (image) {
      formData.append("image", image);
    }
    
    updatePath(formData,pathID).then((reponse) => {
      
      toast('path updated successfully!', {
        type: 'success',
        autoClose: true,
        position: 'top-right',
      });
      
      setPaths((prevPaths) => {
        // Assuming your paths state is an array and you want to update a specific path
        const updatedPaths = prevPaths.map((path) => {
          if (path._id === pathID) {
            // Update the specific path object
            return { ...path, title: updatedTitle, description: updatedDescription,image: image ? URL.createObjectURL(image) : path.image, };
          }
          return path;
        });
        return updatedPaths;
      });
      handleClose();
      
    }).catch((err) => {
      console.log(err)
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
        <Button onClick={handleUpdate} variant='contained' disabled={!updatedTitle || !updatedDescription}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const deleteDialog = (props) => {


  return (
    <Dialog>

    </Dialog>
  );
}

const MoreUD = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {title,description,pathID,setPaths} = props;
  const [openUpdate,setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  }

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  }

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deletePath(pathID).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    })
  }

  
  return (
    <Box>
      <Box sx={{ marginTop: '0px', position: 'relative', right: '15px', top: '0px' }}>
        <Button variant="outlined" sx={{ marginRight: '5px' }} size="small" onClick={handleOpen}>
          <MoreVertIcon />
        </Button>
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleOpenUpdate}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <UpdateDialog open={openUpdate} handleClose={handleCloseUpdate}
        title={title} description={description} pathID={pathID} setPaths={setPaths}/>
      </Menu>
    </Box>
  );
};

export default MoreUD;
