import { Box, Dialog, DialogContent, DialogTitle, Modal, TextField,Button, InputLabel, Typography, Table, TableContainer, TableRow, TableCell, TableHead, TableBody, Card } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getChallengeQuestions } from '../../../services/challenge.service';

const ListProblems = () => {

    const [problems,setProblems] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const challengeID = params.challengeID;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await getChallengeQuestions(challengeID);
                setProblems(response.data);
                console.log(response);
            }catch(err){
                console.log(err)
            }
        };
        fetchData()
    },[])

    const handleClick = (id) => {
        navigate(`${id}`);
    }
  return (
    <Box>
        <Card variant='outlined' sx={{width:"70%", margin:"30px auto"}}>
        <TableContainer>
        <Table 
        stripped
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}>
          <TableHead>
          <TableRow>
            <TableCell>TITLE</TableCell>
            <TableCell>POINTS</TableCell>
            <TableCell>DIFFICULTY</TableCell>
            <TableCell>ACTIONS</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {problems.algorithmicQuestions && problems.algorithmicQuestions.map((question) => {
              return (
                <TableRow key={question._id}>
                  <TableCell>
                    <Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{question.title}</Typography>
                    
                    </TableCell>
                  <TableCell><Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{question.points}</Typography></TableCell>
                  <TableCell><Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{question.difficulty}</Typography></TableCell>
                  <TableCell>
                    <Box pl={2} alignItems="center">
                      <Button variant='outlined' onClick={() => handleClick(question._id)}>SOLVE</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>

        </Table>
      </TableContainer>
        </Card>
    </Box>
  )
}

export default ListProblems