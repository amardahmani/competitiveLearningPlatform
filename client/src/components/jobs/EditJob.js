import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Divider, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDropzone } from 'react-dropzone';

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
    const {open,handleClose} = props;
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();


    const [values, setValues] = useState({
        description: '',
        country: '',
        title:'',
        positions:''
        // Add more fields as needed
      });
    const handleInputChange = (field, value) => {
        setValues((prevValues) => ({
          ...prevValues,
          [field]: value,
        }));
      };
  return (
    <Dialog open={open} onClose={handleClose}>

        <DialogContent>
        <Card
        variant="outlined"
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            padding: "15px 30px",
          }}
          display="flex"
          alignItems="center"
        >
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Edit Job
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          
            <TextField
              id="title"
              label="title"
              variant="outlined"
              name="title"
              fullWidth
              sx={{
                mb: 2,
              }}
            />
            <TextField
                name="positions"
              id="positions"
              label="positions"
              variant="outlined"
              
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
              <Button color="primary" variant="contained">
                Submit
              </Button>
            </Box>
          
            </CardContent>
        </Card>
        </DialogContent>
    </Dialog>
  )
}

export default EditJob