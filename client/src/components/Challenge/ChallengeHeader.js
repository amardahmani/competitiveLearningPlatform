import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import imag from '../../assets/8.jpg'

const ChallengeHeader = ({challenge}) => {
    const {title,startDate,endDate} = challenge;

  return (
    <Box width='100%'>
        <Card sx={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
        <Box component="img" sx={{width:"10%",height:100}} src={imag}>

        </Box>
            <CardContent>
                <Typography variant='h2'>{title}</Typography>
                    <Typography variant='h5' color='text.secondary'>{startDate}-{endDate}</Typography>
            </CardContent>
        </Card>
    </Box>
  )
}

export default ChallengeHeader