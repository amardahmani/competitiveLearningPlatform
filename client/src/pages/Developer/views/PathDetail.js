import { Box } from '@mui/material'
import React, { useState } from 'react'
import { getModules } from '../../../services/module.service';

const PathDetail = () => {

    const [modules,setModules] = useState([]);
    const params = useParams();
    
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await getModules(params.pathID);
          console.log(response.data);
          setModules(response.data);
        }catch(err){
          console.log(err);
        }
      }
      fetchData();
    },[])
  return (
    <Box display="flex" flexDirection='column' alignItems='center'>
        
    </Box>
  )
}

export default PathDetail