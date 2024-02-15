import { Box, Dialog, DialogContent,Select ,DialogTitle, Modal, TextField,Button, InputLabel, Typography, Table, TableContainer, TableRow, TableCell, TableHead, TableBody, FormControl, MenuItem, Link, Divider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FlexBetween from '../../../lib/displays/FlexBetween';
import { createAlgorithmic } from '../../../services/questions.service';
import { getCurrentUser } from '../../../services/auth.service';
import { useParams } from 'react-router-dom';
import MyUploadAdapter from '../../../utils/MyUploadAdapter';
import FormControlContext from '@mui/material/FormControl/FormControlContext';
import { toast } from 'react-toastify';

const questionSchema = yup.object().shape({
    title: yup.string().required("please enter the title for your question"),
    description: yup.string().required("enter the description of your question"),
    points:yup.string().required("enter the number of points"),
    difficulty: yup.string().required("enter the difficulty "),
    input:yup.mixed().required("enter input file for your question"),
    expectedOutput:yup.mixed().required("enter output file for your question")
  })
  
  const initialQuestion = {
    title:"",
    description:"",
    points:"",
    difficulty:"",
    input:"",
    expectedOutput:"",
    creator:""
  }
  
  
  const CreateAlgorithmic = (props) => {
    const {open,setAlgorithmicQuestions,handleClose} = props;
    const id = getCurrentUser().id;
    console.log("user id: " + id);
    const editorRef = useRef();
    const editorConfig = {
      
        placeholder: 'Enter your description here',
      extraPlugins: [MyUploadAdapter],
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "blockQuote",
        "insertTable",
        "undo",
        "redo",
        "imageUpload"
      ],
    };
    
    
    const handleSubmit = async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('difficulty', values.difficulty);
      formData.append('points', values.points);
      formData.append('input', values.input);
      formData.append('expectedOutput', values.expectedOutput);
      formData.append('creator',id);
      try {
        const response = await createAlgorithmic(formData);
        const newProblem = response.data.algorithmic;
        setAlgorithmicQuestions(prevState => [...prevState, newProblem]);
        toast('Your question has been created successfully!', {
          type: 'success',
          autoClose: true,
          position: 'top-right',
        });
        handleClose();
      } catch (error) {
        console.error('Error creating algorithmic problem:', error);
      }
    }
    
    
    return (
      <Dialog open={open} onClose={handleClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "1000px",  // Set your width here
          },
        },
      }}>
        <DialogTitle>
          <Typography variant='h3' color='primary' align='center'>Create a new question</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Formik initialValues={initialQuestion} validationSchema={questionSchema} onSubmit={handleSubmit}>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              setFieldTouched,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
                
                <Box 
                display="grid"
              gap="10px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
  
              
                <TextField 
                label="title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={
                  Boolean(touched.title) && Boolean(errors.title)
                }
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
                size='small'
                />
                <Box sx={{ gridColumn: "span 4" }}>
                <CKEditor
                  ref={editorRef}
                  editor={ClassicEditor}
                  config={editorConfig}
                  onReady={(editor) => {
                    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                      return new MyUploadAdapter(loader);
                    };
                  }}
                  data={values.description}
                  
                  
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log(data);
                    setFieldValue('description', data);
                  }}
                  
                  
                  onBlur={() => setFieldTouched('description', true)}
                  />
                  {errors.description && touched.description && (
                    <p className="error">{errors.description}</p>
                  )}
                
                </Box>
                <TextField 
                label="points"
                size='small'
                value={values.points}
                onBlur={handleBlur}
                onChange={handleChange}
                name="points"
                sx={{ gridColumn: "span 2" }}
                error={
                  Boolean(touched.points) && Boolean(errors.points)
                }
                />
                <TextField 
                label="difficulty"
                size='small'
                value={values.difficulty}
                onChange={handleChange}
                onBlur={handleBlur}
                name="difficulty"
                sx={{ gridColumn: "span 2" }}
                error={
                  Boolean(touched.difficulty) && Boolean(errors.difficulty)
                }
                />
  
                  <Box
                    gridColumn="span 4"
                    borderRadius="5px"
                    p="1rem"
                    sx={{border:"1px dashed",borderColor:"primary.main"}}
                  >
                    <Dropzone
                      acceptedFiles=".txt"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("input", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" },border:"1px solid",borderColor:"primary.main" }}
                        >
                          <input {...getInputProps()} />
                          {!values.input ? (
                            <p>Add Input Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.input.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
  
                  <Box
                    gridColumn="span 4"
                    borderRadius="5px"
                    p="1rem"
                    sx={{border:"1px dashed",borderColor:"primary.main"}}
                  >
                    <Dropzone
                      acceptedFiles=".txt"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("expectedOutput", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" },border:"1px solid",borderColor:"primary.main" }}
                        >
                          <input {...getInputProps()} />
                          {!values.expectedOutput ? (
                            <p>Add ExpectedOutput Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.expectedOutput.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                  
                  <Button variant='contained' onClick={() => handleSubmit()}>create</Button>
  
              </Box>
              
            )}
          
          </Formik>
          
        </DialogContent>
      </Dialog>
    )
  }
  
export default CreateAlgorithmic;