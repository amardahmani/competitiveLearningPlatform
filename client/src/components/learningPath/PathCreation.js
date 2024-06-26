import { Box, Button, Dialog, DialogContent, DialogTitle, TextField,Typography,Divider } from '@mui/material'
import React, { useState } from 'react'
import FlexBetween from '../../lib/displays/FlexBetween';
import { Formik } from "formik";
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { createPath } from '../../services/path.service';
import { toast } from 'react-toastify';

const pathSchema = yup.object().shape({
    title: yup.string().required('required'),
    description:yup.string().required('required'),
    image:yup.string().required("image required")
});

const initialPath = {
    title:"",
    description:"",
    image:""
}

const PathCreation = (props) => {
    const {open,handleClose,setPaths} = props;
    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('title',values.title);
        formData.append('description',values.description);
        formData.append('image',values.image);
        console.log(formData)
        createPath(formData).then((response) => {
            console.log(response)
            let path = {_id:response.data._id,title:response.data.title,description:response.data.description,image:response.data.image};
            setPaths(prevArray => [...prevArray, path]);
            toast('learning path created successfully', {
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
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "1000px",  // Set your width here
                },
            },
            }}>
            <DialogTitle>
              <Typography variant="h3" color="primary" align='center'>Create a new learning path</Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
        <Formik initialValues={initialPath} validationSchema={pathSchema} onSubmit={handleSubmit}>
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
              
              <TextField 
              label="description"
              size='small'
              value={values.description}
              onBlur={handleBlur}
              onChange={handleChange}
              name="description"
              sx={{ gridColumn: "span 2" }}
              error={
                Boolean(touched.description) && Boolean(errors.description)
              }
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
                      setFieldValue("image", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" },border:"1px solid",borderColor:"primary.main" }}
                      >
                        <input {...getInputProps()} />
                        {!values.image ? (
                          <p>Add Input Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.image.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                
                
                <Button variant='contained' onClick={handleSubmit}>create</Button>

            </Box>
            
          )}
        
        </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default PathCreation