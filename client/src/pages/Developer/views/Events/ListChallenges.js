import React from 'react'
import ChallengeCard from '../../../../components/Challenge/ChallengeCard'
import { Grid, Typography } from '@mui/material'

const ListChallenges = (props) => {
    const {startPhrase,endPhrase,challenges} = props;
  return (
        <Grid container spacing={2}>
            {challenges && challenges.map(challenge => (
                <Grid item md={3} xs={12}>
                    <ChallengeCard 
                    startPhrase={startPhrase}
                    endPhrase={endPhrase}
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
  )
}

export default ListChallenges