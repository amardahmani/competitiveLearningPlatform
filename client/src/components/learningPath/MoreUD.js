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
  Typography,MenuItem,Menu
} from '@mui/material';
import Dropzone,{useDropzone} from 'react-dropzone';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deletePath } from '../../services/path.service';
const UpdateDialog = ({ open, handleClose, title, description, moduleID }) => {
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
    // Handle the update logic here with the updated title, description, and image.
    // You can access the updated values from the state variables: updatedTitle, updatedDescription, and image.
    // Perform your update operation, e.g., API call, database update, etc.
    // After the update is complete, close the dialog.
    handleClose();
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


const MoreUD = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {title,description,pathID} = props;
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
      <Box sx={{ marginTop: '0px', position: 'relative', right: '0px', top: '0px' }}>
        <Button variant="outlined" sx={{ marginRight: '5px' }} size="small" onClick={handleOpen}>
          <MoreVertIcon />
        </Button>
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleOpenUpdate}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <UpdateDialog open={openUpdate} handleClose={handleCloseUpdate}
        title={title} description={description}/>
      </Menu>
    </Box>
  );
};

export default MoreUD;
