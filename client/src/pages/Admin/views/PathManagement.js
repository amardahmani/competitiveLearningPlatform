import { Box, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PathCreation from '../../../components/learningPath/PathCreation';
import { getPaths } from '../../../services/path.service';
import PathCard from '../../../components/learningPath/PathCard';
import MoreUD from '../../../components/learningPath/MoreUD';
import LearnMore from '../../../components/learningPath/LearnMore';
const PathManagement = () => {

    const [paths,setPaths] = useState([]);

    const [open,setOpen] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try{
        const response = await getPaths();
        setPaths(response.data);
        console.log(response.data);
        }
        catch(err){
          console.log(err);
        }
      };
      fetchData();
    },[])

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
  return (
    <Box>
        <Button variant='contained' onClick={handleOpen} sx={{marginLeft:"10px"}}>new learning path</Button>
        <PathCreation open={open} handleClose={handleClose} />

        
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

export default PathManagement