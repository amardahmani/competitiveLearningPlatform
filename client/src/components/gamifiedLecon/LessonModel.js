import { Box, Dialog } from '@mui/material';
import React from 'react'
import * as yup from 'yup';

const initialLessonValues = {
    title:"",
    description:""
}
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

const validationSchema = yup.object().shape({
  title:yup.string().required('enter title'),
  description:yup.string().required('enter description')
})
const LessonModel = (props) => {
  
  const {open,handleClose} = props;
  
  const handleClick = (values) => {

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
              

                
                
                
                <Button variant='contained' onClick={handleSubmit}>create</Button>

            </Box>
            
          )}
        
        </Formik>
            </DialogContent>
        </Dialog>
  )
}

export default LessonModel