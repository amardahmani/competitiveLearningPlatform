import { Box, Dialog, DialogContent,Select ,DialogTitle, Modal, TextField,Button, InputLabel, Typography, Table, TableContainer, TableRow, TableCell, TableHead, TableBody, FormControl, MenuItem, Link } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FlexBetween from '../../../lib/displays/FlexBetween';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { createAlgorithmic, getAllAlgorithmic } from '../../../services/questions.service';
import { getCurrentUser } from '../../../services/auth.service';
import { useParams } from 'react-router-dom';
import MyUploadAdapter from '../../../utils/MyUploadAdapter';
import FormControlContext from '@mui/material/FormControl/FormControlContext';
import { pushQuestion } from '../../../services/questions.service';
const QuestionLibrary = (props) => {
    const {open,handleCloseLibrary,algorithmicQuestions,challengeID} = props;
  
    const [problems,setProblems] = useState([]);
    
    const [selectedProblem,setSelectedProblem] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await getAllAlgorithmic();
          setProblems(response.data);
        }catch(err){
          console.log(err);
        }
      };
      fetchData();
    },[]);
  
    const handleChange = (event) => {
      setSelectedProblem(event.target.value);
    }
  
    const handleSubmit = () => {
      const formData = new FormData();
      formData.append('challengeID',challengeID);
      formData.append('problem',selectedProblem);
  
      const problem = problems.find((problem) => problem._id === selectedProblem);
  
      pushQuestion(formData).then((response) => {
        console.log(response.data);
        algorithmicQuestions.push(problem);
        handleCloseLibrary();
      }).catch((err) => {
        console.log(err.message);
      })
    }
  
    return(
      <Dialog open={open} onClose={handleCloseLibrary}>
        <DialogTitle>
          Select a programming problem
        </DialogTitle>
        <DialogContent>
        <Box 
                display="grid"
              gap="10px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
            
              <InputLabel for='#challenge-label'>Question</InputLabel>
              <Select
                name="problem"
                id="problem"
                label="Question"
                labelId="challenge-label"
                value={selectedProblem}
                onChange={handleChange}
                sx={{ gridColumn: "span 4" }}
                
              >
                {problems.map((problem) => (
                  <MenuItem key={problem._id} value={problem._id}>
                    {problem.title}
                  </MenuItem>
                ))}
              </Select>
            
            <FormControl>
              <Button variant='outlined' onClick={handleSubmit}>Add</Button>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    )
  }

  export default QuestionLibrary;