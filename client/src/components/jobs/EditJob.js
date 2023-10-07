import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Divider, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDropzone } from 'react-dropzone';
import { updateJob } from '../../services/job.service';
import { toast } from 'react-toastify';

const editorConfig = {
    placeholder: 'Enter your description here',
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'insertTable',
      'undo',
      'redo',
      'imageUpload',
    ],
  };


const EditJob = (props) => {
    const {open,handleClose,job} = props;
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();


    
    const [values, setValues] = useState({
        description: '',
        country: '',
        title:'',
        duration:''
        // Add more fields as needed
      });
    const handleInputChange = (field, value) => {
        setValues((prevValues) => ({
          ...prevValues,
          [field]: value,
        }));
    };

    const handleSubmit = () => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('duration', values.duration);
      formData.append('country', values.country);
      formData.append('description', values.description);
  
      if (acceptedFiles.length > 0) {
        formData.append('poster', acceptedFiles[0]);
      }
      
      updateJob(job.jobID,formData).then((response) => {
        
        toast.success('Your changes have been saved successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast--success',
          progressClassName: 'toast__progress--success',
        });
        handleClose()
      }).catch((err) => {
        console.log(err)
      })
    }

      useEffect(() => {
        if (job) {
            setValues({
                description: job.description || '',
                country: job.country || '',
                title: job.title || '',
                duration: job.duration || ''
            });
            
        }
    }, [job]);
  return (
    <Dialog open={open} onClose={handleClose} sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "1000px",  // Set your width here
        },
      },
    }}>
        <DialogTitle sx={{marginTop:"5px"}}>
        <Typography variant='h3' textAlign='center' color="primary.main">
        Edit Job
        </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
        
        
        <Divider />
        
          
            <TextField
              id="title"
              label="title"
              variant="outlined"
              name="title"
              value={values.title}
              onChange={(event) => handleInputChange('title', event.target.value)}
              fullWidth
              sx={{
                mb: 2,
              }}
            />
            <TextField
              name="duration"
              id="duration"
              label="duration"
              variant="outlined"
              value={values.duration}
              onChange={(event) => handleInputChange('duration', event.target.value)}
              fullWidth
              sx={{
                mb: 2,
              }}
            />
            <TextField
              name="country"
              id="country"
              label="country"
              variant="outlined"
              value={values.country}
              onChange={(event) => handleInputChange('country', event.target.value)}
              fullWidth
              sx={{
                mb: 2,
              }}
            />
            
            
            <Box sx={{ mb: 2 }}>
            <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={values.description}
            onChange={(event, editor) => {
              const data = editor.getData();
              handleInputChange('description', data);
            }}
            />
            </Box>
            
            <Box {...getRootProps()} p={2} sx={{ border: '1px solid', borderColor: 'secondary.main',borderRadius:'5px' }}>
            <input {...getInputProps()} />
            
            {!acceptedFiles.length ? (
              <Typography color='secondary'>Add image here</Typography>
            ) : (
              <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                <Typography>{acceptedFiles[0].name}</Typography>
                <EditOutlinedIcon />
              </Box>
            )}
          </Box>
            
            
            <Box mt={2}>
              <Button color="primary" variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          
            
        </DialogContent>
    </Dialog>
  )
}

export default EditJob