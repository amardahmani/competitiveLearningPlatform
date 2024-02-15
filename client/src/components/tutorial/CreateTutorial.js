import { Dialog, DialogContent, DialogTitle, Divider, TextField,Box, useMediaQuery,Button } from '@mui/material';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react'
import * as yup from "yup"
import MyUploadAdapter from '../../utils/MyUploadAdapter'; 
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { createTutorial } from '../../services/gamifiedTutorial.service';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



const tutorialSchema = yup.object().shape({
    title:yup.string().required('required'),
    description: yup.string().required('required'),
})

const tutorialInitialValues = {
  title:"",
  description:"",
}
const CreateTutorial = (props) => {

    const editorRef = useRef();
    const isNonMobile = useMediaQuery("(min-width:600px)");

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

    const {open,handleClose,moduleID,setTutorials} = props;
    
    const handleSubmit = (values) => {
      
      const tutorialData = {
        title: values.title,
        description: values.description,
      };
      
      createTutorial(moduleID,tutorialData).then((response) => {
        console.log(response)
        let tutorial = {
          _id:response.data.tutorial._id,
          title:response.data.tutorial.title,
          description: response.data.tutorial.description
        }

        console.log(tutorial);

        setTutorials(prevTutorials => [...prevTutorials, tutorial]);

        toast('Your Tutorial has been created successfully!', {
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
            Create a new tutorial
          </DialogTitle>
          <Divider />
          <DialogContent>
        <Formik initialValues={tutorialInitialValues} validationSchema={tutorialSchema} onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
            resetForm,
          }) => (
              <Box>
              <Box display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}>
                  <TextField 
                    label="Tutorial title"
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
                  
                  
                  <Box sx={{gridColumn:"span 2"}}></Box>
                  <Box sx={{gridColumn:"span 1"}}>
                    <Button variant='outlined' fullWidth onClick={handleClose}>Cancel</Button>
                  </Box>
                  <Box sx={{ gridColumn: "span 1" }}>
                  <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant='contained'
                  >Create</Button>
    
              </Box>                  
              </Box>
    
              
              </Box>
          )}
        </Formik>
        </DialogContent>
        </Dialog>
      )
  
}

export default CreateTutorial