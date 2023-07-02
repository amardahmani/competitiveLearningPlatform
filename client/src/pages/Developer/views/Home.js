import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../../../components/header/header'
import PathCard from '../../../components/learningPath/PathCard'
import PathDeveloper from '../../../components/learningPath/PathDeveloper'
import { getPaths } from '../../../services/path.service'
const Home = () => {

  const [paths,setPaths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await getPaths();
        setPaths(response.data);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[])

  return (
    <Box m={0}>
    <Box width="70%">
    <Header description="-programming gamified quests"/>
        <Box height="800px">
        <Grid container spacing={2}>
          {paths && paths.map((path) => (
            <Grid item md={4} xs={12}>
            <PathCard
            actions={PathDeveloper}
            title={path.title}
            key={path._id}
            description={path.description}
            image={path.image}
            />
            </Grid>
          ))}
        </Grid>  
          
        </Box>
        </Box>
        </Box>
  )
}

export default Home