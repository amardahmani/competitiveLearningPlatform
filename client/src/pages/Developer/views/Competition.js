import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChallengePreview from '../../../components/preview/ChallengePreview';
import { useNavigate, useParams } from 'react-router-dom';
import { getChallenge, joinAlgorithmic } from '../../../services/challenge.service';
import { getCurrentUser } from '../../../services/auth.service';

const Competition = () => {
  const [challenge, setChallenge] = useState(undefined);
  const [joined, setJoined] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const user = getCurrentUser();
  const id = user.id;
  const navigate = useNavigate();

  const params = useParams();
  const challengeID = params.challengeID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChallenge(challengeID);
        console.log(response.data);
        setChallenge(response.data);
        setJoined(response.data.participants.includes(user.id));
        setLoading(false); // Set loading state to false when data is fetched
      } catch (err) {
        console.log(err);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData();

  }, [challengeID, user.id]);

  const handleSolve = (challengeID) => {
    navigate(`questions`);
  };

  const handleJoin = () => {
    joinAlgorithmic(challengeID, user.id);
    setJoined(true);
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h4">Loading...</Typography>
        </Box>
      ) : (
        <ChallengePreview
          challenge={challenge}
          joinAlgorithmic={joinAlgorithmic}
          joined={joined}
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
