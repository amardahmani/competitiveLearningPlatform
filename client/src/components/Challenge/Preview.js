import { Box, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FaqAlgorithmic from '../faq/FaqAlgorithmic'
import ChallengeCard from './ChallengeCard'
import { getChallenge } from '../../services/challenge.service'

const ChallengeDetail = () => {

    const challengeID = useParams().challengeID;
    
    const [challenge, setChallenge] = useState();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getChallenge(challengeID);
          setChallenge(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();

    })
  return (
    <Box width="70%" sx={{margin:"0 auto"}}>
        <ChallengeCard challenge={challenge}/>

        <Box>
          <FaqAlgorithmic />
        </Box>
    </Box>
  )
}

export default ChallengeDetail