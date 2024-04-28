import { Box, Dialog, DialogContent, DialogTitle,Button, Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import CreateJob from '../../../components/jobs/CreateJob';
import { getJobsRecruiter } from '../../../services/job.service';
import ChallengeCardUD from '../../../components/Challenge/ChallengeCardUD';
import JobCard from '../../../components/jobs/JobCard';
import { JobsContext } from '../../../hooks/JobsContext';


const JobManagement = () => {

    const {jobs} = useContext(JobsContext);

    const [open,setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    
  return (
    
    <Box>
        <Button onClick={handleOpen} variant='contained' sx={{marginLeft:"20px"}}>new Job offer</Button>
        <CreateJob open={open} handleClose={handleClose} jobs={jobs} />

        <Box mt={4} display='flex' flexDirection="row">
          <Grid container spacing={1}>
          
        {jobs && jobs.map((job) => (
          <Grid item md={4} xs={12}>
          <JobCard 
          job={job}
          key={job._id}
          title={job.title}
          description={job.description}
          jobID={job._id}
          poster={job.poster}
          country={job.country}/>
        </Grid>
        ))}
          
        </Grid>
      </Box>
    </Box>
    
  )
}

export default JobManagement