import { Box, TextareaAutosize, TextField,Button, useMediaQuery, Dialog, DialogTitle, Divider, DialogContent, Typography } from '@mui/material'
import { Formik } from 'formik'
import React, { useRef } from 'react'
import MyUploadAdapter from '../../utils/MyUploadAdapter';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as yup from "yup"
import FlexBetween from '../../lib/displays/FlexBetween';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from 'react-dropzone';
import { createJob } from '../../services/job.service';
import { toast } from 'react-toastify';

const jobSchema = yup.object().shape({
    title:yup.string().required('required'),
    description: yup.string().required('required'),
    duration: yup.string().required('enter the length of your event'),
    country: yup.string().required('enter the country'),
    poster: yup.string().required('upload your poster')
})

const jobInitialValues = {
  title:"",
  description:"",
  duration:"",
  country:"",
  poster:""
}

const CreateJob = (props) => {
  const {open,handleClose,setJobs} = props;
  const isNonMobile = useMediaQuery("(min-width:600px)");
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

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("title",values.title);
    formData.append("description",values.description);
    formData.append("duration",values.dutation);
    formData.append("country",values.country);
    formData.append("poster", values.poster);
    
    createJob(formData).then((response) => {
      console.log(response.data);
      let job = {_id:response.data.data._id,title:response.data.data.title,country:response.data.data.country};
      setJobs(prevArray => [...prevArray, job]);
      toast('Your job Offer has been created successfully!', {
        type: 'success',
        autoClose: true,
        position: 'top-right',
      });
      handleClose();
    }).catch((err) => {
      console.log(err.message);
    })

  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant='h3' sx={{textAlign:"center"}}>
        Create a new job offer
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
    <Formik initialValues={jobInitialValues} validationSchema={jobSchema} onSubmit={handleSubmit}>
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
                label="Job title"
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
              
              <TextField 
                label="Duration"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.duration}
                name="duration"
                error={
                  Boolean(touched.duration) && Boolean(errors.duration)
                }
                helperText={touched.duration && errors.duration}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField 
                label="country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name="country"
                error={
                  Boolean(touched.country) && Boolean(errors.country)
                }
                helperText={touched.country && errors.country}
                sx={{ gridColumn: "span 2" }}
              />
              <Box
                  gridColumn="span 4"
                  borderRadius="5px"
                  p="1rem"
                  sx={{border:"1px dashed",borderColor:"secondary.main"}}
                >
                  <Dropzone
                    acceptedFiles=".png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("poster", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" },border:"1px solid",borderColor:"primary.main" }}
                      >
                        <input {...getInputProps()} />
                        {!values.poster ? (
                          <p>Add Poster Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.poster.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
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

export default CreateJob