import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ChallengeCard from '../../../components/Challenge/ChallengeCard'
import { getPlannedChallenges } from '../../../services/challenge.service';

const Compete = () => {

    const [challenges,setChallenges] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await getPlannedChallenges();
                console.log(response.data);
                setChallenges(response.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchData()
    },[])


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