import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const ChallengeCardUD = (props) => {
    const {title,challengeID,image,challenge,updateChallenge} = props;
    const [hover, setHover] = useState(false);

    console.log("challenge in card: "+challenge.title + ", challenge ID: "+challenge._id + ", description: "+
    challenge.description,"duration: "+challenge.duration);
   
    const fileUrl = `http://localhost:3001/uploads/poster/${image}`;
    const navigate = useNavigate();
    const handleMouseEnter = () => {
      setHover(true);
    }
    const handleMouseLeave = () => {
      setHover(false);
    }

    
    const handleClick = () => {
      navigate(challengeID, {
        state: {
          challenge: challenge
        }
      });
    };

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
            image={fileUrl}
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
          </CardContent>
          </Box>
          </CardActionArea>
        </Card>
  )
}

export default ChallengeCardUD;