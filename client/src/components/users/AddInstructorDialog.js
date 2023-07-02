import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const AddInstructorDialog = (props) => {
    const { instructors, nonInstructors, handleClose, open, handleSave, handleDelete } = props;
    
    const [selectedUsername, setSelectedUsername] = useState('');
        const [instructor, setInstructor] = useState({});
  
    const handleUsernameChange = (event) => {
      const username = event.target.value;
      setSelectedUsername(username);
  
      const selectedInstructor = nonInstructors.find((instructor) => instructor.username === username);
  
      setInstructor(selectedInstructor);
    };
  
    const handleAddToTable = () => {
      if (selectedUsername) {
        handleSave(instructor);
  
        setSelectedUsername(null);
        setInstructor({});
  
        handleClose();
      }
    };
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Instructor</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Select a username</InputLabel>
            <Select value={selectedUsername || ''} onChange={handleUsernameChange}>
              <MenuItem value="">
                <em>Select a username</em>
              </MenuItem>
              {nonInstructors.map((instructor) => (
                <MenuItem key={instructor._id} value={instructor.username}>
                  {instructor.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddToTable} color="primary">
              Add to Table
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  };
  

export default AddInstructorDialog;
