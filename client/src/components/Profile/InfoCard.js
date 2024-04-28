import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import image from '../../assets/8.jpg'
const InfoCard = () => {
  return (
    <Card variant='outlined' sx={{'&': {
      paddingBottom: '0', 
      },}}>
        <CardMedia>
            <img src={image}/>
        </CardMedia>
        <CardContent sx={{paddingBottom:'0'}}>
            <Typography variant='h4'>SR, Full stack DEVELOPER</Typography>
        </CardContent>
    </Card>
  )
}

export default InfoCard