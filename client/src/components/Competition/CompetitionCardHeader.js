import React from 'react'
import { useNavigate } from 'react-router-dom';
import formatTime from '../../utils/TimeFormatter';
import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';


const CompetitionCardHeader = (props) => {
    const { title, startDate, endDate, type, data, poster, startPhrase, endPhrase } = props;
    const [timeRemaining, setTimeRemaining] = useState(null);
    const navigate = useNavigate();
    const fileUrl = `http://localhost:3001/uploads/poster/${poster}`;
  
    useEffect(() => {
      let remaining;
      if (new Date(startDate) > new Date()) {
        remaining = new Date(startDate).getTime() - new Date().getTime();
      } else {
        remaining = new Date(endDate).getTime() - new Date().getTime();
      }
      setTimeRemaining(remaining > 0 ? remaining : null);
  
      const timer = setInterval(() => {
        setTimeRemaining(prevTime => (prevTime && prevTime - 1000 > 0 ? prevTime - 1000 : null));
      }, 1000);
  
      return () => clearInterval(timer);
    }, [startDate, endDate]);
  
    const handleSubmit = (challenge) => {
      const id = challenge.challenge;
      console.log(challenge);
      navigate(`/developer/compete/${id}`, { state: { data } });
      console.log(id);
    };
  
    return (
      <Box>
        <Card sx={{ display: 'flex', flexDirection: 'column', background: 'hsla(0,0%,95%,.4)' }} raised>
          <CardMedia component="img" src={fileUrl} width="100%" height="100%" />
          <Box>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" color="text.secondary">
                {type}
              </Typography>
              <Typography variant="h2" mt={2}>
                {title}
              </Typography>
              
              {startPhrase && (<Typography variant='h4' mt={2} mb={2}>{startPhrase}</Typography>)}
              {endPhrase && (<Typography variant='h4' mt={2} mb={2}>{endPhrase}</Typography>)}
              {timeRemaining !== null && (
                  <Grid container spacing={1} justifyContent="center" alignItems="center">
                    <Grid item>
                      <Typography variant="h3" color="text.secondary">
                        {formatTime(timeRemaining).hours} :
                      </Typography>
                      <Typography variant="span" color="text.primary">
                        Hours
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3" color="text.secondary">
                        {formatTime(timeRemaining).minutes} : 
                      </Typography>
                      <Typography variant="span" color="text.primary">
                        Minutes
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3" color="text.secondary">
                        {formatTime(timeRemaining).seconds}
                      </Typography>
                      <Typography variant="span" color="text.primary">
                        Seconds
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              
              <Button color="success" variant="contained" sx={{ marginTop: '10px' }} onClick={() => handleSubmit({ challenge })} fullWidth>
                Start Now
              </Button>
            </CardContent>
          </Box>
        </Card>
      </Box>
    );
  };

export default CompetitionCardHeader;