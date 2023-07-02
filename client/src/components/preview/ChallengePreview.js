import { Box, CardContent, CardMedia,Tab,Card,Typography,Button } from '@mui/material'
import React,{useEffect, useState} from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import challengeCard from '../../assets/challengeCard.png';
import profilePic from '../../assets/8.jpg';
import PeopleIcon from '@mui/icons-material/People';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { getChallenge, joinAlgorithmic } from '../../services/challenge.service';
import { useNavigate, useParams } from 'react-router-dom'
import FaqAlgorithmic from '../faq/FaqAlgorithmic';
import InstructionsAlgorithmic from '../faq/InstructionsAlgorithmic';
import { getCurrentUser } from '../../services/auth.service';


const ChallengePreview = (props) => {
  const {challenge,handleJoin,joined,handleSolve,challengeID} = props;
  const [value, setValue] = React.useState('1');
  
  const user = getCurrentUser();

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box width='100%'>
        <Box component="img" sx={{width:"100%",height:350}} src={challengeCard}>

        </Box>
        <Box>
            <Card sx={{width:"80%",margin:"10px auto",display:"flex",flexDirection:"row"}}>
              <CardMedia>
                <img src={profilePic}/>
              </CardMedia>
              <CardContent sx={{display:"flex",flexDirection:"row"}}>
                <Box width='80%'>
                  <Box>
                    <Typography variant='h2'>{challenge.title}</Typography><br></br>
                    <Typography variant='p'>Hosted by <b>DevCompete</b></Typography><br></br>
                    <Box mt={2} display="flex">
                      <Box display="flex">
                        <HowToRegIcon /><Typography variant='h6'> 400000 registered       </Typography>
                      </Box>
                      <Box display="flex" ml={4}>
                        <PeopleIcon /><Typography variant='h6'> Allowed team size: 1     </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" mt={2} >
                      <Box display="flex" flexDirection="column">
                        <Typography variant='h6'>Opens on</Typography>
                        <b>May 13, 2023, 08:00 AM </b>
                      </Box>
                      <Box display="flex" flexDirection="column"  ml={2}>
                        <Typography variant='h6'>Closes on</Typography>
                        <b>May 13, 2023, 08:00 AM </b>
                      </Box>
                      <Box display="flex" flexDirection="column" ml={2}>
                        <Typography variant='h6'>Duration</Typography>
                        <b>3 hours</b>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' width='20%' ml={15}>
                  {joined ? (
                  <Button variant='contained' fullWidth size='large'
                  onClick={() => handleSolve({challengeID})}>Solve </Button>):(
                    <Button variant='contained' fullWidth size='large'
                    onClick={handleJoin}>Join</Button>
                  )}
                  <Button variant='outlined' fullWidth size='large'>leaderBoard</Button>
                </Box>
              </CardContent>
            </Card>
        </Box>
        <Box sx={{display:"flex",flexDirection:"row",backgroundColor: (theme) =>
          `${theme.palette.background.default}!important`}} mt={10}>
        
        <TabContext value={value} sx={{}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',width:"30%",marginTop:"20px" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" orientation="vertical">
            <Tab label="Ouverview" value="1" />
            <Tab label="Instructions" value="2" />
            <Tab label="FAQ" value="3" />
            
          </TabList>
        </Box>
        <Box ml={4} sx={{width:"60%",backgroundColor: (theme) =>
          `${theme.palette.background.default}!important`,
      }}>
        <TabPanel value="1">
          
          <Typography variant='h2'>Ouverview</Typography>
          <Box sx={{lineHeight:'3'}}>
          <div dangerouslySetInnerHTML={{ __html: challenge.description }} />
          </Box>
        </TabPanel>
        <TabPanel value="2">
        <Typography variant='h2'>Instructions</Typography>
          <Box sx={{lineHeight:'3'}}>
            <InstructionsAlgorithmic />
          </Box>
        </TabPanel>
        <TabPanel value='3'>
        <Typography variant='h2'>FAQ</Typography>
          <Box sx={{lineHeight:'3'}}>
            <FaqAlgorithmic />
          </Box>
        </TabPanel>
        </Box>
        </TabContext>
    
        </Box>
    </Box>
  )
}

export default ChallengePreview