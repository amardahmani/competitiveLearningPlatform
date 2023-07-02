import { Box, Button, Card, CardContent, Divider, TextField, Typography } from '@mui/material'
import React from 'react'
import Dropzone, { useDropzone } from 'react-dropzone';
import FlexBetween from '../../lib/displays/FlexBetween';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const EditPath = () => {

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
              Edit Path
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <form>
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
            
            
            <TextField
              id="description"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            />
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
          </form>
        </CardContent>
      </Card>
  )
}

export default EditPath;