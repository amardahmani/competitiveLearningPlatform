import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as yup from 'yup';
import { Form } from 'react-router-dom';

const lessonSchema = yup.object().shape({
    title: yup.string().required("enter the title of your gamified course"),
    description: yup.string().required("enter the description of your gamified course")
})

const initialLessonValues = {
    title:"",
    description:""
}

const createLesson = () => {
    return (
        <Dialog>
            <DialogTitle>Create a new gamified course</DialogTitle>
            <DialogContent>
                <Formik initialValues={initialLessonValues} validationSchema={lessonSchema}>
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
                    }) => {
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
                            editor={ClassicEditor}
                            data={values.description}
                            onChange={(event, editor) => {
                            const data = editor.getData();
                            setFieldValue('description', data);
                            }}
                            onBlur={() => setFieldTouched('description', true)}
                            />
                            {errors.description && touched.description && (
                            <p className="error">{errors.description}</p>
                            )}
                            </Box>

                            <Button color='primary'>Create</Button>
                        </Box>
                    }}
                </Formik>
            </DialogContent>
        </Dialog>
    )    
}

const ListLessons = () => {
  return (
    <Box>
        <Box>
        <Button onClick={handleOpen}>Add a new Module</Button>

        <TableContainer>
        <Table>
          <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {questions && questions.map((question) => {
              return (
                <TableRow>
                  <TableCell>{question.title}</TableCell>
                  <TableCell>{question.points}</TableCell>
                  <TableCell>{question.difficulty}</TableCell>
                  <TableCell>
                    <Box pl={2} alignItems="center">
                      <Button><UpdateIcon /></Button>
                      <Button><DeleteIcon sx={{ color:"red"}}/></Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
            </TableBody>

            </Table>
        </TableContainer>
        </Box>
        </Box>
  )
}

export default ListLessons