import { Box, Dialog, DialogContent, DialogTitle,Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateJob from '../../../components/jobs/CreateJob';
import { getJobsRecruiter } from '../../../services/job.service';
import ChallengeCardUD from '../../../components/Challenge/ChallengeCardUD';
import JobCard from '../../../components/jobs/JobCard';


const JobManagement = () => {

    const [jobs,setJobs] = useState([]);
    const [open,setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await getJobsRecruiter();
                console.log(response.data);
                setJobs(response.data);
            }catch(err){
                console.log(err)
            }
        };
        fetchData()
    },[])
  return (
    <Box>
        <Button onClick={handleOpen} variant='outlined' sx={{marginLeft:"20px"}}>new Job offer</Button>
        <CreateJob open={open} handleClose={handleClose} jobs={jobs}/>

        <Box mt={4} display='flex' flexDirection="row">
          <Grid container spacing={1}>
          
        {jobs && jobs.map((job) => (
          <Grid item md={4} xs={12}>
          <JobCard 
          key={job._id}
          title={job.title}
          description={job.description}
          jobID={job._id}/>
        </Grid>
        ))}
          
        </Grid>
      </Box>
    </Box>
  )
}

export default JobManagement