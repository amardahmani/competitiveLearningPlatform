import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../../utils/MyUploadAdapter';
import axios from 'axios';
import * as yup from "yup"
import Dropzone from 'react-dropzone';
import FlexBetween from '../../lib/displays/FlexBetween';
import EditIcon from '@mui/icons-material/Edit';
import { getCurrentUser } from '../../services/auth.service';
import { createChallenge } from '../../services/challenge.service';


const createChallengeSchema = yup.object().shape({
  title: yup.string().required("enter the title of your challenge"),
  description: yup.string().required("enter the description of your challenge"),
  type: yup.string().required("please select one type"),
  duration: yup.string().required("enter the duration"),
  poster:yup.string().required("enter poster for your challenge")
})

const initialValuesCreate = {
  title:"",
  poster:"",
  description:"",
  type:"",
  duration:"",
}

const CreateChallenge = (props) => {
  const {challenges} = props;
  const user = getCurrentUser();
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
    formData.append('id',user.id);
    formData.append('title',values.title);
    formData.append('description',values.description);
    formData.append('type',values.type);
    formData.append('duration',values.duration);
    formData.append('poster',values.poster);
    createChallenge(formData).then((response) => {
        let challenge = {title:response.title,description:response.description,_id:response._id}
        challenges.push(challenge);
        console.log(response.data.challenge);
    }).catch((error) => {
      console.log(error);
    })
  };
  
  
  

  return (
    <Box>
        
        <Formik validationSchema={createChallengeSchema} initialValues={initialValuesCreate}  
        onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            isValidating, 
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
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"> 
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
                />
                
                <Box sx={{ gridColumn:"span 4"}}>
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
                <FormControl sx={{ gridColumn:"span 4"}}>
            <InputLabel htmlFor="Type" id="type-label">
              Type
            </InputLabel>
            <Select
              name="type"
              id="type"
              label="Type"
              labelId="type-label"
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.challenge && Boolean(errors.challenge)}
              helpertext={touched.challenge && errors.challenge}
            >
              
                <MenuItem  value="ALGORITHMIC">
                  ALGORITHMIC
                </MenuItem>
                <MenuItem value="HACKATHON">
                  HACKATHON
                </MenuItem>
              
            </Select>
          </FormControl>
                <TextField
                  label="duration"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.duration}
                  name="duration"
                  error={
                    Boolean(touched.duration) && Boolean(errors.duration)
                  }
                  helperText={touched.duration && errors.duration}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  sx={{border:"1px solid",borderColor:"primary"}}
                  gridColumn="span 4"
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".*"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("poster", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.poster ? (
                          <p>Add poster here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.poster.name}</Typography>
                            <EditIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <Box gridColumn="span 3">

                </Box>
                <Button onClick={handleSubmit} variant='contained'>SAVE</Button>
              </Box>
              
            
          )}
        </Formik>
    </Box>
  )
}

export default CreateChallenge