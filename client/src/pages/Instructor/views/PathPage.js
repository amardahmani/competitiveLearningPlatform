import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getPaths } from '../../../services/path.service';
import PathCard from '../../../components/learningPath/PathCard';
import MoreUD from '../../../components/learningPath/MoreUD';
import LearnMore from '../../../components/learningPath/LearnMore';
const PathPage = () => {
    const [paths,setPaths] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await getPaths();
                console.log(response.data);
                setPaths(response.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    },[])
  return (
    <Box>
        <Grid container spacing={1}>
            {paths && paths.map((path) => (
              <Grid item md={4} xs={12}>
                <PathCard buttons={MoreUD}
                actions={LearnMore}
                key={path._id}
                image={path.image}
                description={path.description}
                title={path.title}
                pathID={path._id}/>
              </Grid>
            ))}
            
          </Grid>
    </Box>
  )
}

export default PathPage 