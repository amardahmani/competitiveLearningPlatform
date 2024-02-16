import { Box, Button, Dialog, DialogContent, DialogTitle, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { dropAlgorithmicModule, pushAlgorithmicModule } from '../../services/module.service';
import ListAlgorithmic from '../questions/algorithmic/ListAlgorithmic';
import DropAlgorithmic from '../questions/algorithmic/Buttons/DropAlgorithmic';


const PathTabs = (props) => {
  const { ButtonTutorial,tutorials,moduleID,setTutorials,TutorialUpdateDelete,QuestionLibrary,
  algorithmicQuestions,setAlgorithmicQuestions,ListAlgorithmic,DropAlgorithmic,handleDropAlgorithmic } = props;
  const [value, setValue] = React.useState('1');


  const [openLibrary,setOpenLibrary] = useState(false);

  const handleOpenLibrary = () => {
    setOpenLibrary(true);
  }

  const handleCloseLibrary = () => {
    setOpenLibrary(false);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const addAlgorithmicQuestion = (algorithmicQuestions,problem) => {
    setAlgorithmicQuestions([...algorithmicQuestions, problem]);
  }

  const pushAlgorithmicQuestion = (moduleID,questionID) => {
    return pushAlgorithmicModule(moduleID,questionID);
  }


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
          {ButtonTutorial && <ButtonTutorial moduleID={moduleID} setTutorials={setTutorials}/>}
            <TableContainer sx={{width:"70%"}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      TITLE
                    </TableCell>
                    <TableCell>
                      ACTIONS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tutorials && tutorials.map((tutorial) => (
                    <TableRow key={tutorial._id}>
                      <TableCell>{tutorial.title}</TableCell>
                      {TutorialUpdateDelete && (
                            <TutorialUpdateDelete  
                            tutorial={tutorial}
                            moduleID={moduleID}
                            setTutorials={setTutorials}/>
                        )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          
        </TabPanel>
        <TabPanel value="2">
          
          {QuestionLibrary && (
            <Button variant='contained' onClick={handleOpenLibrary}>New Problem</Button>
            
          )}
          <QuestionLibrary 
            open={openLibrary}
            handleCloseLibrary={handleCloseLibrary}
            algorithmicQuestions={algorithmicQuestions}
            pushAlgorithmicQuestion={pushAlgorithmicQuestion}
            addAlgorithmicQuestion={addAlgorithmicQuestion}
            eventID={moduleID}
          />
          
          {ListAlgorithmic &&  (
            <ListAlgorithmic 
            algorithmicQuestions={algorithmicQuestions}
            DropAlgorithmic={DropAlgorithmic}
            eventID={moduleID}
            handleDropAlgorithmic={handleDropAlgorithmic}
            />
          )}
          

        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default PathTabs;
