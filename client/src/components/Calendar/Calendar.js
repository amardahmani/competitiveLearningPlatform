import React, { useEffect, useState } from 'react'
import FullCalendar, {formatDate } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import styles from './Calendar.module.css';
import * as yup from 'yup';
import { getPlannedChallenges, getUnplannedChallenges } from '../../services/challenge.service';
import {  Formik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { getCurrentUser } from '../../services/auth.service';
import { getPlannedEvents, planEvent } from '../../services/plannification.service';
import { getJobsUnplanned } from '../../services/job.service';
import { toast } from 'react-toastify';


const plannificationSchema = yup.object().shape({
  startDate: yup.date().min(new Date(),'date of start must be from today on').required('start date is required'),
  event: yup.string().required('challenge name is required')

});

const initialValues = {
  startDate:"",
  type:"",
  event:"",
  endDate:"",
}

const NewPlannification = (props) => {
  const user = getCurrentUser();
  const [selectedType, setSelectedType] = useState('');
  const {open,handleOpen,handleClose,addEvent} = props;
  const [jobs, setJobs] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);
  useEffect(() => {
    filterEvents();
  }, [selectedType]);
  
  const fetchEvents = async () => {
  try {
    const [jobsResponse, challengesResponse] = await Promise.all([
      getJobsUnplanned(),
      getUnplannedChallenges()
    ]);

    if (jobsResponse.status !== 200 || challengesResponse.status !== 200) {
      throw new Error('Failed to fetch events');
    }

    const jobs = jobsResponse.data;
    console.log("jobs:"+ jobs);
    const challenges = challengesResponse.data;
    console.log("challenges"+challenges)
    // Update the state variables for jobs and challenges
    setJobs(jobs);
    setChallenges(challenges);

    // Filter the events based on the selected type
  } catch (error) {
    console.error(error);
    // Handle error
  }
};


  const filterEvents = () => {
    let filteredEvents = [];
    if (selectedType === 'Job') {
      filteredEvents = jobs;
    } else if (selectedType === 'Challenge') {
      filteredEvents = challenges;
    }
    setFilteredEvents(filteredEvents);
  };
  
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };


  const handleClick = (values) => {
    console.log(values);
    console.log("buttonClicked");
    const id = values.event;
    const startDate = values.startDate;
    const timeStamps = startDate.valueOf();
    const selectedEvent = filteredEvents.find((event) => event._id === id);
  let duration = selectedEvent.duration;
  let title = selectedEvent.title;
    if(duration.endsWith('d')){
      const days = parseInt(duration);
      duration = days * 24 * 60 * 60 * 1000;
    }
    else{
      const hours = parseInt(duration);
      duration = hours * 60 * 60 * 1000; 
    }
    const endDate = new Date(timeStamps+duration);
    const formattedStartDate = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss');
    const newEvent = {id:id,start:formattedStartDate,end:endDate,title:title}
    addEvent(newEvent);

    const formData = new FormData();
    
    formData.append("startDate",formattedStartDate);
    formData.append("endDate",endDate);
    formData.append("event",id);
    formData.append("type",selectedType);
    console.log(formData)
    planEvent(formData).then((response) => {
      console.log(response);
      toast('Event planned successfully');
      handleClose();
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant='h3' color='primary.main'>Plan a challenge</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{padding:"10px 10px"}} display="flex" flexDirection="column">
        <Formik initialValues={initialValues} validationSchema={plannificationSchema} 
         onSubmit={handleClick}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            onSubmit,
            setFieldValue,
            resetForm,
          }) => (
            
            <Box
              display="bock"
              flexdirection="column"
              alignItems="center"
            >
              
            <FormControl sx={{  width: "100%",display:"flex",flexDirection:"column",padding:"10px" }}>
              <InputLabel>Type</InputLabel>
              <Select value={selectedType} onChange={handleTypeChange}>
          <MenuItem value="Job">Job</MenuItem>
          <MenuItem value="Challenge">Challenge</MenuItem>
        </Select>
      </FormControl>
          <FormControl sx={{  width: "100%",display:"flex",flexDirection:"column",padding:"10px" }}>
            <InputLabel htmlFor="Event" id="event-label">
              Event
            </InputLabel>
            <Select
              name="event"
              id="event"
              label="Event"
              labelId="event-label"
              value={values.event || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.event && Boolean(errors.event)}
              helpertext={touched.event && errors.event}
            >
              {filteredEvents && filteredEvents.map((event) => (
                <MenuItem key={event._id} value={event._id}>
                  {event.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "100%",display:"flex",flexDirection:"column",padding:"10px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                name='startDate'
                label="Controlled picker"
                value={values.startDate}
                onChange={(date) => setFieldValue("startDate", date)}
                onBlur={handleBlur}
                error={touched.startDate && Boolean(errors.startDate)}
                helpertext={touched.startDate && errors.startDate}
                disablePast
                ampm={false}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
              
          </FormControl>
          <Box sx={{float:"right"}} mt={2}>
        <Button onClick={handleSubmit} variant="contained">Plan</Button>
        </Box>
        
      </Box>
            
          )}
          
      </Formik>
      </DialogContent>
    </Dialog>
  )
}


const Calendar = () => {

    const [open,setOpen] = useState(false);
    const [events,setEvents] = useState([]);
    const [planned,setPlanned] = useState([]);
    const addEvent = (newEvent) => {
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      console.log(events);
    };


    useEffect(() => {
      const fetchData = async () => {
        const response = await getPlannedEvents();
        setEvents(response.data);
        console.log(events);
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
    <Box display="flex" justifyContent="space-around" flexDirection='column' width="100%">
        <Box mt={3} ml="15px">
          <Button onClick={handleOpen} variant='contained' >Plan new challenge</Button>
          <NewPlannification events={events} open={open} handleOpen={handleOpen}
          handleClose={handleClose} addEvent={addEvent}/>
        </Box>
        <Box flex="1 1 100%" ml="15px" mt={3}>
        <FullCalendar
        events={events}
        height="75vh"
        plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
        />
        </Box>
    </Box>
    
  )
}

export default Calendar