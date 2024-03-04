import { Box,Button, Typography, Table, TableContainer, TableRow, TableCell, TableHead, TableBody, Card } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ListProblems = ({problems}) => {

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`${id}`);
    }
  return (
        <Card variant='outlined' sx={{width:"100%", margin:"0px auto"}}>
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
            {problems && problems.map((question) => {
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
  )
}

export default ListProblems