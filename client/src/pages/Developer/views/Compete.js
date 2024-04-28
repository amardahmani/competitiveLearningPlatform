import { Box, Grid, Tab } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ChallengeCard from '../../../components/Challenge/ChallengeCard'
import { CompetitionContext } from '../../../hooks/CompetitionContext';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import ListChallenges from './Events/ListChallenges';
import TabList from '@mui/lab/TabList';

const Compete = () => {

    const {challenges} = useContext(CompetitionContext);

    const [value,setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const currentDate = new Date();


    const currentChallenges = challenges.filter(challenge => new Date(challenge.startDate) <= currentDate && new Date(challenge.endDate) >= currentDate);
    const upcomingChallenges = challenges.filter(challenge => new Date(challenge.startDate) > currentDate);
    const endedChallenges = challenges.filter(challenge => new Date(challenge.endDate) < currentDate);


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
            <ListChallenges challenges={upcomingChallenges} startPhrase={"STARTS IN"}/>
        </TabPanel>

        <TabPanel value='2'>
            <ListChallenges challenges={currentChallenges} endPhrase={"ENDS IN"}/>
        </TabPanel>

        <TabPanel value='3'>
            <ListChallenges challenges={endedChallenges}/>
        </TabPanel>
        </TabContext>
    </Box>
  )
}

export default Compete