import { Box, Grid, Tab } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ChallengeCard from '../../../components/Challenge/ChallengeCard'
import { CompetitionContext } from '../../../hooks/CompetitionContext';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import ListEvents from './Events/ListCompetitions';
import ListCompetitions from './Events/ListCompetitions';

const Compete = () => {

    const {events} = useContext(CompetitionContext);

    const [value,setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    let currentDate = new Date();


    const currentEvents = events.filter(event => new Date(event.start) <= currentDate && new Date(event.end) >= currentDate);
    const upcomingEvents = events.filter(event => new Date(event.start) > currentDate);
    const endedEvents = events.filter(event => new Date(event.end) < currentDate);


    return (
    <Box sx={{display:""}} ml={6}>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="UPCOMING" value="1" />
            <Tab label="ACTIVE" value="2" />
            <Tab label="ENDED" value="3"/>
          </TabList>
        </Box>

        <TabPanel value='1'>
            <ListCompetitions events={upcomingEvents} startPhrase={"STARTS IN"}/>
        </TabPanel>

        <TabPanel value='2'>
            <ListCompetitions events={currentEvents} endPhrase={"ENDS IN"}/>
        </TabPanel>

        <TabPanel value='3'>
            <ListCompetitions events={endedEvents}/>
        </TabPanel>
        </TabContext>
    </Box>
  )
}

export default Compete