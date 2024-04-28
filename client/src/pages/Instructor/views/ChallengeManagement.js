import { Box, Button, Grid } from '@mui/material'
import React, { useContext, useState } from 'react'
import CreateChallenge from '../../../components/Challenge/CreateChallenge'
import ChallengeCardUD from '../../../components/Challenge/ChallengeCardUD';
import ChallengesProvider, { ChallengesContext } from '../../../hooks/ChallengesContext';


const ChallengeManagementInstructor = () => {
  const { challenges,updateChallenges,deleteChallengeClient } = useContext(ChallengesContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleOpen} variant='contained' sx={{ marginLeft: "20px" }}>New Challenge</Button>
      <Box mt={4} display='flex' flexDirection="row">
        <Grid container spacing={1}>
          <CreateChallenge 
            open={open}
            handleClose={handleClose}
          />
          {challenges && challenges.map((challenge) => (
            <Grid item md={4} xs={12} key={challenge._id}>
              <ChallengeCardUD 
                title={challenge.title}
                deleteChallengeClient={deleteChallengeClient}
                updateChallenges={updateChallenges}
                challenge={challenge}
                challengeID={challenge._id}
                image={challenge.poster}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ChallengeManagementInstructor;