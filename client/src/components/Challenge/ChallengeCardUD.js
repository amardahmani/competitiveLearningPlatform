import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import image from '../../assets/image.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
const ChallengeCardUD = (props) => {
    const {title,duration,challengeID} = props;

    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    const handleMouseEnter = () => {
      setHover(true);
    }

    const handleMouseLeave = () => {
      setHover(false);
    }

    
    const handleClick = () => {
      navigate(challengeID);
    }

  return (
        <Card>
          <CardActionArea onClick={handleClick}>
          <Box sx={{ height: 200, position: 'relative','&:hover': {
          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer'
        } }} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
          
          <CardMedia
            component="img"
            image={image}
            alt="Example Image"
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}
            />
          </Box>
          <Box>
          <CardContent>
            <Typography variant="h5">{title} </Typography>
            <Typography variant='h4'>{duration} </Typography>
          </CardContent>
          
          </Box>
          </CardActionArea>
        </Card>
  )
}

export default ChallengeCardUD;