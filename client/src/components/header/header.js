import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = ({title,description}) => {
  return (
    <Box mb={4}>
        <Typography variant='h2' fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
            {title}
        </Typography>

        <Typography variant='h5' sx={{color:"#252c33",fontFamily:"Helvatica",textTransform:"uppercase"}} mt={3} mb={3}>
            {description}
        </Typography>
    </Box>
  )
}

export default Header