import { Box } from '@mui/material'
import React from 'react'
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


const EditChallenge = (props) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  return (
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
              Edit Challenge
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
              defaultValue="George deo"
              fullWidth
              sx={{
                mb: 2,
              }}
            />
            
            
            <Box>

            </Box>
            <TextField
              id="readonly-text"
              label="Read Only"
              defaultValue="Hello World"
              inputprops={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            />
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
  )
}

export default EditChallenge