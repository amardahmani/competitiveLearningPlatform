import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ChallengePreview from '../../../components/preview/ChallengePreview';
import { useNavigate, useParams } from 'react-router-dom';
import {  joinAlgorithmic } from '../../../services/challenge.service';
import { getCurrentUser } from '../../../services/auth.service';
import { toast } from 'react-toastify';
import CompetitionProvider, { CompetitionContext } from '../../../hooks/CompetitionContext';

const Competition = () => {
  const {getChallenge,challenges} = useContext(CompetitionContext);
  const [joined, setJoined] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const user = getCurrentUser();
  const navigate = useNavigate();

  const {challengeID} = useParams();

  const challenge = getChallenge(challengeID);
  useEffect(() => {
    if (challenge) {
      setJoined(challenge.participants.includes(user.id));
    }
  }, [challenge, user.id]);
  
  const handleSolve = (challengeID) => {
    navigate(`problemset`);
  };

  const handleJoin = async () => {
    
    const formData = new FormData();
    formData.append("challengeID", challengeID);
    formData.append("id", user.id);

    await joinAlgorithmic(formData).then((response) => {
        toast(response.data.message, {
        type: 'success',
        autoClose: true,
        position: 'top-right',
      });
      navigate(`problemset`);
      
    });
    setJoined(true);
  };

  const handleClick = () => {
    const challenge = getChallenge(challengeID);
    console.log(challenge);
  }

  return (
    <>
      {!challenge ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h4">Loading...</Typography>
        </Box>
      ) : (
        <ChallengePreview
          challenge={challenge}
          joinAlgorithmic={joinAlgorithmic}
          joined={joined}
          handleJoin={handleJoin}
          handleSolve={handleSolve}
          challengeID={challengeID}
          startDate={startDate}
          endDate={endDate}
        />
      )}
   
    </>
  );
};

export default Competition;
