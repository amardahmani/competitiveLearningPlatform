import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import image from '../../assets/image-retro-pcs.jpg';
import { getCurrentUser } from '../../services/auth.service';
import { joinAlgorithmic } from '../../services/challenge.service';
import { useNavigate } from 'react-router-dom';
const ChallengeCard = (props) => {
  const user = getCurrentUser();
  const {title,startDate,endDate,description,challenge,type,data,poster} = props;
  const [participatant,setIsParticipant] = useState(false);
  const navigate = useNavigate();
  const fileUrl = `http://localhost:3001/uploads/poster/${poster}`;
  
  /*const handleSubmit = () => {
    const formData = new FormData();
    formData.append("challengeID",id);
    formData.append("id",user.id);

    joinAlgorithmic(formData).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
    
  }*/

  const startDateTime = new Date(startDate).toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const endDateTime = new Date(endDate).toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const handleSubmit = (challenge) => {
    const id = challenge.challenge;
    console.log(challenge)
    
    navigate(`/developer/compete/${id}`,{state: {
      data
    }});

    console.log(id);
  }
  return (
    <Box >
    <Card 
    sx={{display: "flex",flexDirection:"column",background:"hsla(0,0%,95%,.4)"}}
    raised
    >
        
        <CardMedia 
        component="img"
        src={fileUrl}
        width="100%"
        height="100%"
        
        />
        <Box >
            <CardContent sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <Typography variant='h3' color='text.secondary'> {type}</Typography>
              <Typography variant='h2' mt={2} >{title} </Typography>

              <Typography variant='span' mt={1} >startDate: <b>{startDate}</b> endDate: <b>{endDate}</b></Typography>
              <Button color='success' variant='contained' sx={{marginTop:"4px"}}
            onClick={() => handleSubmit({challenge})} fullWidth>Start Now</Button>  
            </CardContent>

            
        </Box>
        
    </Card>
    
    </Box>
  )

}

export default ChallengeCard