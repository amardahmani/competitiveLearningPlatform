import { Box, Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ChallengeCard from '../../../components/Challenge/ChallengeCard'
import { CompetitionContext } from '../../../hooks/CompetitionContext';

const Compete = () => {

    const {challenges} = useContext(CompetitionContext);

    

  return (
    <Box sx={{display:"flex"}} ml={6}>
        <Grid container spacing={2}>
            {challenges && challenges.map(challenge => (
                <Grid item md={3} xs={12}>
                    <ChallengeCard 
                    key={challenge._id}
                    challenge={challenge._id}
                    title={challenge.title}
                    type={challenge.type}
                    startDate={challenge.startDate}
                    poster={challenge.poster}                    
                    endDate={challenge.endDate}
                    data={challenge}
                    />
                </Grid>
            ))}
            
        </Grid>
        <Box>
            
        </Box>
    </Box>
  )
}

export default Compete