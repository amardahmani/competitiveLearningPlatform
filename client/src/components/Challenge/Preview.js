import { Box, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import FaqAlgorithmic from '../faq/FaqAlgorithmic'
import ChallengeCard from './ChallengeCard'

const ChallengeDetail = () => {

    //const challengeID = useParams()
    
  return (
    <Box width="70%" sx={{margin:"0 auto"}}>
        <ChallengeCard />

        <Box>
          <FaqAlgorithmic />
        </Box>
    </Box>
  )
}

export default ChallengeDetail