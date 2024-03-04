import { Box,Tab } from '@mui/material'
import React, { useContext } from 'react'
import ChallengeHeader from '../../../../components/Challenge/ChallengeHeader'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ListProblems from '../../../../components/questions/algorithmic/ListProblems';
import { useParams } from 'react-router-dom';
const ProblemSet = ({challenge,problems}) => {

    const [value, setValue] = React.useState('1');
    


    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

  

  return (
    <Box height='600px'>
      {challenge && (
        <ChallengeHeader challenge={challenge}/>
      )}
        
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="problems" value="1" />
            <Tab label="Submissions" value="2" />
            <Tab label="Leader board" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <ListProblems problems={problems}/>
        </TabPanel>
        <TabPanel value="2">Submissions</TabPanel>
        <TabPanel value="3">leaderBoard</TabPanel>
      </TabContext>
    </Box>
    </Box>
  )
}

export default ProblemSet