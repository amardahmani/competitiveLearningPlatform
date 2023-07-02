import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const AddInstructor = ({ pathId, addInstructors, instructorOptions, savedInstructors }) => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    setInstructors(savedInstructors);
  }, [savedInstructors]);

  const handleAddInstructors = () => {
    addInstructors(pathId, instructors);
    setInstructors([]);
  };

  return (
    <div>
      <Autocomplete
        multiple
        fullWidth
        id="instructors"
        options={instructorOptions}
        getOptionLabel={(option) => option.username}
        value={instructors}
        onChange={(event, value) => setInstructors(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Instructors"
            placeholder="Instructors"
          />
        )}
      />
      <Button variant="contained" onClick={handleAddInstructors}>
        Add Instructors
      </Button>
    </div>
  );
};

export default AddInstructor;
