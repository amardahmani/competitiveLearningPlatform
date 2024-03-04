import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getModules } from '../../../services/module.service';
import { useParams } from 'react-router-dom';
import ModuleCard from '../../../components/module/ModuleCard';

const PathDetail = () => {

    const [modules,setModules] = useState([]);
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
  return (
    <Grid container spacing={1} marginTop="20px">
      {modules && modules.map((module) => (
      <Grid item md={6} xs={12}>
        <ModuleCard key={module._id} 
        title={module.title}
        pathID={params.pathID}
        buttonDescription={module.description}
        moduleID={module._id} />
      </Grid>
      ))}
    </Grid>
  )
}

export default PathDetail