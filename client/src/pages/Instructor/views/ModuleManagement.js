import { Box, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PathBar from '../../../components/learningPath/PathBar'
import ModuleCard from '../../../components/module/ModuleCard';
import CreateModule from '../../../components/module/CreateModule';
import { getModules } from '../../../services/module.service';
import { useParams } from 'react-router-dom';

const ModuleManagementInstructor = () => {
  const [modules,setModules] = useState([]);
    const [open,setOpen] = useState(false);
    const params = useParams();
    
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await getModules(params.pathID);
          console.log(response.data);
          setModules(response.data.modules);
        }catch(err){
          console.log(err);
        }
      }
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

        <Button onClick={handleOpen} variant="outlined">new Module</Button>
        <CreateModule open={open} handleClose={handleClose} pathID={params.pathID}/>
        
        <Grid container spacing={1}>
        {modules && modules.map((module) => (
      <Grid item md={6} xs={12}>
        <ModuleCard
          key={module._id}
          description={module.description}
          title={module.title}
          moduleID={module._id}
        />
      </Grid>
    ))}
            <Grid item md={6} xs={12}>
            <ModuleCard />
            </Grid>
          </Grid>
    </Box>
  )
}

export default ModuleManagementInstructor