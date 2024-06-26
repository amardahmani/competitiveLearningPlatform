import React, { useEffect, useState } from 'react';
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
const UpdateDialog = ({ open, handleClose, title, description, pathID, setPaths }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [image, setImage] = useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles),
    accept: 'image/*', // Specify accepted file types
    multiple: false, // Allow only single file to be dropped
  });

  const handleDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  };

  const handleTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setUpdatedDescription(event.target.value);
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('title', updatedTitle);
    formData.append('description', updatedDescription);
    if (image) {
      formData.append('image', image);
    }

    updatePath(formData, pathID)
      .then((response) => {
        toast('Path updated successfully!', {
          type: 'success',
          autoClose: true,
          position: 'top-right',
        });

        // Update paths state
        setPaths((prevPaths) => {
          const updatedPaths = prevPaths.map((path) => {
            if (path._id === pathID) {
              // Update the specific path object
              return { ...path, title: updatedTitle, description: updatedDescription, image: response.data.image };
            }
            return path;
          });
          return updatedPaths;
        });

        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(image); // Check if image state is properly updated
  }, [image]);
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
        <Box {...getRootProps()} p={2} sx={{ border: '1px solid', borderColor: 'secondary.main', borderRadius: '5px' }}>
          <input {...getInputProps()} />

          {!acceptedFiles.length ? (
            <Typography color="secondary">Drop an image here or click to select one</Typography>
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
        <Button onClick={handleUpdate} variant="contained" disabled={!updatedTitle || !updatedDescription}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};



const DeletePathModal = (props) => {
  const {open,handleClose,setPaths,pathID} = props;
  console.log(pathID)
  const handleDelete = () => {
    deletePath(pathID).then((response) => {
      setPaths((prevPaths) =>
          prevPaths.filter((p) => p._id !== pathID)
          );
      toast(response.data.message, {
        type: 'success',
        autoClose: true,
        position: 'top-right',
      });
      console.log(response);
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

const MoreUD = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {title,description,pathID,setPaths} = props;
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

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  
  return (
    <Box>
      <Box sx={{ marginTop: '0px', position: 'relative', right: '15px', top: '0px' }}>
        <Button variant="outlined" sx={{ marginRight: '5px' }} size="small" onClick={handleOpen}>
          <MoreVertIcon />
        </Button>
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleOpenUpdate}>Update</MenuItem>
        <MenuItem onClick={handleOpenDelete}>Delete</MenuItem>
        <UpdateDialog open={openUpdate} handleClose={handleCloseUpdate}
        title={title} description={description} pathID={pathID} setPaths={setPaths}/>
        <DeletePathModal open={openDelete} setPaths={setPaths} handleClose={handleCloseDelete}
        pathID={pathID}/>
      </Menu>
    </Box>
  );
};

export default MoreUD;
