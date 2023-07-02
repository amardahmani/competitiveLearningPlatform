import { Box, Button, Card, CardHeader, CardMedia, Typography } from '@mui/material'
import React from 'react'
import image from '../../assets/square.png';
import { useNavigate } from 'react-router-dom';

const ModuleCard = (props) => {
  const { buttons: ButtonsComponent } = props;
  const {title,description,moduleID} = props;
  const {buttonDescription} = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('module/'+moduleID);
  }
  return (
    <Card>
        <Box sx={{display:"flex",flexDirection:"row"}}>
        <Box component='img' src={image} sx={{height:'50px',width:'50px'}} mt={3} ml={2}>
        </Box>
        <Box mt={3} ml={1}>
          <Typography variant='h3'>{title}</Typography>

          <Typography variant='h5'>{description}</Typography>
        </Box>
        
        </Box>
        {ButtonsComponent && <ButtonsComponent title={title} description={buttonDescription}
        moduleID={moduleID}
        />} {/* Render the passed component if provided */}
        <Box display='flex' justifyContent='flex-end' width='100%'mb={2}>
          <Button variant='contained' sx={{marginRight:"10px"}} onClick={handleClick}>Learn More</Button>
        </Box>
    </Card>
  )
}

export default ModuleCard