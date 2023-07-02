import { Box } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'

import * as yup from 'yup'

const solutionSchema = yup.object().shape({
    title:yup.string().required("enter a title for your challenge"),
    theme: yup.string().required("select a theme"),
    description: yup.string().required("enter a short description about your answer"),
    demo: yup.string().required("enter the URL of your running application"),
    source: yup.string().required("enter the URL of your source"),
    code: yup.string().required("upload your source code"),
    presentation: yup.string().required("upload your presentation")
})

const initalSolutionValues = {
    title:"",
    theme:"",
    description:"",
    demo:"",
    source:"",
    code:"",
    presentation:""
}


const SubmitSolution = () => {

  const handleSubmit = () => {
    
  }

  return (
    <Box>
        <Formik validationSchema={solutionSchema} initialValues={initalSolutionValues}>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <Box>

              </Box>
            )}
        </Formik>
    </Box>
  )
}

export default SubmitSolution