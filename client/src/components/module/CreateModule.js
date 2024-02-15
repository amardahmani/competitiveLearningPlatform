import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, TextField,Typography } from '@mui/material'
import React, { useState } from 'react'
import FlexBetween from '../../lib/displays/FlexBetween';
import { Formik } from "formik";
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { createModule } from '../../services/module.service';
import { toast } from 'react-toastify';

const moduleSchema = yup.object().shape({
    title: yup.string().required('required'),
    description:yup.string().required('required'),
    image:yup.string().required("image required")
});

const initialModule = {
    title:"",
    description:"",
    image:""
}

const CreateModule = (props) => {
    const {open,handleClose,pathID,setModules} = props;

    const handleSubmit = (values) => {
      const formData = new FormData();
      formData.append('title',values.title);
      formData.append('description',values.description);
      formData.append('image',values.image);
      console.log(formData)
      createModule(pathID,formData).then((response) => {
        console.log(response);
      let module = {_id:response.data.module._id,title:response.data.module.title,image:response.data.module.image};
      setModules(prevArray => [...prevArray, module]);
      toast(response.data.message, {
        type: 'success',
        autoClose: true,
        position: 'top-right',
      });
      
      handleClose();
      
      }).then((err) => {
        console.log(err);
      })
      handleClose();
    }

    

  return (
    <Dialog
            open={open}
            onClose={handleClose}
            sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "600px",  // Set your width here
                },
            },
            }}>
            <DialogTitle>
                <Typography variant='h3' textAlign='center' color='primary'>Create a new module</Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
        <Formik initialValues={initialModule} validationSchema={moduleSchema} onSubmit={handleSubmit}>
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
              sx={{ gridColumn: "span 4" }}
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
                          <p>Add image here</p>
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

export default CreateModule