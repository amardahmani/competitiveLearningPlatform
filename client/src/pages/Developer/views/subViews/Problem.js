import { Box, Typography,Tab } from '@mui/material'
import React, { useState } from 'react'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TaskIcon from '@mui/icons-material/Task';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import TagIcon from '@mui/icons-material/Tag';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import QuestionPrompt from '../../../../components/CodeEditor/QuestionPrompt';
const Problem = ({problem,event,eventID}) => {

    const [value,setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log("problem"+ problem.algorithmic._id)
  return (
    <Box mt={3}>
        <Box display='flex' flexDirection='column' pl={4}>
            {problem ? 
            <Typography variant='h4'>{problem.algorithmic.title}</Typography>:
            <p>loading</p>
            }
            
            <Box display='flex' mt={1}>
                <Box display='flex'>
                    <HowToRegIcon /><Typography variant='h6'>199</Typography>
                </Box>
                <Box display='flex' ml={2}>
                    <ModeStandbyIcon /><Typography variant='h6'>33%</Typography>
                </Box>
                <Box display='flex' ml={2}>
                    <TaskIcon /><Typography variant='h6'>30</Typography>
                </Box>
                <Box display='flex' ml={2}>
                    <TagIcon /><Typography variant='h6'>Basic programming,arrays</Typography>
                </Box>
            </Box>
        </Box>
        <TabContext value={value} sx={{width:'100%'}} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider',width:'100%' }} mt={3}>
            <TabList onChange={handleChange} aria-label="lab API tabs example"
            sx={{backgroundColor:"#fafafa",
            borderTop:"1px solid #d8dde6",
            borderBottom:"1px solid #d8dde6"}}>
            <Tab label="Details" value="1" />
            <Tab label="Submissions" value="2" />
            <Tab label="Discussion" value="3" />
            <Tab label="editorial" value="4"></Tab>
            </TabList>
        </Box>
        <TabPanel value="1" sx={{padding:"0px"}}>
            <QuestionPrompt problem={problem} event={event} eventID={eventID}/>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Three</TabPanel>
        </TabContext>
    </Box>
  )
}

export default Problem