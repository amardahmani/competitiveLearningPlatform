import { Box, Tab } from '@mui/material'
import React from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ListQuestions from './ListQuestions';
const PathTabs = (props) => {
    const {Algorithmic,ButtonTutorial} = props;
    const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '70%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tutorial" value="1" />
            <Tab label="Gamified quests" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
        {ButtonTutorial && <ButtonTutorial />}
        </TabPanel>
        <TabPanel value="2">
          {Algorithmic && <Algorithmic />}
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default PathTabs